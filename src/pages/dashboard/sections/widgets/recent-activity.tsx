import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useRecentActivity } from "@/hooks/use-recent-activity";
import { formatDistanceToNow } from "date-fns";
import { 
  FileText, 
  Calendar, 
  MessageSquare,
  Clock,
  AlertCircle
} from "lucide-react";

const ActivityIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'document':
      return <FileText className="h-5 w-5 text-blue-500 dark:text-blue-400" />;
    case 'booking':
      return <Calendar className="h-5 w-5 text-amber-500 dark:text-amber-400" />;
    case 'contact':
      return <MessageSquare className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />;
    default:
      return <FileText className="h-5 w-5 text-gray-500 dark:text-gray-400" />;
  }
};

export const RecentActivity = () => {
  const { activities, loading, error } = useRecentActivity();

  if (loading) {
    return (
      <Card className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-sm dark:shadow-none overflow-hidden transition-colors duration-200">
        <CardHeader className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-600">
          <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="p-5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
              <Skeleton className="h-10 w-10 rounded-full mr-3 bg-gray-200 dark:bg-gray-600" />
              <div className="flex-1">
                <Skeleton className="h-4 w-32 mb-2 bg-gray-200 dark:bg-gray-600" />
                <Skeleton className="h-3 w-48 bg-gray-200 dark:bg-gray-600" />
              </div>
              <Skeleton className="h-3 w-16 bg-gray-200 dark:bg-gray-600" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-sm dark:shadow-none overflow-hidden transition-colors duration-200">
        <CardHeader className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-600">
          <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="p-5">
          <div className="text-center py-4 text-red-600 dark:text-red-400 flex flex-col items-center">
            <AlertCircle className="h-8 w-8 mb-2" />
            <p>Failed to load recent activity</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-sm dark:shadow-none overflow-hidden transition-colors duration-200">
      <CardHeader className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-600">
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        <div className="space-y-4">
          {activities.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p>No recent activity</p>
            </div>
          ) : (
            activities.map((activity, index) => {
              const type = activity.icon === '📄' ? 'document' : 
                          activity.icon === '📅' ? 'booking' : 'contact';
              
              return (
                <div key={index} className="flex items-start py-3 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0 first:pt-0">
                  <div className="flex-shrink-0 mt-1">
                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                      <ActivityIcon type={type} />
                    </div>
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {activity.title}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {activity.description}
                    </p>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
                    <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
                    {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
};