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
} from "firebase/firestore";
import { LanguageContext } from "../LanguageContext";
import { formatDistanceToNow } from "date-fns"; // Импортируем функцию
import { ru, enUS } from "date-fns/locale"; // Импорт локалей

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
      const q = query(commentsRef, orderBy("timestamp", "asc"));
      const querySnapshot = await getDocs(q);
      const commentsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
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
        timestamp: new Date(),
        edited: false, 
      });

      setComment("");
      setError(null);
      setHasCommented(true);

      setComments((prevComments) => [
        ...prevComments,
        { id: docRef.id, text: comment, user: user.email, timestamp: new Date(), edited: false },
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
    } catch (error) {
      setError("Error deleting comment: " + error.message);
    }
  };

  const handleEditComment = async (commentId) => {
    const commentToEdit = comments.find((comment) => comment.id === commentId);
    if (commentToEdit) {
      setComment(commentToEdit.text);
      setEditingCommentId(commentId);
    }
  };

  const handleUpdateComment = async (e) => {
    e.preventDefault();
    if (editingCommentId) {
      if (comment.trim() === "") {
        setError(
          language === "en" ? "Comment cannot be empty" : "Комментарий не может быть пустым"
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
          prevComments.map((c) =>
            c.id === editingCommentId
              ? { ...c, text: comment, edited: true }
              : c
          )
        );
        setEditingCommentId(null);
        setComment("");
      } catch (error) {
        setError("Error updating comment: " + error.message);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const getTimeAgo = (timestamp) => {
    if (!timestamp) return "";
    return formatDistanceToNow(new Date(timestamp.seconds * 1000), {
      addSuffix: true,
      locale: language === "en" ? enUS : ru, // Устанавливаем локаль на основе выбранного языка
    });
  };

  return (
    <div className="comments-section w-[55%] pt-[100px]">
      {user && (
        <p className="text-white text-[20px] font-def">
          {language === "en"
            ? "Please write a short and clear comment about your impressions of this programmer's work."
            : "Пожалуйста, напишите краткий и понятный комментарий о ваших впечатлениях от работы этого программиста."}
        </p>
      )}
      {user ? (
        !hasCommented || editingCommentId ? (
          <form onSubmit={editingCommentId ? handleUpdateComment : handleCommentSubmit} className="mt-4">
            <input
              value={comment}
              onChange={handleCommentChange}
              placeholder={
                language === "en" ? "Write something..." : "Пишите..."
              }
              className="w-full p-4 border rounded outline-none font-def"
              rows="4"
              maxLength="1000"
              disabled={isSubmitting}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 mt-2 rounded font-def"
              disabled={isSubmitting}
            >
              {language === "en"
                ? editingCommentId ? "Update Comment" : "Send Comment"
                : editingCommentId ? "Обновить" : "Отправить"}
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
      <div className="comments mt-6 font-def">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="comment bg-[#181818] p-4 rounded-lg mb-4"
            >
              <p className="text-white">{comment.text}</p>
              {comment.edited && (
                <p className="text-sm text-gray-400">(edited)</p>
              )}
              <p className="text-sm pt-1 text-gray-400">
                {language === "en"
                  ? `Posted by ${comment.user} ${getTimeAgo(comment.timestamp)}`
                  : `Отправлено от ${comment.user} ${getTimeAgo(comment.timestamp)}`}
              </p>
            </div>
          ))
        ) : (
          <p className="text-white">{language === "en" ? "No comments yet." : "Пока нет комментариев."}</p>
        )}
      </div>
      {user && (
        <div className="flex justify-end">
          <button onClick={handleSignOut} className="bg-red-600 text-white px-4 py-2 rounded mt-4">
            {language === "en" ? "Logout" : "Выйти"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentsSection;
