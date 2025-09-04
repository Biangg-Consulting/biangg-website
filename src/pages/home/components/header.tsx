import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/auth/auth-context";
import { useLanguage } from "@/contexts/LanguageContext";
import { Logo } from "./header-components/logo";
import { LanguageSwitcher } from "./header-components/language-switcher";
import { ThemeSwitcher } from "./header-components/theme-switcher";
import { UserDropdown } from "./header-components/user-dropdown";
import { AuthButtons } from "./header-components/auth-buttons";

export const Header = () => {
  const { isAuthenticated, user } = useAuth();
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
        setActiveDropdown(null);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (mobileMenuOpen) setActiveDropdown(null);
  };

  const handleDropdownToggle = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const handleDropdownHover = (menu: string) => {
    setActiveDropdown(menu);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  // Links e estrutura do menu
  const solutionsLinks = [
    { to: "/health", text: t("header.health") },
    { to: "/nutritions", text: t("header.nutrition") },
    { to: "/education", text: t("header.education") },
    { to: "/public-sector", text: t("header.public_sector") }
  ];

  const resourcesLinks = [
    { to: "/training", text: t("header.training") },
    { to: "/research", text: t("header.research_service") },
    { to: "/weight-loss", text: t("header.weight_loss") },
    // { to: "/resources/media", text: t("header.media") },
    // { to: "/resources/publications", text: t("header.publications") },
    { to: "/how-we-work", text: t("header.how_we_work") }
  ];

  const mainLinks = [
    { to: "/", text: t("header.home") },
    { to: "/data-center", text: t("header.projects") },
    { to: "/à-propos-de-nous", text: t("header.about") }
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${isScrolled
        ? "backdrop-blur-md bg-white/70 dark:bg-gray-900/70 shadow-sm"
        : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {mainLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg transition-colors ${isActive
                    ? "text-primary dark:text-primary-300 font-medium"
                    : "hover:text-primary dark:hover:text-primary-300 text-gray-700 dark:text-gray-200"
                  }`
                }
              >
                {link.text}
              </NavLink>
            ))}

            {/* Solutions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownHover("solutions")}
              onMouseLeave={handleDropdownLeave}
            >
              <button className="flex items-center gap-1 px-3 py-2 rounded-lg transition-colors hover:text-primary dark:hover:text-primary-300 text-gray-700 dark:text-gray-200">
                {t("header.solutions")}
                <ChevronDown size={16} className="mt-0.5" />
              </button>
              {activeDropdown === "solutions" && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-xl py-2 z-50 border border-gray-100 dark:border-gray-700">
                  {solutionsLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      className={({ isActive: isRouteActive }) =>
                        `block px-4 py-2 transition-colors ${isRouteActive
                          ? "bg-primary-50 dark:bg-gray-700 text-primary dark:text-primary-300"
                          : "hover:bg-gray-50 dark:hover:bg-gray-700"
                        }`
                      }
                    >
                      {link.text}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownHover("resources")}
              onMouseLeave={handleDropdownLeave}
            >
              <button className="flex items-center gap-1 px-3 py-2 rounded-lg transition-colors hover:text-primary dark:hover:text-primary-300 text-gray-700 dark:text-gray-200">
                {t("header.resources")}
                <ChevronDown size={16} className="mt-0.5" />
              </button>
              {activeDropdown === "resources" && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-xl py-2 z-50 border border-gray-100 dark:border-gray-700">
                  {resourcesLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      className={({ isActive: isRouteActive }) =>
                        `block px-4 py-2 transition-colors ${isRouteActive
                          ? "bg-primary-50 dark:bg-gray-700 text-primary dark:text-primary-300"
                          : "hover:bg-gray-50 dark:hover:bg-gray-700"
                        }`
                      }
                    >
                      {link.text}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center">

              <LanguageSwitcher />
              <ThemeSwitcher />
              {isAuthenticated && user ? (
                <UserDropdown user={user} />
              ) : (
                <AuthButtons />
              )}
            </div>

          </nav>

          <div className="flex items-center gap-3">

            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X size={24} className="text-gray-700 dark:text-gray-200" />
              ) : (
                <Menu size={24} className="text-gray-700 dark:text-gray-200" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg">
            <nav className="flex flex-col space-y-2">
              {mainLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg transition-colors ${isActive
                      ? "bg-primary-50 dark:bg-gray-700 text-primary dark:text-primary-300 font-medium"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
                    }`
                  }
                  onClick={toggleMobileMenu}
                >
                  {link.text}
                </NavLink>
              ))}

              {/* Mobile Solutions Dropdown */}
              <div className="relative">
                <button
                  className="flex items-center justify-between w-full px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
                  onClick={() => handleDropdownToggle("solutions-mobile")}
                >
                  {t("header.solutions")}
                  {activeDropdown === "solutions-mobile" ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>
                {activeDropdown === "solutions-mobile" && (
                  <div className="ml-4 mt-1 space-y-1 bg-gray-50/50 dark:bg-gray-800/50 rounded-lg p-2">
                    {solutionsLinks.map((link) => (
                      <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) =>
                          `block px-4 py-2 rounded-lg transition-colors ${isActive
                            ? "bg-primary-50 dark:bg-gray-700 text-primary dark:text-primary-300"
                            : "hover:bg-gray-100 dark:hover:bg-gray-700"
                          }`
                        }
                        onClick={toggleMobileMenu}
                      >
                        {link.text}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  className="flex items-center justify-between w-full px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
                  onClick={() => handleDropdownToggle("resources-mobile")}
                >
                  {t("header.resources")}
                  {activeDropdown === "resources-mobile" ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>
                {activeDropdown === "resources-mobile" && (
                  <div className="ml-4 mt-1 space-y-1 bg-gray-50/50 dark:bg-gray-800/50 rounded-lg p-2">
                    {resourcesLinks.map((link) => (
                      <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) =>
                          `block px-4 py-2 rounded-lg transition-colors ${isActive
                            ? "bg-primary-50 dark:bg-gray-700 text-primary dark:text-primary-300"
                            : "hover:bg-gray-100 dark:hover:bg-gray-700"
                          }`
                        }
                        onClick={toggleMobileMenu}
                      >
                        {link.text}
                      </NavLink>
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-evenly">

                  {isAuthenticated && user ? (
                    <UserDropdown user={user} />
                  ) : (
                    <AuthButtons />
                  )}
                  <LanguageSwitcher />
                  <ThemeSwitcher />
                </div>

              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};