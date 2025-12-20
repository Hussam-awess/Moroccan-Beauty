import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminHeader } from "@/components/admin/admin-header"
import { ProductForm } from "@/components/admin/product-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Params {
  id: string
}

export async function generateStaticParams() {
  // For static export, we can't fetch from database at build time
  // Return empty array since admin pages require authentication
  return []
}

export default async function EditProductPage({ params }: { params: Params }) {
  const { id } = params
  const supabase = await createClient()

  // Get logged-in user
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

  // Fetch the product by ID
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single()

  if (!product) {
    redirect("/admin/products") // redirect if product not found
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />

      <main className="flex-1 py-12">
        <div className="container max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Edit Product</CardTitle>
            </CardHeader>
            <CardContent>
              <ProductForm product={product} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
