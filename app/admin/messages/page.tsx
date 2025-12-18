import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminHeader } from "@/components/admin/admin-header"
import { MessagesTable } from "@/components/admin/messages-table"

export default async function AdminMessagesPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single()

  if (!profile?.is_admin) {
    redirect("/")
  }

  const { data: messages } = await supabase.from("messages").select("*").order("created_at", { ascending: false })

  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />

      <main className="flex-1 py-12">
        <div className="container">
          <h1 className="mb-8 font-serif text-3xl font-bold">Messages</h1>
          <MessagesTable messages={messages || []} />
        </div>
      </main>
    </div>
  )
}
