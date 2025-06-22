import DashboardSidebar from "@/components/dashboard/shared/Sidebar";
import PrivateRoute from "@/helper/Routers/PrivateRoute";


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PrivateRoute>
      <div>
        <DashboardSidebar>{children}</DashboardSidebar>
      </div>
    </PrivateRoute>
  );
}
