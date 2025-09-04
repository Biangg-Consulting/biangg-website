import { useTheme } from '@/contexts/ThemeContext';

import { Header } from '../home/components/header';
import { useTranslation } from 'react-i18next';
import { Footer } from '../home/components/footer';

export const ResearchPage = () => {
    const { theme } = useTheme();
    const { t } = useTranslation();

    const steps = t('researchPage.steps', { returnObjects: true }) as Array<{
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
                            {t('researchPage.hero.title')}
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                        {t('researchPage.hero.subtitle')}
                    </p>
                </div>
            </div>

            {/* Study Design Section */}
            <section className={`py-16 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl font-bold mb-6">
                                <span className={theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}>
                                    {steps[0].title}
                                </span>
                            </h2>
                            <div className="space-y-4">
                                <p className="text-lg">
                                    {steps[0].description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Research Steps Section */}
            <section className={`py-16 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {steps.slice(1).map((step, index) => (
                            <div
                                key={index}
                                className={`p-8 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
                            >
                                <div className="flex items-center mb-4">
                                    <div className={`mr-4 text-2xl font-bold ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`}>
                                        {index + 2}
                                    </div>
                                    <h3 className="text-xl font-bold">{step.title}</h3>
                                </div>
                                <p className="text-lg">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Data Analysis Section */}
            <section className={`py-16 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl font-bold mb-6">
                                <span className={theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}>
                                    {steps[2].title}
                                </span>
                            </h2>
                            <div className="space-y-4">
                                <p className="text-lg">
                                    {steps[2].description}
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
                        {t('researchPage.cta.title')}
                    </h2>
                    <p className="text-xl max-w-3xl mx-auto mb-8">
                        {t('researchPage.cta.subtitle')}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button
                            onClick={() => window.location.href = '/à-propos-de-nous'} className={`px-8 py-3 rounded-lg font-semibold ${theme === 'dark' ? 'bg-green-500 hover:bg-green-600' : 'bg-green-600 hover:bg-green-700'} transition-colors`}>
                            {t('researchPage.cta.buttons.contact')}
                        </button>
                        <button
                            onClick={() => window.location.href = '/à-propos-de-nous'} className={`px-8 py-3 rounded-lg font-semibold ${theme === 'dark' ? 'bg-white text-blue-900 hover:bg-gray-200' : 'bg-blue-700 hover:bg-blue-800'} transition-colors`}>
                            {t('researchPage.cta.buttons.consultation')}
                        </button>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};