import { useTranslation } from "react-i18next";
import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HeartHandshake, FlaskConical, BarChart, BookOpenCheck, ArrowRight } from "lucide-react";

// Import your images
import HarcelementImage from "@/assets/projects/harcelement.png";
import DepressionImage from "@/assets/projects/depression.png";
import AlcoolImage from "@/assets/projects/alcool.png";
import ConseilImage from "@/assets/projects/consier.png";
import FormationImage from "@/assets/projects/formation.png";
import RechercheImage from "@/assets/projects/recherche.png";
import AnalyseImage from "@/assets/projects/analyse.png";
import ConsultImage from "@/assets/projects/consult.png";
import { Link } from "react-router-dom";
import { BookingModal } from "@/components/modal-bookin";
import { useState } from "react";
import { StudyModal } from "@/components/study-modal";

interface Project {
  title: string;
  description: string;
  image: string;
  countries?: string[];
  action: {
    text: string;
    link: string;
  };
  support?: {
    text: string;
    link: string;
  };
}

interface Service {
  category: string;
  icon: React.ReactNode;
  image: string;
  items: string[];
}

export const FeaturesSection = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentStudy, setCurrentStudy] = useState("");

  const openModal = (studyTitle: string) => {
    setCurrentStudy(studyTitle);
    setModalOpen(true);
  };


  // Helper function to safely get array from translations
  const getTranslatedArray = (key: string): string[] => {
    const value = t(key, { returnObjects: true });
    return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
  };

  const currentProjects: Project[] = [
    {
      title: t("projects.harcelement.title"),
      description: t("projects.harcelement.description"),
      image: HarcelementImage,
      countries: getTranslatedArray("projects.harcelement.countries"),
      action: {
        text: t("projects.harcelement.action_text"),
        link: "#"
      },
      support: {
        text: t("projects.harcelement.support_text"),
        link: "#"
      }
    },
    {
      title: t("projects.depression.title"),
      description: t("projects.depression.description"),
      image: DepressionImage,
      action: {
        text: t("projects.depression.action_text"),
        link: "#"
      }
    },
    {
      title: t("projects.alcool.title"),
      description: t("projects.alcool.description"),
      image: AlcoolImage,
      action: {
        text: t("projects.alcool.action_text"),
        link: "#"
      }
    }
  ];

  const services: Service[] = [
    {
      category: t("services.conseil.category"),
      icon: <HeartHandshake className="w-8 h-8" />,
      image: ConseilImage,
      items: getTranslatedArray("services.conseil.items")
    },
    {
      category: t("services.formation.category"),
      icon: <BookOpenCheck className="w-8 h-8" />,
      image: FormationImage,
      items: getTranslatedArray("services.formation.items")
    },
    {
      category: t("services.recherche.category"),
      icon: <FlaskConical className="w-8 h-8" />,
      image: RechercheImage,
      items: getTranslatedArray("services.recherche.items")
    },
    {
      category: t("services.analyse.category"),
      icon: <BarChart className="w-8 h-8" />,
      image: AnalyseImage,
      items: getTranslatedArray("services.analyse.items")
    }
  ];

  return (
    <section id="features" className={`py-16 md:py-24 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4">
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`text-3xl md:text-4xl font-bold text-center mb-12 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
          >
            {t("projects.title")}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className={`h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg ${theme === 'dark' ? 'bg-gray-800 border-gray-700 hover:border-primary-300' : 'bg-white border-gray-200 hover:border-primary'}`}>
                  {/* Project Image */}
                  <motion.div
                    className="relative h-48 overflow-hidden"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  </motion.div>

                  <CardHeader>
                    <CardTitle className={`text-xl ${theme === 'dark' ? 'text-primary-300' : 'text-primary-600'}`}>
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                      {project.description}
                    </p>

                    {project.countries && (
                      <div className="mb-4">
                        <p className={`font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} mb-2`}>
                          {project.action.text}:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.countries.map((country, i) => (
                            <motion.div
                              key={i}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openModal(project.title)}
                                className={`text-xs ${theme === 'dark' ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-100'}`}
                              >
                                {country}
                              </Button>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {!project.countries && project.action && (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          variant="default"
                          className="w-full mb-4 group"
                          onClick={() => openModal(project.title)}
                        >
                          {project.action.text}
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </motion.div>
                    )}
                  </CardContent>
                  <CardFooter className="flex flex-col items-start">
                    {project.support && (
                      <motion.a 
                        whileHover={{ x: 5 }}
                        className={`text-sm flex items-center ${theme === 'dark' ? 'text-primary-300 hover:text-primary-200' : 'text-primary-600 hover:text-primary-800'} mb-2`}
                      >
                        {project.support.text}
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </motion.a>
                    )}
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {t("projects.participation_note")}
                    </p>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Services Section */}
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`text-3xl md:text-4xl font-bold text-center mb-12 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
          >
            {t("services.title")}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card
                  className={`h-full group overflow-hidden relative transition-all duration-300 ${theme === 'dark' ? 'bg-gray-800 border-gray-700 hover:border-primary-300' : 'bg-white border-gray-200 hover:border-primary'}`}
                >
                  {/* Service Image with overlay */}
                  <motion.div
                    className="relative h-40 overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={service.image}
                      alt={service.category}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <motion.div
                      className="absolute top-4 left-4 p-2 rounded-full backdrop-blur-sm"
                      initial={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                      whileHover={{
                        backgroundColor: theme === 'dark' ? 'rgba(167, 139, 250, 0.6)' : 'rgba(99, 102, 241, 0.6)',
                        scale: 1.1
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {service.icon}
                    </motion.div>
                  </motion.div>

                  <CardHeader className="relative z-10">
                    <CardTitle className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {service.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <ul className="space-y-3">
                      {service.items.map((item, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full mt-2 mr-2 flex-shrink-0 ${theme === 'dark' ? 'bg-primary-300' : 'bg-primary-600'}`}></span>
                          <span className={`${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                            {item}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: theme === 'dark'
                        ? 'radial-gradient(circle at center, rgba(167, 139, 250, 0.1) 0%, transparent 70%)'
                        : 'radial-gradient(circle at center, rgba(99, 102, 241, 0.1) 0%, transparent 70%)'
                    }}
                  />
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mb-20">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900 rounded-2xl overflow-hidden">
            <div className="container mx-auto p-8 md:p-12 text-white">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    {t("researchData.title")}
                  </h3>
                  <p className="mb-6">
                    {t("researchData.description")}
                  </p>
                  <Button variant="secondary">
                    <Link to="/data-center">
                      {t("researchData.cta.title")}
                    </Link>
                  </Button>
                </div>
                <div className="hidden lg:flex justify-center">
                  <div className="bg-white/20 p-6 rounded-xl backdrop-blur-sm">
                    <img
                      src="/images/data-center.png"
                      alt={t("researchData.imageAlt")}
                      className="w-full max-w-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`relative rounded-3xl px-6 py-10 md:px-14 md:py-16 overflow-hidden 
    ${theme === 'dark'
              ? 'bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900'
              : 'bg-gradient-to-br from-primary-300 via-primary-400 to-primary-500'}`}
        >
          {/* Fundo animado com gradiente radial */}
          <motion.div
            className="absolute inset-0 opacity-20 z-0"
            animate={{
              background: [
                'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.3) 0%, transparent 30%)',
                'radial-gradient(circle at 80% 70%, rgba(255,255,255,0.3) 0%, transparent 30%)',
                'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 0%, transparent 30%)'
              ]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />

          <div className="relative z-10 max-w-5xl mx-auto text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={ConsultImage}
                alt="Consult"
                className="mb-8 w-full max-w-md md:max-w-lg mx-auto md:mx-0 rounded-xl shadow-2xl"
              />
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-3xl md:text-4xl font-bold mb-4 
        ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
            >
              {t("values.title")}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={`text-base md:text-lg mb-4 
        ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}
            >
              {t("values.description1")}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className={`text-base md:text-lg mb-8 
        ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}
            >
              {t("values.description2")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className={`rounded-xl p-6 md:p-8 max-w-md mx-auto md:mx-0 backdrop-blur-sm shadow-lg 
        ${theme === 'dark' ? 'bg-gray-900/70 border border-white/10 text-white' : 'bg-white/90 text-gray-800 border border-gray-200'}`}
            >
              <h4 className={`text-lg md:text-xl font-semibold mb-4`}>
                {t("values.consultation_text")}
              </h4>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  className="w-full group"
                  onClick={() => setIsBookingModalOpen(true)}
                  aria-label={t("values.reserve_button")}
                  aria-haspopup="dialog"
                >
                  {t("values.reserve_button")}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

      </div>
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
      <StudyModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        studyTitle={currentStudy}
      />
    </section>
  );
};