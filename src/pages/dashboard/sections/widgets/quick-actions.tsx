import { Role, UserRole } from "@/@types/role";

type QuickActionsProps = {
  userRole: UserRole;
};

export const QuickActions = ({ userRole }: QuickActionsProps) => {
  const actions = [
    { 
      label: 'Upload Document', 
      icon: '📤', 
      roles: [Role.SUPER_ADMIN, Role.ADMIN, Role.MANAGER, Role.USER], 
      path: '/documents/upload' 
    },
    { 
      label: 'Add Product', 
      icon: '➕', 
      roles: [Role.SUPER_ADMIN, Role.ADMIN, Role.MANAGER], 
      path: '/products/new' 
    },
    { 
      label: 'View Orders', 
      icon: '📦', 
      roles: [Role.SUPER_ADMIN, Role.ADMIN, Role.MANAGER], 
      path: '/orders' 
    },
    { 
      label: 'Manage Users', 
      icon: '👥', 
      roles: [Role.SUPER_ADMIN, Role.ADMIN], 
      path: '/users' 
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions
          .filter(action => action.roles.includes(userRole))
          .map((action, index) => (
            <button
              key={index}
              className="flex flex-col items-center justify-center p-3 border rounded-lg hover:bg-gray-50"
            >
              <span className="text-2xl mb-1">{action.icon}</span>
              <span className="text-sm">{action.label}</span>
            </button>
          ))}
      </div>
    </div>
  );
};