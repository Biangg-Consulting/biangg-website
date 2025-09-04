import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  variant?: "default" | "warning" | "success" | "danger";
  color?: "blue" | "purple" | "green" | "amber" | "indigo" | "rose" | "cyan";
  className?: string;
}

export const StatsCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  variant = "default",
  color = "blue",
  className 
}: StatsCardProps) => {
  // Mapeamento de cores para light e dark mode
  const colorStyles = {
    blue: {
      bg: "bg-blue-50 dark:bg-blue-900/20",
      border: "border-blue-100 dark:border-blue-800/30",
      iconBg: "bg-blue-100 dark:bg-blue-800/40",
      text: "text-blue-700 dark:text-blue-300"
    },
    purple: {
      bg: "bg-purple-50 dark:bg-purple-900/20",
      border: "border-purple-100 dark:border-purple-800/30",
      iconBg: "bg-purple-100 dark:bg-purple-800/40",
      text: "text-purple-700 dark:text-purple-300"
    },
    green: {
      bg: "bg-green-50 dark:bg-green-900/20",
      border: "border-green-100 dark:border-green-800/30",
      iconBg: "bg-green-100 dark:bg-green-800/40",
      text: "text-green-700 dark:text-green-300"
    },
    amber: {
      bg: "bg-amber-50 dark:bg-amber-900/20",
      border: "border-amber-100 dark:border-amber-800/30",
      iconBg: "bg-amber-100 dark:bg-amber-800/40",
      text: "text-amber-700 dark:text-amber-300"
    },
    indigo: {
      bg: "bg-indigo-50 dark:bg-indigo-900/20",
      border: "border-indigo-100 dark:border-indigo-800/30",
      iconBg: "bg-indigo-100 dark:bg-indigo-800/40",
      text: "text-indigo-700 dark:text-indigo-300"
    },
    rose: {
      bg: "bg-rose-50 dark:bg-rose-900/20",
      border: "border-rose-100 dark:border-rose-800/30",
      iconBg: "bg-rose-100 dark:bg-rose-800/40",
      text: "text-rose-700 dark:text-rose-300"
    },
    cyan: {
      bg: "bg-cyan-50 dark:bg-cyan-900/20",
      border: "border-cyan-100 dark:border-cyan-800/30",
      iconBg: "bg-cyan-100 dark:bg-cyan-800/40",
      text: "text-cyan-700 dark:text-cyan-300"
    }
  };

  const variantStyles = {
    default: "",
    warning: {
      bg: "bg-amber-50 dark:bg-amber-900/20",
      border: "border-amber-100 dark:border-amber-800/30",
      iconBg: "bg-amber-100 dark:bg-amber-800/40",
      text: "text-amber-700 dark:text-amber-300"
    },
    success: {
      bg: "bg-green-50 dark:bg-green-900/20",
      border: "border-green-100 dark:border-green-800/30",
      iconBg: "bg-green-100 dark:bg-green-800/40",
      text: "text-green-700 dark:text-green-300"
    },
    danger: {
      bg: "bg-red-50 dark:bg-red-900/20",
      border: "border-red-100 dark:border-red-800/30",
      iconBg: "bg-red-100 dark:bg-red-800/40",
      text: "text-red-700 dark:text-red-300"
    }
  };

  // Determinar qual conjunto de estilos usar
  const styles = variant !== "default" 
    ? variantStyles[variant] 
    : colorStyles[color];

  return (
    <Card className={cn(
      "border rounded-xl shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md",
      "dark:shadow-none dark:hover:shadow-lg dark:hover:shadow-gray-900/20",
      styles.bg,
      styles.border,
      className
    )}>
      <CardContent className="p-4 sm:p-5">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
              {title}
            </p>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-1 truncate">
              {value}
            </h3>
          </div>
          <div className={cn(
            "p-2 rounded-lg flex-shrink-0 ml-3",
            styles.iconBg,
            styles.text
          )}>
            {icon}
          </div>
        </div>
        
        {trend && (
          <div className={cn(
            "flex items-center mt-3 text-sm font-medium",
            trend.isPositive 
              ? "text-green-600 dark:text-green-400" 
              : "text-red-600 dark:text-red-400"
          )}>
            {trend.isPositive ? (
              <TrendingUp className="h-4 w-4 mr-1 flex-shrink-0" />
            ) : (
              <TrendingDown className="h-4 w-4 mr-1 flex-shrink-0" />
            )}
            <span className="truncate">{trend.value}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};