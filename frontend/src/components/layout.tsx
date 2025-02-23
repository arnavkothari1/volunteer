import { MainNav } from "@/components/dashboard/main-nav";
import { UserNav } from "@/components/dashboard/user-nav";
import { Search } from "./search";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <UserNav />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
} 