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

// Простой кастомный Tooltip
const Tooltip = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && content && (
        <div
          className="absolute z-10 p-1 ml-0 bg-[#121212] text-white text-xs 
          shadow-lg bottom-full transition-all whitespace-nowrap max-w-[200px] overflow-hidden text-ellipsis"
        >
          {content}
        </div>
      )}
    </div>
  );
};

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

  // Функция для форматирования списка лайкнувших
  const formatLikedByList = (likedBy) => {
    if (!likedBy || likedBy.length === 0) return "";

    // Получаем email без доменной части
    const formatEmail = (email) => email.split("@")[0];

    // Получаем первые 5 email
    const firstFiveUsers = likedBy.slice(0, 5).map(formatEmail);

    // Формируем текст для тултипа
    const tooltipContent =
      likedBy.length <= 5
        ? firstFiveUsers.join(", ")
        : `${firstFiveUsers.join(", ")} ${
            language === "en"
              ? `and ${likedBy.length - 5} others`
              : `и еще ${likedBy.length - 5}`
          }`;

    return tooltipContent;
  };

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

  // Остальные методы (handleDeleteComment, handleEditComment и т.д.) остаются прежними

  return (
    <div className="comments-section w-[55%] pt-[100px] ssm:w-full ssm:px-4">
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
              onChange={(e) => {
                setComment(e.target.value);
                if (e.target.value.length >= 1000) {
                  setError(
                    language === "en"
                      ? "Max 1000 symbols"
                      : "Mаксимум 1000 символов"
                  );
                } else {
                  setError(null);
                }
              }}
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
              className="comment bg-[#181818] p-4 rounded-lg mb-4 overflow-hidden text-ellipsis break-words"
            >
              <p className="text-gray-400 text-sm mb-2">{comment.user}</p>
              <p className="text-white">{comment.text}</p>

              <Tooltip content={formatLikedByList(comment.likedBy)}>
                <button
                  onClick={() => handleLikeComment(comment.id)}
                  className="text-blue-500 text-sm cursor-pointer font-def pt-2"
                >
                  {language === "en" ? "Like" : "Лайк"} - {comment.likes || 0}
                </button>
              </Tooltip>

              {/* Остальной код остается без изменений */}
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
