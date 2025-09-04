import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import App from "./app.tsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/error-fallback.tsx";
import './i18n/config';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <App />
    </ErrorBoundary>
  </StrictMode>
);