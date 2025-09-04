import { Header } from "../home/components/header";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

import BriceImg from "@/assets/team/headshot_Brice.png";
import HerbertImg from "@/assets/team/pic-herbert.png";
import RaissaImg from "@/assets/team/raissa.png";
import SaraImg from "@/assets/team/sara-2.png";
import ShekinaImg from "@/assets/team/shek2.png";

import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "@/services/api/api";


const contactService = {
  async sendContactForm(data: ContactFormData): Promise<{ success: boolean; message?: string }> {
    try {

      const response = await api.post('/contacts', data);
      if (!response.data.success) {
        throw new Error('Fail to send contact form');
      }

      return { success: true, message: 'Message sent successfully!' };
    } catch (error) {
      console.error('Error sending form:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error sending message'
      };
    }
  }
};

export const AboutPage = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const openContactModal = () => {
    setIsContactModalOpen(true);
    setSubmitSuccess(false);
  };

  const closeContactModal = () => {
    setIsContactModalOpen(false);
    reset();
  };

  const onSubmitContactForm = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const result = await contactService.sendContactForm(data);
      if (result.success) {
        setSubmitSuccess(true);
        reset();
      } else {
        console.error('Fail to send:', result.message);
      }
    } catch (error) {
      console.error('Error sending:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const teamImages = [
    BriceImg,
    HerbertImg,
    RaissaImg,
    SaraImg,
    ShekinaImg,
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-950' : 'bg-background'} text-foreground font-sans pt-20`}>
      <div className="px-5 md:px-20 lg:px-40">
        <Header />

        {/* Hero Section */}
        <section className="py-12 md:py-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`text-4xl md:text-5xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
          >
            {t("aboutPage.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-lg md:text-xl max-w-4xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-8`}
          >
            {t("aboutPage.intro")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} max-w-4xl`}
          >
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
              {t("aboutPage.services.description")}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {(Array.isArray(t("aboutPage.services.items", { returnObjects: true }))
                ? (t("aboutPage.services.items", { returnObjects: true }) as string[])
                : []
              ).map((item: string, index: number) => (
                <Badge
                  key={index}
                  variant={theme === 'dark' ? 'secondary' : 'default'}
                  className="text-sm"
                >
                  {item}
                </Badge>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Vision, Mission, Values */}
        <section className="py-12 grid md:grid-cols-3 gap-8">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-900' : 'bg-white shadow-sm'}`}
          >
            <h3 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-primary-300' : 'text-primary-600'}`}>
              {t("aboutPage.vision.title")}
            </h3>
            <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
              {t("aboutPage.vision.content")}
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-900' : 'bg-white shadow-sm'}`}
          >
            <h3 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-primary-300' : 'text-primary-600'}`}>
              {t("aboutPage.mission.title")}
            </h3>
            <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
              {t("aboutPage.mission.content")}
            </p>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-900' : 'bg-white shadow-sm'}`}
          >
            <h3 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-primary-300' : 'text-primary-600'}`}>
              {t("aboutPage.values.title")}
            </h3>
            <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {t("aboutPage.values.description")}
            </p>
            <div className="flex flex-wrap gap-2">
              {(Array.isArray(t("aboutPage.values.items", { returnObjects: true }))
                ? (t("aboutPage.values.items", { returnObjects: true }) as string[])
                : []
              ).map((value: string, index: number) => (
                <Badge
                  key={index}
                  variant={theme === 'dark' ? 'outline' : 'secondary'}
                  className={`text-sm ${theme === 'dark' ? 'text-primary-300 border-primary-300' : ''}`}
                >
                  {value}
                </Badge>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Team Section */}
        <section className="py-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t("aboutPage.team.title")}
            </h2>
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {t("aboutPage.team.subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(Array.isArray(t("aboutPage.team.members", { returnObjects: true }))
              ? (t("aboutPage.team.members", { returnObjects: true }) as any[])
              : []
            ).map((member: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className={`h-full overflow-hidden ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white'}`}>
                  <CardHeader className="pb-0">
                    <Avatar className="w-24 h-24 mb-4 mx-auto">
                      <AvatarImage src={teamImages[index]} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <CardTitle className={`text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {member.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center pt-2">
                    <p className={`font-medium ${theme === 'dark' ? 'text-primary-300' : 'text-primary-600'}`}>
                      {member.position}
                    </p>
                    <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      <MapPin className="inline w-4 h-4 mr-1" />
                      {member.location}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Separator */}
        <Separator className={`my-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`} />

        {/* CTA Section */}
        <section className="py-12 text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`text-3xl md:text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
          >
            Prêt à transformer vos données en solutions?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button
              size="lg"
              className="px-8 py-6 text-lg"
              onClick={openContactModal}
            >
              Contactez-nous
            </Button>
          </motion.div>
        </section>

        {/* Modal de Contato */}
        <Dialog open={isContactModalOpen} onOpenChange={closeContactModal}>
          <DialogContent className={`sm:max-w-[600px] ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
            <DialogHeader>
              <DialogTitle className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {submitSuccess ? 'Message envoyé!' : 'Contactez notre équipe'}
              </DialogTitle>
              <DialogDescription className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {submitSuccess
                  ? 'Nous vous recontacterons dans les plus brefs délais.'
                  : 'Remplissez le formulaire ou utilisez nos autres moyens de contact.'}
              </DialogDescription>
            </DialogHeader>

            {!submitSuccess ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <form onSubmit={handleSubmit(onSubmitContactForm)} className="md:col-span-2 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Nom complet
                    </Label>
                    <Input
                      id="name"
                      {...register("name", { required: 'Ce champ est obligatoire' })}
                      className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}
                    />
                    {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email", {
                          required: 'Ce champ est obligatoire',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Email invalide'
                          }
                        })}
                        className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}
                      />
                      {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Téléphone
                      </Label>
                      <Input
                        id="phone"
                        {...register("phone")}
                        className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      {...register("message", { required: 'Ce champ est obligatoire' })}
                      className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}
                      rows={5}
                    />
                    {errors.message && <p className="text-sm text-red-500">{errors.message.message}</p>}
                  </div>

                  <div className="flex justify-end gap-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={closeContactModal}
                      disabled={isSubmitting}
                    >
                      Annuler
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                    </Button>
                  </div>
                </form>

                <div className={`md:col-span-2 p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <h3 className={`font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Autres moyens de contact
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Email</p>
                      <a
                        href="mailto:global@biangg.ca"
                        className={`${theme === 'dark' ? 'text-primary-300 hover:text-primary-200' : 'text-primary-600 hover:text-primary-800'}`}
                      >
                        global@biangg.ca
                      </a>
                    </div>
                    <div>
                      <p className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Téléphone</p>
                      <a
                        href="tel:+14387790598"
                        className={`${theme === 'dark' ? 'text-primary-300 hover:text-primary-200' : 'text-primary-600 hover:text-primary-800'}`}
                      >
                        +1 (438) 779‑0598
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <svg
                  className="w-16 h-16 text-green-500 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <h3 className={`text-xl font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Merci pour votre message!
                </h3>
                <p className={`text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Nous avons bien reçu votre demande et nous vous contacterons bientôt.
                </p>
                <Button
                  onClick={closeContactModal}
                  className="mt-6"
                >
                  Fermer
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};