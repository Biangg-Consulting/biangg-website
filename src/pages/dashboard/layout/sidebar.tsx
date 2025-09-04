import { Role, UserRole } from '@/@types/role';
import { useDashboard } from '../contexts/dashboard/dashboard-context';
import {
  Home,
  FileText,
  Users,
  HelpCircle,
  LogOut,
  X
} from 'lucide-react';
import { useAuth } from '@/contexts/auth/auth-context';
import { cn } from '@/lib/utils';

const menuItems = [
  {
    id: 'overview',
    label: 'Overview',
    icon: <Home className="h-5 w-5" />,
    roles: [Role.SUPER_ADMIN, Role.ADMIN, Role.MANAGER, Role.USER] as UserRole[]
  },
  {
    id: 'documents',
    label: 'Documents',
    icon: <FileText className="h-5 w-5" />,
    roles: [Role.SUPER_ADMIN, Role.ADMIN, Role.MANAGER, Role.USER] as UserRole[]
  },
  {
    id: 'users',
    label: 'User Management',
    icon: <Users className="h-5 w-5" />,
    roles: [Role.SUPER_ADMIN, Role.ADMIN] as UserRole[]
  }
];

export const Sidebar = () => {
  const { activeSection, setActiveSection, user } = useDashboard();
  const { logout } = useAuth();

  if (!user) return null;

  return (
    <div className="w-64 bg-white border-r border-gray-100 dark:bg-gray-800 dark:border-gray-700 h-full flex flex-col transition-colors duration-200 hidden lg:flex">
      <div className="p-5 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-3">
            <button onClick={() => window.location.href = '/'}>
              <span className="text-white font-bold text-sm">D</span>
            </button>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Biangg</h2>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems
            .filter(item => item.roles.includes(user.role as UserRole))
            .map(item => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={cn(
                    "flex items-center w-full p-3 rounded-lg text-left transition-colors",
                    activeSection === item.id
                      ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  )}
                >
                  <span className={cn(
                    "mr-3 transition-colors",
                    activeSection === item.id ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"
                  )}>
                    {item.icon}
                  </span>
                  {item.label}
                </button>
              </li>
            ))}
        </ul>

        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
          <button
            onClick={() => setActiveSection('support')} className="flex items-center w-full p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <HelpCircle className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
            Help & Support
          </button>
        </div>
      </nav>

      <div className="p-4 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-medium mr-3">
            {user.name?.charAt(0) || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="flex items-center w-full mt-2 p-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export const MobileSidebar = ({ onClose }: { onClose: () => void }) => {
  const { activeSection, setActiveSection, user } = useDashboard();
  const { logout } = useAuth();

  if (!user) return null;

  const handleItemClick = (id: string) => {
    setActiveSection(id);
    onClose();
  };

  return (
    <div className="h-full bg-white dark:bg-gray-800 flex flex-col transition-colors">
      <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-3">
            <span className="text-white font-bold text-sm">D</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Dashboard</h2>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems
            .filter(item => item.roles.includes(user.role as UserRole))
            .map(item => (
              <li key={item.id}>
                <button
                  onClick={() => handleItemClick(item.id)}
                  className={cn(
                    "flex items-center w-full p-3 rounded-lg text-left transition-colors",
                    activeSection === item.id
                      ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  )}
                >
                  <span className={cn(
                    "mr-3",
                    activeSection === item.id ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"
                  )}>
                    {item.icon}
                  </span>
                  {item.label}
                </button>
              </li>
            ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700 mb-2">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-medium mr-3">
            {user.name?.charAt(0) || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
          </div>
        </div>

        <button
          onClick={() => {
            logout();
            onClose();
          }}
          className="flex items-center w-full p-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};
