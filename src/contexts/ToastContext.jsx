import { createContext, useState, useEffect } from "react";

export const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [toastType, setToastType] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const showToast = ({ type = "", message = "" }) => {
    setToastType(type);
    setToastMessage(message);
    setIsToastVisible(true);
  };

  useEffect(() => {
    if (isToastVisible) {
      const TOAST_DURATION = 3000;

      const timeout = setTimeout(() => {
        setIsToastVisible(false);
      }, TOAST_DURATION);

      return () => clearTimeout(timeout);
    }
  }, [isToastVisible]);

  const value = {
    showToast,
    toastType,
    toastMessage,
    isToastVisible,
  };

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};
