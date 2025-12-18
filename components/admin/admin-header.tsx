import Link from "next/link"
import { Button } from "@/components/ui/button"

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
              <span className="font-serif text-xl font-bold text-primary-foreground">M</span>
            </div>
            <span className="font-serif text-xl font-semibold">Admin Panel</span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/admin" className="text-sm font-medium transition-colors hover:text-primary">
              Dashboard
            </Link>
            <Link href="/admin/products" className="text-sm font-medium transition-colors hover:text-primary">
              Products
            </Link>
            <Link href="/admin/orders" className="text-sm font-medium transition-colors hover:text-primary">
              Orders
            </Link>
            <Link href="/admin/messages" className="text-sm font-medium transition-colors hover:text-primary">
              Messages
            </Link>
          </nav>
        </div>

        <Button variant="outline" asChild>
          <Link href="/">View Site</Link>
        </Button>
      </div>
    </header>
  )
}
