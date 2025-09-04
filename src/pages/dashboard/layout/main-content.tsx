
import { useDashboard } from "../contexts/dashboard/dashboard-context";
import { UserManagement } from "../sections/auth/user-management";
import { DocumentBrowser } from "../sections/documents/document-browser";
import { OverviewSection } from "../sections/overview-section";
import { HelpSupport } from "../sections/support/help-support";

export const MainContent = () => {
  const { activeSection } = useDashboard();

  return (
    <main className="flex-1 overflow-auto p-4 md:p-6 dark:bg-gray-900 bg-gray-50 transition-colors duration-200">
      {activeSection === 'overview' && <OverviewSection />}
      {activeSection === 'documents' && <DocumentBrowser />}
      {activeSection === 'users' && <UserManagement />}
      {activeSection === 'support' && <HelpSupport />}
    </main>
  );
};
