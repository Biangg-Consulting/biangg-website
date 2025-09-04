import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Rocket, Satellite } from "lucide-react";
import { useTranslation } from "react-i18next";

export const NotFoundPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("common");
  
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 to-gray-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-twinkle" />
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-purple-400 rounded-full animate-twinkle-delay" />
        <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-twinkle-delay-2" />
        
        {/* Floating planets */}
        <div className="absolute top-20 left-20 w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full opacity-20 animate-float-slow" />
        <div className="absolute bottom-32 right-32 w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full opacity-20 animate-float-slower" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center space-y-8 p-6 max-w-2xl">
        {/* Error code */}
        <div className="flex items-center space-x-4">
          <Rocket className="h-8 w-8 text-yellow-400 animate-bounce" />
          <span className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
            {t("notFound.errorCode")}
          </span>
          <Satellite className="h-8 w-8 text-purple-400 animate-spin-slow" />
        </div>

        {/* Main content */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {t("notFound.title")}
          </h1>
          
          <p className="text-xl text-gray-300">
            {t("notFound.subtitle")}
          </p>
          
          <p className="text-lg text-gray-400 max-w-lg">
            {t("notFound.description")}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate(-1)}
            className="group bg-transparent text-white border-white/20 hover:bg-white/10 hover:text-white transition-all"
          >
            <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            {t("notFound.goBack")}
          </Button>

          <Button
            variant="default"
            size="lg"
            onClick={() => navigate("/")}
            className="group bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all"
          >
            <Home className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            {t("notFound.goHome")}
          </Button>
        </div>
      </div>

      {/* Astronaut floating animation (optional) */}
      <div className="absolute bottom-10 right-10 opacity-10 animate-float-slowest">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="120"
          height="120"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="8" r="5" />
          <path d="M12 13a5 5 0 0 0-5 5v1h10v-1a5 5 0 0 0-5-5z" />
        </svg>
      </div>
    </div>
  );
};