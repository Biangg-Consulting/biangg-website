import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/contexts/ThemeContext";
import { api } from "@/services/api/api";
import { toast } from "sonner";

// Interfaces de acordo com o backend
export interface StudySubscriptionForm {
  name: string;
  email: string;
  contact: string;
  address: string;
  titleStudy: string;
  message?: string;
}

export interface StudySubscriptionResponse {
  success: boolean;
  studySubscription?: any;
  message?: string;
}

type ModalProps = {
  open: boolean;
  onClose: () => void;
  studyTitle: string;
};

// Serviço para subscrição de estudos
const studySubscriptionService = {
  async subscribeToStudy(data: StudySubscriptionForm ): Promise<StudySubscriptionResponse> {
    try {
     
      console.log(data);
      
      const response = await api.post('/study-subscriptions', data);

      if (!response.data.success) {
        throw new Error(response.data.message || "Fail to send subscription");
      }

      const result = response.data.studySubscription;
      return { success: true, studySubscription: result };
    } catch (error) {
      console.error("Fail to send subscription:", error);
      return { 
        success: false, 
        message: error instanceof Error ? error.message : "Unknown error occurred during subscription" 
      };
    }
  }
};

export const StudyModal = ({ open, onClose, studyTitle }: ModalProps) => {
  const { theme } = useTheme();
  const [form, setForm] = useState<StudySubscriptionForm>({
    name: "",
    email: "",
    contact: "",
    address: "",
    message: "",
    titleStudy: studyTitle
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (submitError) setSubmitError(null);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    if (!form.name || !form.email || !form.contact || !form.address) {
      setSubmitError("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    const payload = { ...form, titleStudy: studyTitle };
    const result = await studySubscriptionService.subscribeToStudy(payload);

    if (result.success) {
      toast.success("Subscription successful! We will contact you soon.");
      onClose();
      setForm({
        name: "",
        email: "",
        contact: "",
        address: "",
        message: "",
        titleStudy: ""
      });
    } else {
      setSubmitError(result.message || "Error processing subscription");
    }
    
    setIsSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className={`max-w-lg ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {studyTitle}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input 
              id="name"
              name="name" 
              value={form.name}
              placeholder="Your full name" 
              onChange={handleChange}
              className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input 
              id="email"
              name="email" 
              type="email" 
              value={form.email}
              placeholder="Your email" 
              onChange={handleChange}
              className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact">Contact *</Label>
            <Input 
              id="contact"
              name="contact" 
              value={form.contact}
              placeholder="Your phone number" 
              onChange={handleChange}
              className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address *</Label>
            <Input 
              id="address"
              name="address" 
              value={form.address}
              placeholder="Your address" 
              onChange={handleChange}
              className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message (optional)</Label>
            <Textarea 
              id="message"
              name="message" 
              value={form.message || ""}
              placeholder="Why do you want to participate in this study?" 
              onChange={handleChange}
              className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}
              rows={4}
            />
          </div>
        </div>

        {submitError && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {submitError}
          </div>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <Button 
            variant="outline" 
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Subscribe"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};