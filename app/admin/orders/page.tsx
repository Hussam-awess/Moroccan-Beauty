import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminHeader } from "@/components/admin/admin-header"
import { OrdersTable } from "@/components/admin/orders-table"

// Dynamic route page for a specific order
// Runs server-side on Vercel automatically
interface Params {
  id: string
}

export default async function AdminOrderPage({ params }: { params: Params }) {
  const supabase = await createClient()

  // Get current logged-in user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Check if user is admin
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single()

  if (!profile?.is_admin) {
    redirect("/")
  }

  // Fetch the order by ID
  const { data: order } = await supabase
    .from("orders")
    .select(
      `
      *,
      profiles (
        full_name,
        email
      )
    `
    )
    .eq("id", params.id) // fetch only the specific order
    .single()

  if (!order) {
    redirect("/account/orders") // redirect if order not found
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />

      <main className="flex-1 py-12">
        <div className="container">
          <h1 className="mb-8 font-serif text-3xl font-bold">Order Details</h1>
          <OrdersTable orders={[order]} /> {/* pass a single order as array */}
        </div>
      </main>
    </div>
  )
}

