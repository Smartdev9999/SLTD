import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Newspaper, FolderKanban, Briefcase, Wrench } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    news: 0,
    projects: 0,
    services: 0,
    careers: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [newsRes, projectsRes, servicesRes, careersRes] = await Promise.all([
        supabase.from('news').select('id', { count: 'exact', head: true }),
        supabase.from('projects').select('id', { count: 'exact', head: true }),
        supabase.from('services').select('id', { count: 'exact', head: true }),
        supabase.from('careers').select('id', { count: 'exact', head: true }),
      ]);

      setStats({
        news: newsRes.count || 0,
        projects: projectsRes.count || 0,
        services: servicesRes.count || 0,
        careers: careersRes.count || 0,
      });
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: 'News Articles', value: stats.news, icon: Newspaper, color: 'text-blue-500' },
    { title: 'Projects', value: stats.projects, icon: FolderKanban, color: 'text-green-500' },
    { title: 'Services', value: stats.services, icon: Wrench, color: 'text-orange-500' },
    { title: 'Career Openings', value: stats.careers, icon: Briefcase, color: 'text-purple-500' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-display">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to LSTD Content Management System</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quick Start</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Use the sidebar to navigate between different content sections</p>
            <p>• Create and manage multilingual content (EN, LA, TH, ZH)</p>
            <p>• Upload images to enhance your content</p>
            <p>• Published content will appear on the public website</p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
