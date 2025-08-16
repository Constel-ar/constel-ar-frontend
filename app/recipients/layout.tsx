import { AppSidebar } from "@/components/app-recipients-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider } from "@/lib/auth-context";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarProvider>
        <AuthProvider>
          <AppSidebar collapsible="icon" />
          {children}
        </AuthProvider>
      </SidebarProvider>
    </div>
  );
}
