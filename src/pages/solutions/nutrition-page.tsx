import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { StudyCard } from "@/components/study-card";
import { Header } from "../home/components/header";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import NutritionHeroImage from "@/assets/nutrition/Nutritional Cooking.avif";
import WomenMigrantsImage from "@/assets/nutrition/Women with veil.avif";
import ForeignStudentsImage from "@/assets/nutrition/Tempura Bite.avif";
import DentalHealthImage from "@/assets/nutrition/Mother and son.avif";
import { Footer } from "../home/components/footer";

export const NutritionPage = () => {
    const { t } = useLanguage();
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    // Parallax effects
    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const opacityBg = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);
    const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

    return (
        <div className="">
            <section ref={ref} className="relative h-screen min-h-[600px] md:min-h-[800px] flex items-center overflow-hidden pt-20">
                <Header />

                <motion.div
                    className="absolute inset-0 -z-10"
                    style={{ y: yBg, opacity: opacityBg, scale: scaleBg }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/70 to-white/30 dark:from-gray-950/95 dark:via-gray-950/85 dark:to-gray-950/60"></div>
                    <img
                        src={NutritionHeroImage}
                        alt={t("header.nutrition_page.hero_image_alt")}
                        className="w-full h-full object-cover object-center"
                        loading="eager"
                    />
                </motion.div>

                <div className="container relative h-full flex items-center z-20 px-4 sm:px-6">
                    <motion.div
                        className="max-w-2xl"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.h1
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight dark:text-white drop-shadow-lg "
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        >
                            {t("header.nutrition_page.title")}
                        </motion.h1>
                        <motion.p
                            className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 leading-relaxed text-gray-700 dark:text-gray-200"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        >
                            {t("header.nutrition_page.intro")}
                        </motion.p>
                        <motion.div
                            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            <Button
                                variant="outline"
                                size="lg" onClick={() => window.location.href = '/à-propos-de-nous'}
                                className="px-6 py-4 sm:px-8 sm:py-6 text-base sm:text-lg border-2 border-white text-white hover:bg-white/10 hover:text-white transition-all duration-300"
                            >
                                {t("header.contact_us")}
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <main className="mx-auto px-4 sm:px-6 py-12 md:py-20 dark:bg-gray-950 bg-white transition-colors duration-300">
                {/* Introduction */}
                <motion.section
                    className="max-w-4xl mx-auto text-center mb-16 md:mb-24"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.span
                        className="inline-block px-3 py-1 sm:px-4 sm:py-2 mb-4 sm:mb-6 text-xs sm:text-sm font-medium text-primary bg-primary/10 rounded-full dark:bg-primary/20"
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        {t("header.nutrition_page.food_security_label")}
                    </motion.span>
                    <motion.h2
                        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8 dark:text-white"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        {t("header.nutrition_page.food_security_title")}
                    </motion.h2>
                    <motion.p
                        className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6 md:mb-8 leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        {t("header.nutrition_page.food_security_description")}
                    </motion.p>
                    <motion.div
                        className="w-24 sm:w-32 h-1 bg-primary mx-auto rounded-full"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    ></motion.div>
                </motion.section>

                {/* Studies Section */}
                <section className="mb-20 md:mb-28">
                    <motion.h2
                        className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 md:mb-20"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="relative inline-block pb-2 dark:text-white">
                            {t("header.nutrition_page.our_studies")}
                            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/4 h-1 bg-primary rounded-full"></span>
                        </span>
                    </motion.h2>

                    <div className="space-y-12 md:space-y-20">
                        {/* Women Migrants Study */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                        >
                            <StudyCard
                                title={t("header.nutrition_page.women_migrants.title")}
                                content={t("header.nutrition_page.women_migrants.content")}
                                actionText={t("header.nutrition_page.women_migrants.analyze_data")}
                                imageUrl={WomenMigrantsImage}
                                link="/projects"
                                imageAlt="Migrant women health overview"
                                stats={[
                                    { value: "2008", label: t("header.nutrition_page.women_migrants.stats.year_established") },
                                    { value: "21.87%", label: t("header.nutrition_page.women_migrants.stats.health_expenditures") }
                                ]}
                            />
                        </motion.div>

                        {/* Foreign Students Study */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: 0.1, duration: 0.8 }}
                        >
                            <StudyCard
                                title={t("header.nutrition_page.foreign_students.title")}
                                content={t("header.nutrition_page.foreign_students.content")}
                                supportText={t("header.nutrition_page.foreign_students.support")}
                                imageUrl={ForeignStudentsImage}
                                link="/projects"
                                imageAlt="Foreign students dietary acculturation"
                                reverseLayout
                                stats={[
                                    { value: "3000", label: t("header.nutrition_page.foreign_students.stats.data_points") },
                                    { value: "2.85%", label: t("header.nutrition_page.foreign_students.stats.cases_reported") },
                                    { value: "21%", label: t("header.nutrition_page.foreign_students.stats.mental_health") }
                                ]}
                            />
                        </motion.div>

                        {/* Dental Health Study */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        >
                            <StudyCard
                                title={t("header.nutrition_page.dental_health.title")}
                                content={t("header.nutrition_page.dental_health.content")}
                                imageUrl={DentalHealthImage}
                                link="https://www.ijcmph.com/index.php/ijcmph/article/view/1457"
                                imageAlt="Dental health in Korean children"
                                stats={[
                                    { value: "1559", label: t("header.nutrition_page.dental_health.stats.boys") },
                                    { value: "1391", label: t("header.nutrition_page.dental_health.stats.girls") },
                                    { value: "2012-2013", label: t("header.nutrition_page.dental_health.stats.study_years") }
                                ]}
                            />
                        </motion.div>
                    </div>
                </section>

                {/* Stats Section */}
                <motion.section
                    className="mb-16 md:mb-28 bg-gray-100 dark:bg-gray-800/50 rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 backdrop-blur-sm"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="max-w-6xl mx-auto">
                        <motion.h3
                            className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center dark:text-white"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        >
                            {t("header.nutrition_page.impact_title")}
                        </motion.h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                            {[
                                { value: "1 in 11", label: t("header.nutrition_page.impact.global_hunger") },
                                { value: "1 in 5", label: t("header.nutrition_page.impact.africa_hunger") },
                                { value: "3000+", label: t("header.nutrition_page.impact.data_collected") }
                            ].map((stat, index) => (
                                <motion.div
                                    key={index}
                                    className="text-center p-4 sm:p-6 bg-white dark:bg-gray-700/80 rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                                >
                                    <div className="text-4xl sm:text-5xl font-bold text-primary mb-2 sm:mb-4">{stat.value}</div>
                                    <div className="text-base sm:text-lg text-gray-600 dark:text-gray-300">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* Call to Action */}
                <motion.section
                    className="bg-gradient-to-r from-primary to-primary-600 rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 text-center text-white shadow-xl overflow-hidden"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="max-w-3xl mx-auto relative z-10">
                        <motion.h3
                            className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        >
                            {t("header.nutrition_page.cta_title")}
                        </motion.h3>
                        <motion.p
                            className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        >
                            {t("header.nutrition_page.cta_content")}
                        </motion.p>
                        <motion.div
                            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            <Button
                                size="lg"
                                onClick={() => window.location.href = '/à-propos-de-nous'}
                                className="px-6 py-4 sm:px-8 sm:py-6 text-base sm:text-lg bg-white text-primary hover:bg-gray-100 dark:hover:bg-gray-200 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                {t("header.nutrition_page.cta_primary")}
                            </Button>
                            <Button
                                size="lg"
                                onClick={() => window.location.href = '/data-center'}
                                className="px-6 py-4 sm:px-8 sm:py-6 sm:text-lg border-2 border-white dark:text-white hover:bg-white/10 hover:text-white transition-all duration-300"
                            >
                                {t("header.nutrition_page.cta_secondary")}
                            </Button>
                        </motion.div>
                    </div>
                    <div className="absolute inset-0 z-0 opacity-10">
                        <div className="absolute top-0 right-0 w-32 sm:w-64 h-32 sm:h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-32 sm:w-64 h-32 sm:h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
                    </div>
                </motion.section>
            </main>

            <Footer />
        </div>
    );
};