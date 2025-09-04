import { useDashboard } from "../contexts/dashboard/dashboard-context";
import { RecentActivity } from "./widgets/recent-activity";
import { StatsCard } from "./widgets/stats-card";
import { useDashboardStats } from "@/hooks/use-dashboard-stats";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { 
  FileText, 
  Users, 
  Calendar, 
  Mail, 
  MessageSquare, 
  ClipboardList,
  Microscope,
  AlertCircle
} from "lucide-react";

export const OverviewSection = () => {
  const { user } = useDashboard();
  const { stats, loading, error } = useDashboardStats();

  if (!user) return null;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-gray-500 mt-1">Welcome back, {user.name}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
              <CardContent className="p-5">
                <Skeleton className="h-7 w-16 mb-2" />
                <Skeleton className="h-4 w-24" />
                <div className="flex justify-between items-center mt-4">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
              <CardContent className="p-5">
                <Skeleton className="h-7 w-16 mb-2" />
                <Skeleton className="h-4 w-24" />
                <div className="flex justify-between items-center mt-4">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <Skeleton className="h-6 w-40" />
          </div>
          <CardContent className="p-5">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center py-3 border-b border-gray-100 last:border-0">
                <Skeleton className="h-10 w-10 rounded-full mr-3" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-3 w-48" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-gray-500 mt-1">Welcome back, {user.name}</p>
          </div>
        </div>

        <Card className="bg-white border border-red-100 rounded-xl shadow-sm overflow-hidden">
          <CardContent className="p-6 flex items-center">
            <AlertCircle className="h-6 w-6 text-red-500 mr-3" />
            <div>
              <h3 className="font-medium text-red-800">Error Loading Data</h3>
              <p className="text-red-600 text-sm mt-1">{error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1">Welcome back, {user.name}</p>
        </div>
        <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* First row of stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard
          title="Total Documents"
          value={stats?.totalDocuments.toString() || "0"}
          icon={<FileText className="h-5 w-5 text-blue-600" />}
          trend={{ value: "+12%", isPositive: true }}
          color="blue"
        />

        <StatsCard
          title="System Users"
          value={stats?.totalUsers.toString() || "0"}
          icon={<Users className="h-5 w-5 text-purple-600" />}
          trend={{ value: "+5%", isPositive: true }}
          color="purple"
        />

        <StatsCard
          title="Pending Bookings"
          value={stats?.pendingBookings.toString() || "0"}
          icon={<ClipboardList className="h-5 w-5 text-amber-600" />}
          trend={{ value: `${stats?.pendingBookings || 0} pending`, isPositive: stats?.pendingBookings === 0 }}
          variant={stats?.pendingBookings && stats.pendingBookings > 0 ? "warning" : "default"}
          color="amber"
        />

        <StatsCard
          title="Newsletter Subs"
          value={stats?.totalSubscriptions.toString() || "0"}
          icon={<Mail className="h-5 w-5 text-green-600" />}
          trend={{ value: "+8%", isPositive: true }}
          color="green"
        />
      </div>

      {/* Second row of stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <StatsCard
          title="Contact Messages"
          value={stats?.totalContacts.toString() || "0"}
          icon={<MessageSquare className="h-5 w-5 text-indigo-600" />}
          trend={{ value: "+3 new", isPositive: true }}
          color="indigo"
        />

        <StatsCard
          title="Total Bookings"
          value={stats?.totalBookings.toString() || "0"}
          icon={<Calendar className="h-5 w-5 text-rose-600" />}
          trend={{ value: "+15%", isPositive: true }}
          color="rose"
        />

        <StatsCard
          title="Study Participants"
          value={stats?.totalStudySubscriptions.toString() || "0"}
          icon={<Microscope className="h-5 w-5 text-cyan-600" />}
          trend={{ value: "+20%", isPositive: true }}
          color="cyan"
        />
      </div>

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  );
};