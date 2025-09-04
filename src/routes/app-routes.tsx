import { Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/home/home";
import { SignInPage } from "../pages/sign-in/sign-in";
import { NotFoundPage } from "../pages/not-found";
import { SignUpPage } from "@/pages/sign-up/sign-up";
import { TermsOfServicePage } from "@/pages/terms-service/terms-service";
import { PrivacyPolicyPage } from "@/pages/privacy-policy/privacy-policy";
import { AboutPage } from "@/pages/about/about";
import { ProjectPage } from "@/pages/projects/project";
import { ResearchDataCenter } from "@/pages/data-center/data-center";
import { SantePage } from "@/pages/solutions/sante-page";
import { NutritionPage } from "@/pages/solutions/nutrition-page";
import { PublicPage } from "@/pages/solutions/public-page";
import { EducationPage } from "@/pages/solutions/studies-page";
import { FormationPage } from "@/pages/formation/formation-page";
import { ResearchPage } from "@/pages/reasearch/research-page";
import { WeightLossPage } from "@/pages/lostpage/lost-weight-page";
import { HowWeWorkPage } from "@/pages/how-we-work/how-we-work-page";
import { ProtectedAdminRoute } from "./protected-route";
import { DashboardPage } from "@/pages/dashboard/dashboard";
import PublicRoute from "./public-route";
import { ForgetPWPage } from "@/pages/forget-pw/forget-pw";
import { RecoverPage } from "@/pages/recover-pw/recover-pw";
 
const AppRoutes = () => (
  <Routes>
    <Route element={<PublicRoute />}>
      <Route path="/forgot-password" element={<ForgetPWPage />} />
      <Route path="/reset-password" element={<RecoverPage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
    </Route>

    <Route path="/" element={<HomePage />} />
    <Route path="/data-center" element={<ResearchDataCenter />} />
    <Route path="/projects" element={<ProjectPage />} />
    <Route path="/health" element={<SantePage />} />
    <Route path="/nutritions" element={<NutritionPage />} />
    <Route path="/public-sector" element={<PublicPage />} />
    <Route path="/education" element={<EducationPage />} />
    <Route path="/training" element={<FormationPage />} />
    <Route path="/weight-loss" element={<WeightLossPage />} />
    <Route path="/research" element={<ResearchPage />} />
    <Route path="/how-we-work" element={<HowWeWorkPage />} />
    <Route path="/à-propos-de-nous" element={<AboutPage />} />
    <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
    <Route path="/terms-of-service" element={<TermsOfServicePage />} />

    <Route element={<ProtectedAdminRoute />}>
      <Route path="/dashboard" element={<DashboardPage />} />
      {/* Adicione outras rotas de admin aqui */}
    </Route>

    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRoutes;
