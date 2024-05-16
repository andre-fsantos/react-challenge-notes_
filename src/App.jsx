import { Layout } from "./Components/Layout";
import { ToastProvider } from "./contexts/ToastContext";
import { ModalProvider } from "./contexts/ModalContext";
import "./App.css";

export default function App() {
  return (
    <ToastProvider>
      <ModalProvider>
        <Layout />
      </ModalProvider>
    </ToastProvider>
  );
}
