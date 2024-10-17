import React, { useState, useEffect, useContext } from "react";
import { auth } from "../Firebase"; // Импортируем аутентификацию Firebase
import { signOut } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc, // Для удаления
  doc,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { LanguageContext } from "../LanguageContext";
import { formatDistanceToNow } from "date-fns"; // Импортируем функцию
import { ru, enUS } from "date-fns/locale"; // Импорт локалей
import { serverTimestamp } from "firebase/firestore"; // Импортируем serverTimestamp
import { motion } from "framer-motion";

const CommentsSection = () => {
  const [user, setUser] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [hasCommented, setHasCommented] = useState(false); // Флаг для проверки, оставил ли пользователь комментарий
  const [editingCommentId, setEditingCommentId] = useState(null); // Для редактирования
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { language } = useContext(LanguageContext); // Получаем текущий язык

  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        setUser(authUser);
        // Проверяем, оставил ли пользователь уже комментарий
        const commentsRef = collection(db, "comments");
        const q = query(commentsRef, where("user", "==", authUser.email)); // Проверка по email
        const querySnapshot = await getDocs(q);
        setHasCommented(!querySnapshot.empty); // Если запрос не пустой, значит комментарий уже существует
      } else {
        setUser(null);
      }
    });

    const fetchComments = async () => {
      const commentsRef = collection(db, "comments");
      const q = query(commentsRef, orderBy("timestamp", "asc"));
      const querySnapshot = await getDocs(q);
      const commentsData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          timestamp: data.timestamp || null, // Убедимся, что timestamp существует
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

    if (isSubmitting) return; // Предотвращаем повторное создание комментария

    setIsSubmitting(true); // Блокируем отправку

    try {
      const docRef = await addDoc(collection(db, "comments"), {
        text: comment,
        user: user.email,
        timestamp: serverTimestamp(), // используем serverTimestamp
        edited: false,
      });

      setComment("");
      setError(null);
      setHasCommented(true);

      window.location.reload();

      // Добавляем новый комментарий в состояние
      setComments((prevComments) => [
        ...prevComments,
        {
          id: docRef.id,
          text: comment,
          user: user.email,
          timestamp: new Date(), // локально отображаем текущую дату до получения обновленных данных
          edited: false,
        },
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
    } finally {
      window.location.reload();
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

    if (isSubmitting) return; // Предотвращаем повторное редактирование

    setIsSubmitting(true); // Блокируем отправку

    try {
      await updateDoc(doc(db, "comments", editingCommentId), {
        text: comment,
        edited: true, // comment edited ? true
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
    if (!timestamp || !timestamp.seconds) return ""; // Проверяем, что timestamp существует и содержит seconds
    try {
      return formatDistanceToNow(new Date(timestamp.seconds * 1000), {
        addSuffix: true,
        locale: language === "en" ? enUS : ru, // Устанавливаем локаль на основе выбранного языка
      });
    } catch (error) {
      console.error("Invalid timestamp format", error);
      return ""; // Возвращаем пустую строку, если произошла ошибка
    }
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
      <div className="comments mt-6 font-def">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <motion.div
              key={comment.id} // Изменил key с index на comment.id
              className="comment bg-[#181818] p-4 rounded-lg mb-4"
              initial={{ opacity: 0, y: 20 }} // Начальное состояние
              whileInView={{ opacity: 1, y: 0 }} // Конечное состояние
              exit={{ opacity: 0, y: -20 }} // Состояние при удалении
              transition={{ duration: 0.5 }} // Длительность анимации
              viewport={{ once: false }} // Анимация при повторном появлении
            >
              <p className="text-gray-400 text-sm mb-2">{comment.user}</p>
              <p className="text-white">{comment.text}</p>
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
