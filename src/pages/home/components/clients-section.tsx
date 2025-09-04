// Create a new ClientsSection component
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export const ClientsSection = () => {
  const { t } = useTranslation();
  
  const clientTypes = [
    {
      name: "corporations",
      description: t("clients.corporations.description"),
      icon: "🏢"
    },
    {
      name: "government",
      description: t("clients.government.description"),
      icon: "🏛️"
    },
    {
      name: "nonprofits",
      description: t("clients.nonprofits.description"),
      icon: "🤝"
    },
    {
      name: "academia",
      description: t("clients.academia.description"),
      icon: "🎓"
    }
  ];

  return (
    <section id="clients" className="py-16 bg-gray-50 dark:bg-gray-800 dark:text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            {t("clients.badge")}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("clients.title")}
          </h2>
          <p className="text-lg">
            {t("clients.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {clientTypes.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{client.icon}</div>
              <h3 className="text-xl font-semibold mb-2">
                {t(`clients.${client.name}.title`)}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {client.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary-300/10 dark:to-primary-300/5 p-8 rounded-2xl">
          <p className="text-center text-lg font-medium max-w-3xl mx-auto">
            {t("clients.conclusion")}
          </p>
        </div>
      </div>
    </section>
  );
};