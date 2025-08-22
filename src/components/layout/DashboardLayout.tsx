import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { 
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  Settings,
  Bell,
  Search,
  Plus,
  Rocket,
  Heart,
  MessageSquare,
  BookOpen,
  Shield,
  Zap,
  Target,
  TrendingUp,
  Calendar,
  Star,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
  LogOut,
  User,
  Home,
  Building2,
  Palette,
  Code,
  Database,
  Globe,
  Smartphone,
  Cloud,
  Lock,
  FileCheck,
  Handshake,
  Award,
  Lightbulb
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: string;
  children?: Omit<SidebarItem, 'children'>[];
}

const sidebarItems: SidebarItem[] = [
  {
    id: 'overview',
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard'
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: Briefcase,
    href: '/dashboard/projects',
    badge: '6'
  },
  {
    id: 'matching',
    label: 'Smart Matching',
    icon: Users,
    href: '/dashboard/matching',
    badge: 'New'
  },
  {
    id: 'collaborations',
    label: 'Active Collaborations',
    icon: Handshake,
    href: '/dashboard/collaborations',
    badge: '2'
  },
  {
    id: 'legal',
    label: 'Legal Templates',
    icon: FileText,
    href: '/dashboard/legal',
    children: [
      {
        id: 'nda',
        label: 'NDA Templates',
        icon: Shield,
        href: '/dashboard/legal/nda'
      },
      {
        id: 'contracts',
        label: 'Collaboration Contracts',
        icon: FileCheck,
        href: '/dashboard/legal/contracts'
      },
      {
        id: 'ip',
        label: 'IP Agreements',
        icon: Lock,
        href: '/dashboard/legal/ip'
      },
      {
        id: 'revenue',
        label: 'Revenue Sharing',
        icon: TrendingUp,
        href: '/dashboard/legal/revenue'
      }
    ]
  },
  {
    id: 'resources',
    label: 'Resources',
    icon: BookOpen,
    href: '/dashboard/resources'
  },
  {
    id: 'skills',
    label: 'Skills',
    icon: Award,
    href: '/dashboard/skills'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    href: '/dashboard/settings'
  }
];

const DashboardLayout: React.FC = () => {
  const location = useLocation();
  const { user, profile, signOut } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);

  const handleLogout = async () => {
    await signOut();
    window.location.href = "/access";
  };

  const getUserInitials = () => {
    if (profile?.full_name) {
      return profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return 'U';
  };

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  const renderSidebarItem = (item: SidebarItem, level: number = 0) => {
    const Icon = item.icon;
    const active = isActive(item.href);
    const hasChildren = item.children && item.children.length > 0;
    const isDropdownOpen = openDropdowns.includes(item.id);

    if (hasChildren) {
      return (
        <Collapsible
          key={item.id}
          open={isDropdownOpen}
          onOpenChange={(open) => {
            if (open) {
              setOpenDropdowns(prev => [...prev, item.id]);
            } else {
              setOpenDropdowns(prev => prev.filter(id => id !== item.id));
            }
          }}
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors group",
                "hover:bg-accent hover:text-accent-foreground",
                active 
                  ? "bg-accent text-accent-foreground" 
                  : "text-muted-foreground",
                level > 0 && "ml-6"
              )}
            >
              <Icon className={cn("w-4 h-4", active && "text-accent-foreground")} />
              {!sidebarCollapsed && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <Badge 
                      variant={active ? "default" : "secondary"} 
                      className="text-xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                  <ChevronDown className={cn(
                    "w-4 h-4 transition-transform",
                    isDropdownOpen && "rotate-180"
                  )} />
                </>
              )}
            </Button>
          </CollapsibleTrigger>
          
          {!sidebarCollapsed && (
            <CollapsibleContent className="mt-1 space-y-1">
              {item.children!.map(child => renderSidebarItem(child, level + 1))}
            </CollapsibleContent>
          )}
        </Collapsible>
      );
    }

    return (
      <div key={item.id}>
        <Link
          to={item.href}
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors group",
            "hover:bg-accent hover:text-accent-foreground",
            active 
              ? "bg-accent text-accent-foreground" 
              : "text-muted-foreground",
            level > 0 && "ml-6"
          )}
        >
          <Icon className={cn("w-4 h-4", active && "text-accent-foreground")} />
          {!sidebarCollapsed && (
            <>
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <Badge 
                  variant={active ? "default" : "secondary"} 
                  className="text-xs"
                >
                  {item.badge}
                </Badge>
              )}
            </>
          )}
        </Link>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 z-50 h-full bg-card border-r border-border transition-all duration-300",
        sidebarCollapsed ? "w-16" : "w-64",
        mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            {!sidebarCollapsed && (
              <Link to="/dashboard" className="flex items-center gap-2">
                <Rocket className="w-6 h-6 text-accent" />
                <span className="font-bold text-lg">Colabship</span>
              </Link>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex"
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>



          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {sidebarItems.map(item => renderSidebarItem(item))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="w-full justify-start"
            >
              <LogOut className="w-4 h-4 mr-2" />
              {!sidebarCollapsed && "Sign Out"}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={cn(
        "transition-all duration-300",
        sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
      )}>
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur border-b border-border">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileSidebarOpen(true)}
                className="lg:hidden"
              >
                <Menu className="w-4 h-4" />
              </Button>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search projects, collaborators..."
                  className="w-64 pl-10 pr-4 py-2 text-sm bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              
              {/* User Info */}
              <div className="hidden md:flex items-center gap-3 px-3 py-2 bg-muted/50 rounded-lg">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={profile?.avatar_url} />
                  <AvatarFallback>{getUserInitials()}</AvatarFallback>
                </Avatar>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {profile?.full_name || 'Demo Admin'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Developer
                  </p>
                </div>
              </div>
              
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 