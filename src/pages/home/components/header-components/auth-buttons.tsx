import { NavLink } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export const AuthButtons = () => {
  const { t } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <NavLink
        to="/sign-in"
        className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        {t("header.login")}
      </NavLink>
      <NavLink
        to="/sign-up"
        className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-600 transition-colors"
      >
        {t("header.register")}
      </NavLink>
    </div>
  );
};