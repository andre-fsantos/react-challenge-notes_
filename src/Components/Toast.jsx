import { useContext } from "react";
import { ToastContext } from "../contexts/ToastContext";
import "./Toast.css";

const Toast = () => {
  const { isToastVisible, toastType, toastMessage } = useContext(ToastContext);

  const className = {
    success: "successful-toast",
    error: "error-toast",
  };

  const style = `toast ${className[toastType]}`;

  return isToastVisible && <div className={style}>{toastMessage}</div>;
};

export { Toast };
