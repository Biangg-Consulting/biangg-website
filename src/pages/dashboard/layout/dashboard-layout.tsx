import { Header } from "./header";
import { MainContent } from "./main-content";
import { Sidebar } from "./sidebar";

export const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <MainContent />
      </div>
    </div>
  );
};