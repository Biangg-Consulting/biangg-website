import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import BianggLogo from "@/assets/biangg.png";
import { Linkedin, Youtube, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useState } from "react"; // Importar useState
import { api } from "@/services/api/api";

export const Footer = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [email, setEmail] = useState(""); 
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [subscriptionStatus, setSubscriptionStatus] = useState<"idle" | "success" | "error">("idle"); 

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    setIsSubmitting(true);
    setSubscriptionStatus("idle");
    
    try {
      const response = await api.post("/subscriptions", { email });

      if (response.data.success) {
        setSubscriptionStatus("success");
        setEmail(""); 
      } else {
        setSubscriptionStatus("error");
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      setSubscriptionStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`w-full ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-10 lg:grid lg:grid-cols-3 lg:gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center lg:items-start gap-6"
        >
          <div className="flex items-center gap-3">
            <motion.img 
              src={BianggLogo} 
              alt="Biangg Logo" 
              className="w-10 h-10"
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-primary-700 dark:from-primary-400 dark:to-primary-600">
              Biangg
            </h2>
          </div>
          <p className={`text-sm text-center lg:text-left ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {t("footer.tagline")}
          </p>
          
          {/* Botão Voltar ao Topo */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-1 text-sm font-medium ${theme === 'dark' ? 'text-white hover:text-primary-300' : 'text-primary-600 hover:text-primary-800'}`}
          >
            <ArrowUpRight className="w-4 h-4 rotate-90" />
            {t("footer.backToTop")}
          </motion.button>
        </motion.div>

        {/* Coluna 2 – Endereços */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col gap-8 text-center lg:text-left"
        >
          {/* Canadá */}
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-100'} shadow-sm`}
          >
            <h3 className="font-semibold mb-2 flex items-center gap-2 dark:text-white">
              <MapPin className="w-4 h-4 text-primary-500" />
              {t("footer.canada.title")}
            </h3>
            <address className="not-italic whitespace-pre-line text-sm text-neutral-600 dark:text-neutral-400">
              {t("footer.canada.address")}
            </address>
            <div className="mt-3 flex flex-col gap-1 text-sm">
              <a 
                href={`mailto:${t("footer.canada.email")}`} 
                className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400"
              >
                <Mail className="w-4 h-4" />
                {t("footer.canada.email")}
              </a>
              <a 
                href={`tel:${t("footer.canada.phone")}`} 
                className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400"
              >
                <Phone className="w-4 h-4" />
                {t("footer.canada.phone")}
              </a>
            </div>
          </motion.div>

          {/* Gabon */}
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-100'} shadow-sm`}
          >
            <h3 className="font-semibold mb-2 flex items-center gap-2 dark:text-white">
              <MapPin className="w-4 h-4 text-primary-500" />
              {t("footer.gabon.title")}
            </h3>
            <address className="not-italic whitespace-pre-line text-sm text-neutral-600 dark:text-neutral-400">
              {t("footer.gabon.address")}
            </address>
            <div className="mt-3 flex flex-col gap-1 text-sm">
              <a 
                href={`mailto:${t("footer.gabon.email")}`} 
                className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400"
              >
                <Mail className="w-4 h-4" />
                {t("footer.gabon.email")}
              </a>
              <a 
                href={`tel:${t("footer.gabon.phone")}`} 
                className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400"
              >
                <Phone className="w-4 h-4" />
                {t("footer.gabon.phone")}
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Coluna 3 – Links e redes */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center lg:items-end gap-8"
        > 

          {/* Newsletter */}
          <motion.form 
            onSubmit={handleNewsletterSubmit}
            className={`w-full max-w-xs p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm`}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="font-semibold mb-2 dark:text-white">
              {t("footer.newsletter.title")}
            </h3>
            <p className={`text-xs mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {t("footer.newsletter.subtitle")}
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("footer.newsletter.placeholder")}
                className={`flex-1 text-sm px-3 py-2 rounded border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                required
              />
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-2 dark:bg-gray-700 dark:hover:bg-gray-600 text-white text-sm rounded bg-green-500 hover:bg-green-600 disabled:bg-gray-400"
              >
                {isSubmitting ? t("footer.newsletter.submitting") : t("footer.newsletter.button")}
              </motion.button>
            </div>
            
            {/* Mensagens de status */}
            {subscriptionStatus === "success" && (
              <p className="text-xs mt-2 text-green-500">
                {t("footer.newsletter.success")}
              </p>
            )}
            {subscriptionStatus === "error" && (
              <p className="text-xs mt-2 text-red-500">
                {t("footer.newsletter.error")}
              </p>
            )}
          </motion.form>

          {/* Redes sociais */}
          <div className="flex flex-col items-center lg:items-end gap-4">
            <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              {t("footer.stayConnected")}
            </span>
            <div className="flex items-center gap-3">
              {[
                { 
                  icon: <Linkedin className="w-5 h-5" />,
                  url: "https://www.linkedin.com/company/biangg"
                },
                { 
                  icon: <Youtube className="w-5 h-5" />,
                  url: "https://www.youtube.com/@Bianggconsulting"
                }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Direitos autorais e política */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'} py-6`}
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
            © 2024 Biangg. {t("footer.rights")}
          </p> 
        </div>
      </motion.div>
    </motion.footer>
  );
};