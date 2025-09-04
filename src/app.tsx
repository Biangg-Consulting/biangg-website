import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { queryClient } from "./services/query-client";
import Providers from "./providers";
import { CookieConsent } from "./components/cookie-consent";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/auth/auth-context";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <LanguageProvider>
              <ThemeProvider>
                <Providers />
                <CookieConsent />
              </ThemeProvider>
            </LanguageProvider>
          </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;