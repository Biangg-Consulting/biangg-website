import bianggLogo from "@/assets/biangg.png";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";

type SignContainerProps = {
  children: React.ReactNode;
  quote?: string;
  author?: string;
};

export const SignContainer: React.FC<SignContainerProps> = ({ 
  children,
  quote = "Transforming data into social impact through rigorous research and community engagement.",
  author = "Biangg Research Team"
}) => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const navigateToHomePage = () => {
    navigate("/");
  };

  return (
    <div className={`min-h-screen flex flex-col md:flex-row ${theme === 'dark' ? 'bg-gray-950' : 'bg-white'}`}>
      {/* Left Panel - Research Image */}
      <div className="relative hidden w-full md:w-1/2 lg:w-3/5 md:flex">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <img
            src={bianggLogo}
            alt="Biangg Research Team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30" />
        </motion.div>

        <div className="relative z-10 flex flex-col h-full p-8 lg:p-12">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-3 mb-8 cursor-pointer"
            onClick={navigateToHomePage}
          >
            <img
              src={bianggLogo}
              alt="Biangg Logo"
              className="h-10 w-10"
            />
            <span className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-white'}`}>
              Biangg Research
            </span>
          </motion.div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-auto"
          >
            <blockquote className="space-y-4">
              <p className={`text-xl lg:text-2xl leading-relaxed ${theme === 'dark' ? 'text-gray-200' : 'text-white'}`}>
                &ldquo;{quote}&rdquo;
              </p>
              <footer className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-200'}`}>
                — {author}
              </footer>
            </blockquote>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Form Content */}
      <div className={`w-full md:w-1/2 lg:w-2/5 flex items-center justify-center p-6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};