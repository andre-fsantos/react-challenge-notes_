import { Layout } from "./Components/Layout";
import "./App.css";
import { ToastProvider } from "./contexts/ToastContext";

export default function App() {
  return (
    <ToastProvider>
      <Layout />
    </ToastProvider>
  );
}
