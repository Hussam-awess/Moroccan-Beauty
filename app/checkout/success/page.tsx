import Link from "next/link"
import { redirect } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import { createClient } from "@/lib/supabase/server"

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>
}) {
  const params = await searchParams
  const orderId = params.orderId

  if (!orderId) {
    redirect("/")
  }

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch order details
  const { data: order } = await supabase.from("orders").select("*").eq("id", orderId).eq("user_id", user.id).single()

  if (!order) {
    redirect("/")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container max-w-2xl">
          <Card className="text-center">
            <CardHeader className="space-y-4 pb-8">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Order Placed Successfully!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pb-8">
              <div className="rounded-lg bg-muted/50 p-6">
                <p className="mb-2 text-sm text-muted-foreground">Order Number</p>
                <p className="font-mono text-lg font-semibold">{order.id.slice(0, 8).toUpperCase()}</p>
              </div>

              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">Thank you for your order!</p>
                <p className="text-muted-foreground">
                  We've sent a confirmation email to your registered email address. You can track your order status in
                  your account.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button asChild>
                  <Link href="/account/orders">View Orders</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/products">Continue Shopping</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
