import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/contexts/ThemeContext";
import { X } from "lucide-react";

export const CookieConsent = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = (type: "all" | "essential") => {
    localStorage.setItem("cookieConsent", type);
    if (type === "all") {
    }
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    document.cookie.split(";").forEach(cookie => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    });
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={`
      fixed z-50 bottom-0 left-0 right-0 
      ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200'}
      border-t shadow-xl
    `}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1 max-w-4xl">
            <div className="flex justify-between items-start">
              <h3 className="font-medium mb-2 text-lg">
                {t("cookieConsent.title")}
              </h3>
              <button 
                onClick={() => setIsVisible(false)}
                className="p-1 -mt-1 -mr-1"
                aria-label={t("cookieConsent.close")}
              >
                <X size={20} />
              </button>
            </div>
            
            <p className="text-sm mb-3">
              {t("cookieConsent.description")}{" "}
              <button 
                onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                className="underline font-medium"
              >
                {isDetailsOpen ? t("cookieConsent.hideDetails") : t("cookieConsent.showDetails")}
              </button>
            </p>

            {isDetailsOpen && (
              <div className={`p-4 mb-3 rounded-md ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h4 className="font-medium mb-2">{t("cookieConsent.typesTitle")}</h4>
                <ul className="space-y-3 text-sm">
                  <li>
                    <strong>{t("cookieConsent.essential.title")}:</strong>{" "}
                    {t("cookieConsent.essential.description")}
                  </li>
                  <li>
                    <strong>{t("cookieConsent.analytics.title")}:</strong>{" "}
                    {t("cookieConsent.analytics.description")}
                  </li>
                  <li>
                    <strong>{t("cookieConsent.preferences.title")}:</strong>{" "}
                    {t("cookieConsent.preferences.description")}
                  </li>
                </ul>
                <p className="mt-3 text-sm">
                  <a 
                    href={``} 
                    className="underline font-medium"
                  >
                    {t("cookieConsent.privacyPolicyLink")}
                  </a>
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <Button 
                size="sm" 
                variant="secondary"
                onClick={() => handleAccept('essential')}
              >
                {t("cookieConsent.acceptEssential")}
              </Button>
              <Button 
                size="sm" 
                onClick={() => handleAccept('all')}
              >
                {t("cookieConsent.acceptAll")}
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={handleDecline}
              >
                {t("cookieConsent.decline")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};