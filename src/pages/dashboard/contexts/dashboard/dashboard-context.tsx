import { User } from '@/models/user.model';
import { createContext, useContext, useState } from 'react';

type DashboardContextType = {
    activeSection: string;
    setActiveSection: (section: string) => void;
    user?: User;
};

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider = ({
    children,
    user
}: {
    children: React.ReactNode;
    user: User;
}) => {
    const [activeSection, setActiveSection] = useState('overview');

    return (
        <DashboardContext.Provider value={{ activeSection, setActiveSection, user }}>
            {children}
        </DashboardContext.Provider>
    );
};

export const useDashboard = () => {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error('useDashboard must be used within a DashboardProvider');
    }
    return context;
};