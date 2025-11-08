
import { AppHeader } from "./AppHeader";

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      <main className="pt-16 pb-8">
        <div className="container mx-auto px-4 animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
};
