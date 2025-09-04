import { useState } from "react";
import { ChevronDown, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/auth/auth-context";
import { User as  UserType } from "@/models/user.model";

interface UserDropdownProps {
  user?: UserType
}

export const UserDropdown = ({ user }: UserDropdownProps) => {
  const { t } = useLanguage();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
 
  
  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
            <User size={16} />
          </div>
        )}
        <ChevronDown size={16} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-xl py-2 z-50 border border-gray-100 dark:border-gray-700">
          <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
            <p className="font-medium text-gray-900 dark:text-white">{user?.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Perfil</p>
          </div>
          {(user?.role === "ADMIN" || user?.role === "SUPER_ADMIN") && (
            <NavLink
              to="/dashboard"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              {t("header.dashboard")}
            </NavLink>)}  
          <button
            onClick={() => {
              logout();
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500"
          >
            {t("header.logout")}
          </button>
        </div>
      )}
    </div>
  );
};