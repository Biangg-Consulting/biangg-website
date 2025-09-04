import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/auth/auth-context";

export const SignUpForm = () => {
  const { register: registerUser } = useAuth();
  const { t } = useTranslation();

  const signUpSchema = yup.object().shape({
    name: yup.string().required(t("auth.nameRequired")),
    email: yup
      .string()
      .email(t("auth.invalidEmail"))
      .required(t("auth.emailRequired")),
    password: yup
      .string()
      .min(6, t("auth.passwordMinLength"))
      .required(t("auth.passwordRequired")),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], t("auth.passwordsMustMatch"))
      .required(t("auth.confirmPasswordRequired")),
  });

  type FormValues = yup.InferType<typeof signUpSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(signUpSchema),
  });


  const onSubmit = async (data: FormValues) => {
    try {
      await registerUser(data);
    } catch (error) {
      toast.error(t("auth.loginFailed"));
    }
  };
 
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight dark:text-white">
            {t("auth.signUpTitle")}
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            {t("auth.signUpSubtitle")}
          </p>
        </div>

        <div className="space-y-4 dark:text-white">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name">{t("auth.nameLabel")}</Label>
            <Input
              id="name"
              type="text"
              placeholder={t("auth.namePlaceholder")}
              {...register("name")}
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">{t("auth.emailLabel")}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t("auth.emailPlaceholder")}
              {...register("email")}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password">{t("auth.passwordLabel")}</Label>
            <Input
              id="password"
              type="password"
              placeholder={t("auth.passwordPlaceholder")}
              {...register("password")}
              disabled={isSubmitting}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">
              {t("auth.confirmPasswordLabel")}
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder={t("auth.confirmPasswordPlaceholder")}
              {...register("confirmPassword")}
              disabled={isSubmitting}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? t("auth.creatingAccount") : t("auth.signUpButton")}
          </Button>
        </div>

        {/* Separator */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              {t("auth.orContinueWith")}
            </span>
          </div>
        </div>

        {/* Sign In Link */}
        <p className="text-center text-sm text-muted-foreground">
          {t("auth.alreadyHaveAccount")}{" "}
          <Link
            to="/sign-in"
            className="font-medium text-primary hover:underline"
          >
            {t("auth.signInLink")}
          </Link>
        </p>
      </form>
    </motion.div>
  );
};