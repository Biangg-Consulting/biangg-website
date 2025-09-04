import { useTheme } from '@/contexts/ThemeContext';

import WeightLossHeroImage from "@/assets/weigth/food.avif";
import DoctorImage from "@/assets/weigth/Child at the Doctor's Office.avif";
import CalorieImage from "@/assets/weigth/Calorie Count.avif";
import WaterImage from "@/assets/weigth/Girl Drinking Water.avif";
import s1103Image from "@/assets/weigth/11062b_af183077841247b49ed02cbaf34fcc5b~mv2.avif";
import greenImage from "@/assets/weigth/Green Vegetables.avif";
import nutritionImage from "@/assets/weigth/nutrition-facts-label-download-image3.avif";

import { Header } from '../home/components/header';
import { useTranslation } from 'react-i18next';
import { Footer } from '../home/components/footer';

export const WeightLossPage = () => {
    const { theme } = useTheme();
    const { t } = useTranslation();

    const images = [
        DoctorImage,
        greenImage,
        nutritionImage,
        CalorieImage,
        WaterImage,
    ]
    const modules = t('weightLossPage.modules.list', { returnObjects: true }) as Array<{
        title: string;
        lessons: string[];
    }>;

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            {/* Hero Section */}
            <Header />
            <div className="relative py-20 pt-36 max-h-screen">
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src={WeightLossHeroImage}
                        alt="Weight loss program hero image"
                        className="object-cover opacity-30 w-full h-full"
                    />
                </div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        <span className={theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}>
                            {t('weightLossPage.hero.title')}
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                        {t('weightLossPage.hero.subtitle')}
                    </p>
                </div>
            </div>

            {/* Program Overview Section */}
            <section className={`py-16 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-6 text-center">
                            <span className={theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}>
                                {t('weightLossPage.programOverview.title')}
                            </span>
                        </h2>
                        <div className="space-y-6">
                            <p className="text-lg">
                                {t('weightLossPage.programOverview.description')}
                            </p>
                            <p className="text-lg">
                                {t('weightLossPage.programOverview.tools')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modules Section */}
            <section className={`py-16 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-12 text-center">
                        <span className={theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}>
                            {t('weightLossPage.modules.title')}
                        </span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {modules.map((module, index) => (
                            <div
                                key={index}
                                className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
                            >
                                <h3 className="text-xl font-bold mb-4">
                                    <div className="relative inset-0 overflow-hidden">
                                        <img
                                            src={images[index]}
                                            alt="Formation hero image"
                                            className="object-cover w-full"
                                        />
                                    </div>
                                    <span className={theme === 'dark' ? 'text-green-300' : 'text-green-600'}>
                                        {module.title}
                                    </span>
                                </h3>
                                <ul className="space-y-2">

                                    {module.lessons.map((lesson, lessonIndex) => (
                                        <li key={lessonIndex} className="flex items-start">
                                            <span className="mr-2">•</span>
                                            <span>{lesson}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sample Lesson Section */}
            <section className={`py-16 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="lg:w-1/2">
                            <img
                                src={s1103Image}
                                alt="Sample lesson"
                                width={600}
                                height={400}
                                className={`rounded-lg shadow-xl ${theme === 'dark' ? 'ring-2 ring-blue-400' : 'ring-2 ring-blue-600'}`}
                            />
                        </div>
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl font-bold mb-6">
                                <span className={theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}>
                                    {t('weightLossPage.sampleLesson.title')}
                                </span>
                            </h2>
                            <div className="space-y-4">
                                <p className="text-xl">
                                    {t('weightLossPage.sampleLesson.description')}
                                </p>
                                <div className="aspect-w-16 aspect-h-9">
                                    {/* Video placeholder - replace with your actual video component */}
                                    <div className={`w-full h-64 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center`}>
                                        <span className="text-lg">Video Player Component</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial Section */}
            <section className={`py-16 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
                        <div className="lg:w-1/2">
                            {/* Video placeholder - replace with your actual video component */}
                            <div className={`w-full h-64 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center`}>
                                <span className="text-lg">Testimonial Video Component</span>
                            </div>
                        </div>
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl font-bold mb-6">
                                <span className={theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}>
                                    {t('weightLossPage.testimonial.title')}
                                </span>
                            </h2>
                            <div className="space-y-4">
                                <p className="text-xl">
                                    {t('weightLossPage.testimonial.description')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={`py-16 ${theme === 'dark' ? 'bg-blue-900' : 'bg-blue-600'} text-white`}>
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        {t('weightLossPage.cta.title')}
                    </h2>
                    <p className="text-xl max-w-3xl mx-auto mb-8">
                        {t('weightLossPage.cta.subtitle')}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button
                            onClick={() => window.location.href = '/sign-up'} className={`px-8 py-3 rounded-lg font-semibold ${theme === 'dark' ? 'bg-green-500 hover:bg-green-600' : 'bg-green-600 hover:bg-green-700'} transition-colors`}>
                            {t('weightLossPage.cta.buttons.register')}
                        </button>
                        <button
                            onClick={() => window.location.href = '/à-propos-de-nous'} className={`px-8 py-3 rounded-lg font-semibold ${theme === 'dark' ? 'bg-white text-blue-900 hover:bg-gray-200' : 'bg-blue-700 hover:bg-blue-800'} transition-colors`}>
                            {t('weightLossPage.cta.buttons.learnMore')}
                        </button>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};