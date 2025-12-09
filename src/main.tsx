import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import i18n from "./i18n/config";

// Set initial lang attribute for font styling
document.documentElement.lang = i18n.language;

createRoot(document.getElementById("root")!).render(<App />);
