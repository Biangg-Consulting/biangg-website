import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/contexts/ThemeContext";
import { ArrowRight, Play, Users, Target, Award, Zap, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import video from "@/assets/into.mp4";

export const AboutUsSection = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<any>(null);
  const sectionRef = useRef(null);

  const features = [
    {
      icon: Users,
      key: "experienced_team"
    },
    {
      icon: Target,
      key: "results_focus"
    },
    {
      icon: Award,
      key: "premium_quality"
    },
    {
      icon: Zap,
      key: "constant_innovation"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]:any) => {
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.play()
            .then(() => {
              setIsVideoPlaying(true);
            })
            .catch((error:any) => {
              console.log("Autoplay prevented:", error);
              setIsVideoPlaying(false);
            });
        } else if (videoRef.current && !entry.isIntersecting) {
          videoRef.current.pause();
        }
      },
      { threshold: 0.5 } 
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play()
        .then(() => {
          setIsVideoPlaying(true);
        })
        .catch((error:any) => {
          console.log("Play failed:", error);
        });
    }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`py-16 md:py-24 px-4 md:px-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Container principal */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          {/* Text content */}
          <div className="flex-1 order-2 lg:order-1">
            {/* Badge */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className={`inline-block px-4 py-2 text-sm font-medium rounded-full mb-4 ${
                theme === 'dark' 
                  ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30' 
                  : 'bg-primary-100 text-primary-700 border border-primary-200'
              }`}
            >
              {t("about.subtitle")}
            </motion.span>

            {/* Título */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`text-3xl md:text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
            >
              {t("about.title")}
            </motion.h2>

            {/* Parágrafos */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {t("about.description1")}
              </p>
              <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {t("about.description2")}
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={`mt-8 grid grid-cols-3 gap-4 p-6 rounded-xl ${
                theme === 'dark' 
                  ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700' 
                  : 'bg-white/80 backdrop-blur-sm shadow-lg border border-gray-100'
              }`}
            >
              {["years", "projects", "countries"].map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.p 
                    className={`text-3xl font-bold mb-1 ${theme === 'dark' ? 'text-primary-400' : 'text-primary-600'}`}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  >
                    {stat === "years" ? "10+" : stat === "projects" ? "50+" : "5+"}
                  </motion.p>
                  <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {t(`about.stats.${stat}`)}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Call to action */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8"
            >
              <Button className="group bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                <a href="/about" className="flex items-center">
                  {t("about.team_button")}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Video e Visualizações - MODIFICADO para mobile */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 w-full order-1 lg:order-2 mb-8 lg:mb-0" // Removido hidden lg:block
          >
            <div className="relative">
              {/* Video Container */}
              <motion.div 
                className={`relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden shadow-2xl ${
                  theme === 'dark' 
                    ? 'bg-gradient-to-br from-gray-800 to-gray-900' 
                    : 'bg-gradient-to-br from-gray-100 to-gray-200'
                }`}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Video Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 via-purple-600/10 to-blue-600/20"></div>
                
                {/* Video Element */}
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  muted={isMuted}
                  loop
                  playsInline
                  onPlay={() => setIsVideoPlaying(true)}
                  onPause={() => setIsVideoPlaying(false)}
                >
                  <source src={video} type="video/mp4" />
                  {t("videoNotSupported")}
                </video>

                {/* Play Button Overlay */}
                {!isVideoPlaying && (
                  <motion.button
                    className={`absolute inset-0 flex items-center justify-center ${
                      theme === 'dark' 
                        ? 'bg-black/40 hover:bg-black/50' 
                        : 'bg-white/30 hover:bg-white/40'
                    } backdrop-blur-sm transition-all duration-300`}
                    onClick={handlePlayClick}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="bg-white/90 hover:bg-white text-primary-600 rounded-full p-3 sm:p-4 shadow-lg">
                      <Play className="h-6 w-6 sm:h-8 sm:w-8 ml-0.5 sm:ml-1" fill="currentColor" />
                    </div>
                  </motion.button>
                )}

                {/* Mute Button */}
                {isVideoPlaying && (
                  <motion.button
                    className={`absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 sm:p-2 rounded-full ${
                      theme === 'dark' 
                        ? 'bg-black/60 text-white hover:bg-black/80' 
                        : 'bg-white/80 text-gray-800 hover:bg-white'
                    } backdrop-blur-sm transition-all duration-300`}
                    onClick={toggleMute}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isMuted ? <VolumeX size={16} className="sm:w-5" /> : <Volume2 size={16} className="sm:w-5" />}
                  </motion.button>
                )}

                {/* Video Info Overlay */}
                <div className={`absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 ${
                  theme === 'dark' 
                    ? 'bg-black/60 backdrop-blur-md' 
                    : 'bg-white/80 backdrop-blur-md'
                } rounded-lg p-2 sm:p-3`}>
                  <h3 className={`font-semibold text-sm sm:text-base ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {t("about.video.title", { defaultValue: "Our Story in Motion" })}
                  </h3>
                  <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {t("about.video.description", { defaultValue: "Get to know our journey and values" })}
                  </p>
                </div>
              </motion.div>

              {/* Features Grid */}
              <motion.div 
                className="grid grid-cols-2 gap-3 mt-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className={`p-3 sm:p-4 rounded-xl ${
                      theme === 'dark' 
                        ? 'bg-gray-800/50 hover:bg-gray-800/70 border border-gray-700' 
                        : 'bg-white/80 hover:bg-white shadow-md hover:shadow-lg border border-gray-100'
                    } backdrop-blur-sm transition-all duration-300 cursor-pointer`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  >
                    <feature.icon className={`h-5 w-5 sm:h-6 sm:w-6 mb-2 ${
                      theme === 'dark' ? 'text-primary-400' : 'text-primary-600'
                    }`} />
                    <h4 className={`font-semibold text-xs sm:text-sm mb-1 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {t(`about.features.${feature.key}.title`)}
                    </h4>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {t(`about.features.${feature.key}.description`)}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-primary-500 rounded-full opacity-20"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute -bottom-2 -left-2 w-6 h-6 bg-purple-500 rounded-full opacity-30"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};