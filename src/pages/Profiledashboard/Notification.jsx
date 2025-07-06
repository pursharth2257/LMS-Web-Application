import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext"; 

const Notification = ({ message, type, onClose }) => {
  const { theme } = useContext(ThemeContext); 
  if (!message) return null;

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-md shadow-lg text-white transition-opacity duration-300 ${
        type === "error"
          ? theme === "dark"
            ? "bg-red-600 dark:bg-red-700"
            : "bg-red-500"
          : theme === "dark"
          ? "bg-green-600 dark:bg-green-700"
          : "bg-green-500"
      }`}
      style={{ zIndex: 1000 }}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-200 dark:hover:text-gray-300"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Notification;