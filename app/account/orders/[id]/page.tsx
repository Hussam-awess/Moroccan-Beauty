import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminHeader } from "@/components/admin/admin-header"
import { OrdersTable } from "@/components/admin/orders-table"

// 🔒 MANUAL STATIC IDS
export async function generateStaticParams() {
  return [
    { id: "order-1" },
    { id: "order-2" },
    { id: "order-3" },
  ]
}

export default async function AdminOrderPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/auth/login")

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single()

  if (!profile?.is_admin) redirect("/")

  const { data: order } = await supabase
    .from("orders")
    .select("*")
    .eq("id", params.id)
    .single()

  if (!order) redirect("/account/orders")

  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />
      <main className="container py-12">
        <h1 className="text-3xl font-bold mb-6">Order {params.id}</h1>
        <OrdersTable orders={[order]} />
      </main>
    </div>
  )
}
