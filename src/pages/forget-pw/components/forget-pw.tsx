import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { api } from "@/services/api/api";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Email required"),
});

export const ForgotPasswordPage = () => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: { email: string }) => {
    try {
      await api.post('/auth/request-reset', data);
      toast.success(t("auth.resetEmailSent"));
    } catch (error) {
      toast.error(t("auth.resetRequestFailed"));
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 dark:text-white">
      <h1 className="text-2xl font-bold mb-4 ">{t("auth.forgotPasswordTitle")}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="email">{t("auth.emailLabel")}</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            disabled={isSubmitting}
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? t("auth.sending") : t("auth.sendResetLink")}
        </Button>
      </form>
      <div className="mt-4">
        <Link to="/sign-in" className="text-primary hover:underline">
          {t("auth.backToSignIn")}
        </Link>
      </div>
    </div>
  );
};