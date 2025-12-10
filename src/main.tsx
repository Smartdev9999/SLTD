import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import i18n from "./i18n/config";

// Wait for i18n to be initialized before rendering the app
const renderApp = () => {
  document.documentElement.lang = i18n.language;
  createRoot(document.getElementById("root")!).render(<App />);
};

// Check if i18n is already initialized, otherwise wait
if (i18n.isInitialized) {
  renderApp();
} else {
  i18n.on('initialized', renderApp);
}
