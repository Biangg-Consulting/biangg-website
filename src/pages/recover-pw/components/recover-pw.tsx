import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { api } from "@/services/api/api";
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = yup.object().shape({
  newPassword: yup.string().min(8, "Senha deve ter no mínimo 8 caracteres").required("Senha é obrigatória"),
  confirmPassword: yup.string()
    .oneOf([yup.ref('newPassword')], "Senhas devem ser iguais")
    .required("Confirmação de senha é obrigatória"),
});

export const ResetPasswordPage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: { newPassword: string }) => {
    try {
      await api.post('/auth/reset-password', {
        token,
        newPassword: data.newPassword
      });
      toast.success(t("auth.passwordResetSuccess"));
    } catch (error) {
      toast.error(t("auth.passwordResetFailed"));
    }
  };

  if (!token) {
    return <div className="max-w-md mx-auto p-6">
      <p className="text-red-500">{t("auth.invalidResetLink")}</p>
      <Link to="/forgot-password" className="text-primary hover:underline">
        {t("auth.requestNewLink")}
      </Link>
    </div>;
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{t("auth.resetPasswordTitle")}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="newPassword">{t("auth.newPassword")}</Label>
          <Input
            id="newPassword"
            type="password"
            {...register("newPassword")}
            disabled={isSubmitting}
          />
          {errors.newPassword && <p className="text-red-500">{errors.newPassword.message}</p>}
        </div>
        <div>
          <Label htmlFor="confirmPassword">{t("auth.confirmPassword")}</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            disabled={isSubmitting}
          />
          {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? t("auth.updating") : t("auth.resetPassword")}
        </Button>
      </form>
    </div>
  );
};