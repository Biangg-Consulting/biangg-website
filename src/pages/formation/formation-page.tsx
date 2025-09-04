import { useTheme } from '@/contexts/ThemeContext';

import FormationImage from "@/assets/training/formation.avif";
import HerbertImage from "@/assets/training/herbert pic 3.avif";
import BriceFormationImage from "@/assets/training/Brice at conference.avif";
import { Header } from '../home/components/header';
import { useTranslation } from 'react-i18next';
import { Footer } from '../home/components/footer';

export const FormationPage = () => {
    const { theme } = useTheme();
    const { t } = useTranslation();

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            {/* Hero Section */}
            <Header />
            <div className="relative py-20 pt-20 max-h-screen">
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src={FormationImage}
                        alt="Formation hero image"
                        className="object-cover opacity-30 w-full"
                    />
                </div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        <span className={theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}>
                            {t('formationPage.hero.titlePart')}
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                        {t('formationPage.hero.subtitle')}
                    </p>
                </div>
            </div>

            {/* In-Person & Webinar Training */}
            <section className={`py-16 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="lg:w-1/2">
                            <img
                                src={HerbertImage}
                                alt="Formation en présentiel ou webinaire / In-person or webinar training"
                                width={600}
                                height={400}
                                className={`rounded-lg shadow-xl ${theme === 'dark' ? 'ring-2 ring-blue-400' : 'ring-2 ring-blue-600'}`}
                            />
                        </div>
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl font-bold mb-6">
                                <span className={theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}>
                                    {t('formationPage.inPersonTraining.titlePart')}
                                </span>
                            </h2>
                            <div className="space-y-4">
                                <p className="text-lg">
                                    {t('formationPage.inPersonTraining.description')}
                                </p>
                            </div>
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'}`}>
                                    <h3 className="text-xl font-semibold mb-3">{t('formationPage.inPersonTraining.formats.title')}:</h3>
                                    <ul className="space-y-2">
                                        {(t('formationPage.inPersonTraining.formats.items', { returnObjects: true }) as string[]).map((item, index) => (
                                            <li key={index}>✓ {item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-green-50'}`}>
                                    <h3 className="text-xl font-semibold mb-3">{t('formationPage.inPersonTraining.languages.title')}:</h3>
                                    <ul className="space-y-2">
                                        {(t('formationPage.inPersonTraining.languages.items', { returnObjects: true }) as string[]).map((item, index) => (
                                            <li key={index}>✓ {item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Conferences Section */}
            <section className={`py-16 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
                        <div className="lg:w-1/2">
                            <img
                                src={BriceFormationImage}
                                alt="Conférences"
                                width={600}
                                height={400}
                                className={`rounded-lg shadow-xl ${theme === 'dark' ? 'ring-2 ring-green-400' : 'ring-2 ring-green-600'}`}
                            />
                        </div>
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl font-bold mb-6">
                                <span className={theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}>
                                    {t('formationPage.conferences.titlePart')}
                                </span>
                            </h2>
                            <div className="space-y-4">
                                <p className="text-lg">
                                    {t('formationPage.conferences.description')}
                                </p>
                            </div>
                            <div className="mt-8">
                                <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <h4 className="font-medium mb-2">{t('formationPage.conferences.topics.publicHealth.title')}:</h4>
                                            <ul className="space-y-1">
                                                {(t('formationPage.conferences.topics.publicHealth.items', { returnObjects: true }) as string[]).map((item, index) => (
                                                    <li key={index}>• {item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-2">{t('formationPage.conferences.topics.education.title')}:</h4>
                                            <ul className="space-y-1">
                                                {(t('formationPage.conferences.topics.education.items', { returnObjects: true }) as string[]).map((item, index) => (
                                                    <li key={index}>• {item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={`py-16 ${theme === 'dark' ? 'bg-blue-900' : 'bg-blue-600'} text-white`}>
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        {t('formationPage.cta.title')}
                    </h2>
                    <p className="text-xl max-w-3xl mx-auto mb-8">
                        {t('formationPage.cta.subtitle')}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button
                            onClick={() => window.location.href = '/à-propos-de-nous'} className={`px-8 py-3 rounded-lg font-semibold ${theme === 'dark' ? 'bg-green-500 hover:bg-green-600' : 'bg-green-600 hover:bg-green-700'} transition-colors`}>
                            {t('formationPage.cta.buttons.contact')}
                        </button>
                        <button
                            onClick={() => window.location.href = '/à-propos-de-nous'} className={`px-8 py-3 rounded-lg font-semibold ${theme === 'dark' ? 'bg-white text-blue-900 hover:bg-gray-200' : 'bg-blue-700 hover:bg-blue-800'} transition-colors`}>
                            {t('formationPage.cta.buttons.programs')}
                        </button>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};