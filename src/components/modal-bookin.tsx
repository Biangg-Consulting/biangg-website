import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "@/services/api/api";

export const BookingModal = ({ isOpen, onClose }: any) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    preferredDate: "",
    phone: "",
    message: ""
  });

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!formData.name || !formData.email || !formData.preferredDate) {
        toast.error(t("booking.errors.requiredFields"));
        setIsLoading(false);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast.error(t("booking.errors.invalidEmail"));
        setIsLoading(false);
        return;
      }

      const selectedDate = new Date(formData.preferredDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        toast.error(t("booking.errors.pastDate"));
        setIsLoading(false);
        return;
      }

      const bookingData = {
        name: formData.name,
        email: formData.email,
        preferredDate: new Date(formData.preferredDate).toISOString(),
        phone: formData.phone || undefined,
        message: formData.message || undefined
      };

      const response = await api.post('/bookings', bookingData);

      if (response.data.success) {
        toast.success(t("booking.success"));
        setFormData({
          name: "",
          email: "",
          preferredDate: "",
          phone: "",
          message: ""
        });
        onClose();
      } else {
        toast.error(response.data.message || t("booking.errors.general"));
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error(t("booking.errors.network"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      email: "",
      preferredDate: "",
      phone: "",
      message: ""
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`rounded-lg p-6 max-w-md w-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">{t("booking.title")}</h3>
          <button 
            onClick={handleClose}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Close modal"
            disabled={isLoading}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">{t("booking.form.name")} *</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" 
              required
              disabled={isLoading}
            />
          </div>
          
          <div>
            <label className="block mb-1">{t("booking.form.email")} *</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" 
              required
              disabled={isLoading}
            />
          </div>
          
          <div>
            <label className="block mb-1">{t("booking.form.phone")}</label>
            <input 
              type="tel" 
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" 
              disabled={isLoading}
            />
          </div>
          
          <div>
            <label className="block mb-1">{t("booking.form.date")} *</label>
            <input 
              type="date" 
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleInputChange}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" 
              required
              min={new Date().toISOString().split('T')[0]}
              disabled={isLoading}
            />
          </div>
          
          <div>
            <label className="block mb-1">{t("booking.form.message")}</label>
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={3}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" 
              disabled={isLoading}
            />
          </div>
          
          <div className="pt-2 flex justify-end space-x-3">
            <Button
              variant="outline" 
              type="button" 
              onClick={handleClose}
              disabled={isLoading}
            >
              {t("booking.form.cancel")}
            </Button>
            <Button 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? t("booking.form.loading") : t("booking.form.confirm")}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};