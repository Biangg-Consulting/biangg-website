import { useTheme } from '@/contexts/ThemeContext';


import ProcessImage from "@/assets/how-we-work/sa.avif";
import CollaborationImage from "@/assets/how-we-work/a.avif";

import { Header } from '../home/components/header';
import { useTranslation } from 'react-i18next';
import { Footer } from '../home/components/footer';

export const HowWeWorkPage = () => {
    const { theme } = useTheme();
    const { t } = useTranslation();

    const processSteps = t('howWeWorkPage.process.steps', { returnObjects: true }) as Array<{
        title: string;
        description: string;
    }>;

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            {/* Hero Section */}
            <Header />
            <div className="relative py-20 pt-36 max-h-screen">
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        <span className={theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}>
                            {t('howWeWorkPage.hero.title')}
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                        {t('howWeWorkPage.hero.subtitle')}
                    </p>
                </div>
            </div>

            {/* Intro Section */}
            <section className={`py-16 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="lg:w-1/2">
                            <img
                                src={ProcessImage}
                                alt="Collaborative approach"
                                width={600}
                                height={400}
                                className={`rounded-lg shadow-xl ${theme === 'dark' ? 'ring-2 ring-blue-400' : 'ring-2 ring-blue-600'}`}
                            />
                        </div>
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl font-bold mb-6">
                                <span className={theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}>
                                    {t('howWeWorkPage.intro.title')}
                                </span>
                            </h2>
                            <p className="text-lg">
                                {t('howWeWorkPage.intro.content')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className={`py-16 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-12 text-center">
                        <span className={theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}>
                            {t('howWeWorkPage.process.title')}
                        </span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {processSteps.map((step, index) => (
                            <div
                                key={index}
                                className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
                            >
                                <div className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-green-300' : 'text-green-600'}`}>
                                    0{index + 1}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                <p className="text-lg">{step.description}</p>
                            </div>
                        ))}
                    </div>
                    <div className="max-w-3xl mx-auto">
                        <img
                            src={CollaborationImage}
                            alt="Our work process"
                            className={`rounded-lg shadow-xl w-full ${theme === 'dark' ? 'ring-2 ring-green-400' : 'ring-2 ring-green-600'}`}
                        />
                    </div>
                    <div className="max-w-4xl mx-auto mt-12">
                        <p className="text-lg text-center">
                            {t('howWeWorkPage.process.conclusion')}
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={`py-16 ${theme === 'dark' ? 'bg-blue-900' : 'bg-blue-600'} text-white`}>
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        {t('howWeWorkPage.cta.title')}
                    </h2>
                    <p className="text-xl max-w-3xl mx-auto mb-8">
                        {t('howWeWorkPage.cta.subtitle')}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button
                            onClick={() => window.location.href = '/à-propos-de-nous'} className={`px-8 py-3 rounded-lg font-semibold ${theme === 'dark' ? 'bg-green-500 hover:bg-green-600' : 'bg-green-600 hover:bg-green-700'} transition-colors`}>
                            {t('howWeWorkPage.cta.buttons.contact')}
                        </button>
                        <button
                            onClick={() => window.location.href = '/à-propos-de-nous'} className={`px-8 py-3 rounded-lg font-semibold ${theme === 'dark' ? 'bg-white text-blue-900 hover:bg-gray-200' : 'bg-blue-700 hover:bg-blue-800'} transition-colors`}>
                            {t('howWeWorkPage.cta.buttons.learnMore')}
                        </button>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};