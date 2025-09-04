import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { StudyCard } from "@/components/study-card";
import { Header } from "../home/components/header";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Import your images
import HealthHeroImage from "@/assets/health/sante.png";
import GabonHealthImage from "@/assets/health/Pregnant-Woman-and-Partner.png";
import HarassmentImage from "@/assets/health/Students.png";
import SocioeconomicImage from "@/assets/health/Analyzing-the-data.png";
import { Footer } from "../home/components/footer";

export const SantePage = () => {
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
        <div className="overflow-x-hidden">
            {/* Hero Section */}
            <section 
                ref={ref} 
                className="relative h-screen min-h-[600px] md:min-h-[800px] flex items-center overflow-hidden pt-20"
            >
                <Header />

                <motion.div
                    className="absolute inset-0 -z-10"
                    style={{ y: yBg, opacity: opacityBg, scale: scaleBg }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/70 to-white/30 dark:from-gray-950/95 dark:via-gray-950/85 dark:to-gray-950/60"></div>
                    <img
                        src={HealthHeroImage}
                        alt={t("hero.image_alt")}
                        className="w-full h-full object-cover object-center"
                        loading="eager"
                    />
                </motion.div>

                <div className="container relative h-full flex items-center z-20 px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="max-w-2xl mx-4 sm:mx-6 lg:mx-0"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.h1
                            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight dark:text-white drop-shadow-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        >
                            {t("header.health_page.title")}
                        </motion.h1>
                        <motion.p
                            className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 leading-relaxed text-gray-700 dark:text-gray-200"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        >
                            {t("header.health_page.intro")}
                        </motion.p>
                        <motion.div
                            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        > 
                            <Button
                                variant="outline"
                                size="lg"
                                className="px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg border-2 border-white text-white hover:bg-white/10 hover:text-white transition-all duration-300"
                            >
                                {t("header.contact_us")}
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 dark:bg-gray-950 bg-white transition-colors duration-300">
                {/* Collaboration Section */}
                <motion.section
                    className="max-w-4xl mx-auto text-center mb-16 md:mb-24 px-4 sm:px-0"
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
                        {t("header.health_page.collaboration_label")}
                    </motion.span>
                    <motion.h2
                        className="text-3xl sm:text-4xl font-bold mb-6 md:mb-8 dark:text-white"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        {t("header.health_page.intro")}
                    </motion.h2>
                    <motion.p
                        className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6 md:mb-8 leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        {t("header.health_page.collaboration")}
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
                <section className="mb-20 md:mb-28 px-4 sm:px-0">
                    <motion.h2
                        className="text-3xl sm:text-4xl font-bold text-center mb-12 md:mb-20"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="relative inline-block pb-2 dark:text-white">
                            {t("header.health_page.our_studies")}
                            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/4 h-1 bg-primary rounded-full"></span>
                        </span>
                    </motion.h2>

                    <div className="space-y-12 md:space-y-20">
                        {/* Gabon Health System Study */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                        >
                            <StudyCard
                                title={t("header.health_page.gabon_health_system.title")}
                                content={t("header.health_page.gabon_health_system.content")}
                                actionText={t("header.health_page.gabon_health_system.analyze_data")}
                                imageUrl={GabonHealthImage}
                                link="/projects"
                                project="https://www.gofundme.com/f/jzmwmr?attribution_id=sl:5c05c671-b8ce-4943-a83a-53af8cf02ec8&lang=en_US&utm_campaign=fp_sharesheet&utm_medium=customer&utm_source=copy_link"
                                imageAlt="Gabon healthcare system"
                                stats={[
                                    { value: "21.87%", label: t("header.health_page.gabon_health_system.stats.out_of_pocket") },
                                    { value: "2008", label: t("header.health_page.gabon_health_system.stats.year_established") }
                                ]}
                            />
                        </motion.div>

                        {/* Sexual Harassment Study */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: 0.1, duration: 0.8 }}
                        >
                            <StudyCard
                                title={t("header.health_page.sexual_harassment.title")}
                                content={t("header.health_page.sexual_harassment.content")}
                                actionText={t("header.health_page.sexual_harassment.students")}
                                supportText={t("header.health_page.sexual_harassment.support")}
                                imageUrl={HarassmentImage}
                                link="/projects"
                                project="https://www.gofundme.com/f/jzmwmr?attribution_id=sl:5c05c671-b8ce-4943-a83a-53af8cf02ec8&lang=en_US&utm_campaign=fp_sharesheet&utm_medium=customer&utm_source=copy_link"
                                imageAlt="Students in African school"
                                reverseLayout
                                stats={[
                                    { value: "2.85%", label: t("header.health_page.sexual_harassment.stats.reported") },
                                    { value: "18.11%", label: t("header.health_page.sexual_harassment.stats.policies") },
                                    { value: "21%", label: t("header.health_page.sexual_harassment.stats.depression") }
                                ]}
                            />
                        </motion.div>

                        {/* Socioeconomic Status Study */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        >
                            <StudyCard
                                title={t("header.health_page.socioeconomic_status.title")}
                                content={t("header.health_page.socioeconomic_status.content")}
                                supportText={t("header.health_page.socioeconomic_status.support")}
                                imageUrl={SocioeconomicImage}
                                link={"https://www.ijcmph.com/index.php/ijcmph/article/view/1457"}
                                imageAlt="Pregnant woman in clinical setting"
                                stats={[
                                    { value: "70%", label: t("header.health_page.socioeconomic_status.stats.depression") },
                                    { value: "8%", label: t("header.health_page.socioeconomic_status.stats.violence") },
                                    { value: "28%", label: t("header.health_page.socioeconomic_status.stats.smoking") }
                                ]}
                            />
                        </motion.div>
                    </div>
                </section>

                {/* Impact Section */}
                <motion.section
                    className="mb-16 md:mb-28 bg-gray-100 dark:bg-gray-800/50 rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 mx-4 sm:mx-0 backdrop-blur-sm"
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
                            {t("header.health_page.impact_title")}
                        </motion.h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                            {[
                                { value: "15+", label: t("header.health_page.impact.studies") },
                                { value: "10", label: t("header.health_page.impact.countries") },
                                { value: "500K+", label: t("header.health_page.impact.people") }
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
            </main>

            <Footer />
        </div>
    );
};