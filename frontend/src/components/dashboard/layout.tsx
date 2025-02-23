import { useRouter } from "next/router"
import { UserNav } from "@/components/dashboard/user-nav"
import { MainNav } from "@/components/dashboard/main-nav"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav />
          <UserNav />
        </div>
      </header>
      <main className="flex-1 container py-6">{children}</main>
    </div>
  )
} 