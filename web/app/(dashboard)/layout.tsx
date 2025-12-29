import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#0a0a0b]">
      <Sidebar />
      <main className="flex-1 px-8 py-6 bg-[#0a0a0b]">
        {children}
      </main>
    </div>
  );
}
