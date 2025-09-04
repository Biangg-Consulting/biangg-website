import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";

export const FAQsSection = () => {
  const { t } = useTranslation();

  const faqs = [
    {
      question: t("faqs.research_participation.question"),
      answer: t("faqs.research_participation.answer"),
    },
    {
      question: t("faqs.study_confidentiality.question"),
      answer: t("faqs.study_confidentiality.answer"),
    },
    {
      question: t("faqs.research_funding.question"),
      answer: t("faqs.research_funding.answer"),
    },
    {
      question: t("faqs.service_consultation.question"),
      answer: t("faqs.service_consultation.answer"),
    },
    {
      question: t("faqs.country_not_listed.question"),
      answer: t("faqs.country_not_listed.answer"),
    },
    {
      question: t("faqs.data_usage.question"),
      answer: t("faqs.data_usage.answer"),
    },
    {
      question: t("faqs.training_programs.question"),
      answer: t("faqs.training_programs.answer"),
    },
    {
      question: t("faqs.research_duration.question"),
      answer: t("faqs.research_duration.answer"),
    },
  ];

  return (
    <section id="faqs" className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6 max-w-4xl">
        <h3 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">
          {t("faqs.title")}
        </h3>
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`faq-${index}`}
              className="border border-gray-200 dark:border-gray-700 rounded-lg px-6 bg-white dark:bg-gray-900"
            >
              <AccordionTrigger className="text-left py-6 hover:no-underline font-medium text-gray-900 dark:text-white">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-gray-600 dark:text-gray-300">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};