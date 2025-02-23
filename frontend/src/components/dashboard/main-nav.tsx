import Link from "next/link"
import { useRouter } from "next/router"

export function MainNav({ className }: { className?: string }) {
  const router = useRouter()
  const isStudent = router.pathname.includes("/student")

  return (
    <nav className={`flex items-center space-x-4 lg:space-x-6 ${className}`}>
      <Link 
        href="/"
        className="text-xl font-bold transition-colors hover:text-primary"
      >
        StudentVolunteer
      </Link>
      
      {isStudent ? (
        <>
          <Link href="/dashboard/student">My Applications</Link>
          <Link href="/internships">Browse Internships</Link>
        </>
      ) : (
        <>
          <Link href="/dashboard/organizer">Dashboard</Link>
          <Link href="/internships/manage">Manage Internships</Link>
          <Link href="/applications/review">Review Applications</Link>
        </>
      )}
    </nav>
  )
} 