"use client"

import { Header } from "../home/components/header";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Import project images
import HarcelementImage from "@/assets/projects/harcelement.png";
import DepressionImage from "@/assets/projects/depression.png";
import AlcoolImage from "@/assets/projects/alcool.png";
import { useState } from "react";
import { StudyModal } from "@/components/study-modal";

export const ProjectPage = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentStudy, setCurrentStudy] = useState("");

  const openModal = (studyTitle: string) => {
    setCurrentStudy(studyTitle);
    setModalOpen(true);
  };


  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-950' : 'bg-background'} text-foreground font-sans`}>
      <Header />
      <div className="px-5 md:px-20 lg:px-40 pt-20">
        {/* Projects Hero Section */}
        <section className="py-12 md:py-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`text-4xl md:text-5xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
          >
            {t("projects.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-lg mb-8 max-w-3xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
          >
            {t("projects.participation_note")}
          </motion.p>
        </section>

        {/* Sexual Harassment Project */}
        <section className="py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-8 items-center"
          >
            <div className="order-2 md:order-1">
              <Card className={`h-full ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white'}`}>
                <CardHeader>
                  <Badge variant="secondary" className="w-fit mb-4">
                    {t("projects.harcelement.title")}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {t("projects.harcelement.description")}
                  </p>

                  <div className="mb-6">
                    <CardFooter className="flex gap-4">
                      <Button onClick={() => openModal(t("projects.harcelement.title"))}>
                        {t("projects.harcelement.action_text")}
                      </Button>
                    </CardFooter>
                    <div className="flex flex-wrap gap-2">
                      {(t("projects.harcelement.countries", { returnObjects: true }) as string[]).map((country: string, index: number) => (
                        <Badge
                          key={index}
                          variant={theme === 'dark' ? 'outline' : 'secondary'}
                          className="cursor-pointer hover:bg-primary-600 hover:text-white transition-colors"
                        >
                          {country}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-4">
                  <Button>
                    {t("projects.harcelement.support_text")}
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <motion.div
              className="order-1 md:order-2 rounded-xl overflow-hidden shadow-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <img
                src={HarcelementImage}
                alt={t("projects.harcelement.title")}
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </motion.div>
        </section>

        <Separator className={`my-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`} />

        {/* Depression Project */}
        <section className="py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid md:grid-cols-2 gap-8 items-center"
          >
            <motion.div
              className="rounded-xl overflow-hidden shadow-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <img
                src={DepressionImage}
                alt={t("projects.depression.title")}
                className="w-full h-auto object-cover"
              />
            </motion.div>
            <div>
              <Card className={`h-full ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white'}`}>
                <CardHeader>
                  <Badge variant="secondary" className="w-fit mb-4">
                    {t("projects.depression.title")}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {t("projects.depression.description")}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => openModal(t("projects.depression.title"))}>
                    {t("projects.depression.action_text")}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </motion.div>
        </section>

        <Separator className={`my-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`} />

        {/* Alcohol Project */}
        <section className="py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid md:grid-cols-2 gap-8 items-center"
          >
            <div className="order-2 md:order-1">
              <Card className={`h-full ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white'}`}>
                <CardHeader>
                  <Badge variant="secondary" className="w-fit mb-4">
                    {t("projects.alcool.title")}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {t("projects.alcool.description")}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => openModal(t("projects.alcool.title"))}>
                    {t("projects.alcool.action_text")}
                  </Button>
                </CardFooter>

              </Card>
            </div>
            <motion.div
              className="order-1 md:order-2 rounded-xl overflow-hidden shadow-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <img
                src={AlcoolImage}
                alt={t("projects.alcool.title")}
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="py-16 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`p-8 rounded-xl ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t('sectionT.title')}
            </h2>
            <p className={`text-lg mb-8 max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {t('sectionT.contact')}
            </p>
            <Button size="lg" className="px-8 py-6 text-lg">
              {t('sectionT.button')}
            </Button>
          </motion.div>
        </section>
      </div>
      <StudyModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        studyTitle={currentStudy}
      />
    </div>
  );
};