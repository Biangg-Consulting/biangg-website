import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowDown } from "lucide-react";
import Heromountain from "@/assets/mountain.jpg";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

// Componente Badge animado reutilizável
const AnimatedBadge = ({ text }: { text: string }) => (
  <motion.span
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="inline-block px-3 py-1 text-xs sm:text-sm font-medium rounded-full bg-primary/10 text-primary dark:bg-primary-400/15 dark:text-primary-300 mb-4 sm:mb-6 border border-primary/20 dark:border-primary-400/20"
  >
    {text}
  </motion.span>
);

// Componente Título animado reutilizável
const AnimatedTitle = ({ title, highlight }: { title: string, highlight: string }) => (
  <motion.h1
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.3 }}
    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight"
  >
    {title}
    <span className="bg-gradient-to-r from-primary to-primary-400 dark:from-primary-300 dark:to-primary-500 bg-clip-text text-transparent">
      {highlight}
    </span>
  </motion.h1>
);

// Componente Descrição animada reutilizável
const AnimatedDescription = ({ text }: { text: string }) => (
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.4 }}
    className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300/90 mb-6 sm:mb-8 max-w-lg leading-relaxed"
  >
    {text}
  </motion.p>
);

// Componente Grupo de Botões animado reutilizável
const AnimatedButtonGroup = ({ primaryText }: { primaryText: string, secondaryText: string }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.5 }}
    className="flex flex-col xs:flex-row gap-3 sm:gap-4 mb-12 sm:mb-16"
  >
    <Button
      size="lg"
      className="group shadow-lg px-4 sm:px-6 py-3 text-sm sm:text-base"
    >
      <Link to="/projects">
        {primaryText}
      </Link>
      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Button> 
  </motion.div>
);

// Componente Item de Estatística reutilizável
const StatItem = ({ value, label, index }: { value: string, label: string, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
      className="border-l-2 border-primary/50 dark:border-primary-400/50 pl-3 sm:pl-4 py-1 sm:py-2"
    >
      <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
      <p className="text-gray-600 dark:text-gray-400/80 text-xs sm:text-sm font-medium">{label}</p>
    </motion.div>
  );
};

// Componente Indicador de Scroll reutilizável
const ScrollIndicator = ({ text }: { text: string }) => (
  <motion.div
    className="absolute bottom-6 sm:bottom-8 left-[45%] transform -translate-x-1/2"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1 }}
  >
    <div className="flex flex-col items-center">
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-gray-500 dark:text-gray-400"
      >
        <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />
      </motion.div>
      <span className="text-xs mt-1 sm:mt-2 text-gray-500 dark:text-gray-400 font-medium tracking-wider">
        {text}
      </span>
    </div>
  </motion.div>
);

export const HeroSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Efeitos de parallax
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacityBg = useTransform(scrollYProgress, [0, 0.7], [1, 0.5]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  // Animação do texto
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.7]);

  return (
    <section
      ref={ref}
      className="relative h-screen min-h-[900px] sm:min-h-[800px] flex items-center overflow-hidden sm:pt-20 pt-24"
    >
      {/* Background com efeito parallax */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ y: yBg, opacity: opacityBg, scale: scaleBg }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/70 to-white/30 dark:from-gray-950/95 dark:via-gray-950/85 dark:to-gray-950/60"></div>
        <img
          src={Heromountain}
          alt={t("hero.image_alt")}
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
      </motion.div>

      {/* Conteúdo principal */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Coluna esquerda - Conteúdo de texto */}
          <motion.div
            className="order-2 lg:order-1"
            style={{ y: textY, opacity: textOpacity }}
          >
            <AnimatedBadge text={t("hero.badge")} />
            <AnimatedTitle
              title={t("hero.title")}
              highlight={t("hero.title_highlight")}
            />
            <AnimatedDescription text={t("hero.description")} />
            <AnimatedButtonGroup
              primaryText={t("hero.primary_button")}
              secondaryText={t("hero.secondary_button")}
            />
          </motion.div>

          {/* Coluna direita - Estatísticas */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
              <StatItem
                value="50+"
                label={t("hero.stats.projects")}
                index={0}
              />
              <StatItem
                value="100%"
                label={t("hero.stats.success")}
                index={1}
              />
              <StatItem
                value="10+"
                label={t("hero.stats.years")}
                index={2}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <ScrollIndicator text={t("hero.scroll_hint")} />
    </section>
  );
};