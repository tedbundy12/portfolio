import React, { useState, useEffect, useContext } from "react";
import { auth } from "../Firebase";
import { signOut } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  where,
  getDoc,
} from "firebase/firestore";
import { LanguageContext } from "../LanguageContext";
import { formatDistanceToNow } from "date-fns";
import { ru, enUS } from "date-fns/locale";
import { serverTimestamp } from "firebase/firestore";
import { motion } from "framer-motion";

const CommentsSection = () => {
  const [user, setUser] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [hasCommented, setHasCommented] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { language } = useContext(LanguageContext);

  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        setUser(authUser);
        const commentsRef = collection(db, "comments");
        const q = query(commentsRef, where("user", "==", authUser.email));
        const querySnapshot = await getDocs(q);
        setHasCommented(!querySnapshot.empty);
      } else {
        setUser(null);
      }
    });

    const fetchComments = async () => {
      const commentsRef = collection(db, "comments");
      const q = query(commentsRef, orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const commentsData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          timestamp: data.timestamp || null,
          likes: Number(data.likes) || 0,
          likedBy: data.likedBy || [],
        };
      });
      setComments(commentsData);
    };

    fetchComments();

    return unsubscribe;
  }, [db]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);

    if (e.target.value.length >= 1000) {
      setError(
        language === "en" ? "Max 1000 symbols" : "Mаксимум 1000 символов"
      );
    } else {
      setError(null);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim() === "") {
      setError(
        language === "en"
          ? "Comment cannot be empty"
          : "Комментарий не может быть пустым"
      );
      return;
    }

    if (hasCommented) {
      setError(
        language === "en"
          ? "You have already posted a comment."
          : "Вы уже оставили комментарий."
      );
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const docRef = await addDoc(collection(db, "comments"), {
        text: comment,
        user: user.email,
        timestamp: serverTimestamp(),
        edited: false,
        likes: 0,
        likedBy: [],
      });

      setComment("");
      setError(null);
      setHasCommented(true);

      // Update local state without reload
      setComments((prevComments) => [
        {
          id: docRef.id,
          text: comment,
          user: user.email,
          timestamp: new Date(),
          edited: false,
          likes: 0,
          likedBy: [],
        },
        ...prevComments,
      ]);
    } catch (error) {
      setError("Error adding comment: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteDoc(doc(db, "comments", commentId));
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
      setHasCommented(false);
    } catch (error) {
      setError("Error deleting comment: " + error.message);
    }
  };

  const handleLikeComment = async (commentId) => {
    if (!user) {
      setError(
        language === "en"
          ? "You need to sign in to like a comment."
          : "Вам нужно авторизоваться, чтобы поставить лайк."
      );
      return;
    }

    try {
      const commentRef = doc(db, "comments", commentId);
      const commentSnapshot = await getDoc(commentRef);

      if (commentSnapshot.exists()) {
        const commentData = commentSnapshot.data();
        const likedBy = commentData.likedBy || [];
        const currentLikes = Number(commentData.likes) || 0;

        if (likedBy.includes(user.email)) {
          // Remove like
          await updateDoc(commentRef, {
            likes: Math.max(currentLikes - 1, 0),
            likedBy: likedBy.filter((email) => email !== user.email),
          });
        } else {
          // Add like
          await updateDoc(commentRef, {
            likes: currentLikes + 1,
            likedBy: [...likedBy, user.email],
          });
        }

        // Update local state
        setComments((prevComments) =>
          prevComments.map((com) =>
            com.id === commentId
              ? {
                  ...com,
                  likes: likedBy.includes(user.email)
                    ? Math.max(Number(com.likes) - 1, 0)
                    : Number(com.likes) + 1,
                  likedBy: likedBy.includes(user.email)
                    ? com.likedBy.filter((email) => email !== user.email)
                    : [...com.likedBy, user.email],
                }
              : com
          )
        );
      }
    } catch (error) {
      setError("Error updating like: " + error.message);
    }
  };

  const handleEditComment = async (commentId) => {
    const commentToEdit = comments.find((com) => com.id === commentId);
    if (commentToEdit) {
      setComment(commentToEdit.text);
      setEditingCommentId(commentId);
    }
  };

  const handleUpdateComment = async (e) => {
    e.preventDefault();

    if (comment.trim() === "") {
      setError(
        language === "en"
          ? "Comment cannot be empty"
          : "Комментарий не может быть пустым"
      );
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      await updateDoc(doc(db, "comments", editingCommentId), {
        text: comment,
        edited: true,
      });
      setComments((prevComments) =>
        prevComments.map((com) =>
          com.id === editingCommentId
            ? { ...com, text: comment, edited: true }
            : com
        )
      );
      setEditingCommentId(null);
      setComment("");
    } catch (error) {
      setError("Error updating comment: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTimeAgo = (timestamp) => {
    if (!timestamp || !timestamp.seconds) return "";
    try {
      return formatDistanceToNow(new Date(timestamp.seconds * 1000), {
        addSuffix: true,
        locale: language === "en" ? enUS : ru,
      });
    } catch (error) {
      console.error("Invalid timestamp format", error);
      return "";
    }
  };

  return (
    <div className="comments-section w-[55%] pt-[100px] ssm:w-full ssm:px-4">
      {user && (
        <p className="text-white text-[20px] font-def">
          {language === "en"
            ? "Please write a short and clear comment about your impressions of this programmer's work."
            : "Пожалуйста, напишите краткий и понятный комментарий о ваших впечатлениях от работы этого программиста."}
        </p>
      )}
      {user ? (
        !hasCommented || editingCommentId ? (
          <form
            onSubmit={
              editingCommentId ? handleUpdateComment : handleCommentSubmit
            }
            className="mt-4"
          >
            <input
              value={comment}
              onChange={handleCommentChange}
              placeholder={
                language === "en" ? "Write something..." : "Пишите..."
              }
              className="w-full p-4 border rounded outline-none font-def"
              rows="4"
              maxLength="1000"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 mt-2 rounded font-def"
            >
              {language === "en"
                ? editingCommentId
                  ? "Update Comment"
                  : "Send Comment"
                : editingCommentId
                ? "Обновить"
                : "Отправить"}
            </button>
          </form>
        ) : (
          <p className="text-red-500 text-lg pt-4">
            {language === "en"
              ? "You have already posted a comment."
              : "Вы уже оставили комментарий."}
          </p>
        )
      ) : (
        <p className="text-white font-def text-[20px] text-center">
          {language === "en"
            ? "You need to sign in to leave a comment."
            : "Вам нужно авторизоваться чтобы отправить комментарий"}
        </p>
      )}
      {error && <p className="text-red-500 mt-4 flex items-center">{error}</p>}
      <div className="comments mt-6 font-def ssm:w-full">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <motion.div
              key={comment.id}
              className="comment bg-[#181818] p-4 rounded-lg mb-4 overflow-hidden text-ellipsis break-words]"
            >
              <p className="text-gray-400 text-sm mb-2">{comment.user}</p>
              <p className="text-white">{comment.text}</p>
              <button
                onClick={() => handleLikeComment(comment.id)}
                className="text-white font-def text-sm pt-2"
              >
                {language === "en" ? "👍" : "👍"} {comment.likes || 0}
              </button>
              <p className="text-gray-500 text-sm mt-2">
                {getTimeAgo(comment.timestamp)}
              </p>
              {user && user.email === comment.user && (
                <div className="flex space-x-4 mt-4 items-center">
                  <button
                    onClick={() => handleEditComment(comment.id)}
                    className="text-blue-600 text-sm"
                  >
                    {language === "en" ? "Edit" : "Редактировать"}
                  </button>
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="text-red-600 text-sm"
                  >
                    {language === "en" ? "Delete" : "Удалить"}
                  </button>
                </div>
              )}
              {comment.edited && (
                <p className="text-gray-500 text-xs font-def mt-[-20px] text-right">
                  {language === "en" ? "Edited" : "Отредактировано"}
                </p>
              )}
            </motion.div>
          ))
        ) : (
          <p className="text-white text-[20px]">
            {language === "en"
              ? "No comments yet."
              : "Комментарии отсутствуют."}
          </p>
        )}
      </div>
    </div>
  );
};

export default CommentsSection;
