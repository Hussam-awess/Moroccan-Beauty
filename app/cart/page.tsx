import { redirect } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"
import { CartItems } from "@/components/cart-items"
import { CartSummary } from "@/components/cart-summary"
import { normalizeCartItems } from "@/lib/normalize-cart"
import type { CartItem } from "@/types/cart"

export default async function CartPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/auth/login")

  const { data } = await supabase
    .from("cart_items")
    .select(`
      id,
      quantity,
      products (
        id,
        name,
        price,
        image_url,
        stock
      )
    `)
    .eq("user_id", user.id)

  // Normalize Supabase response
  const cartItems: CartItem[] = normalizeCartItems(data)

  const itemCount = cartItems.length
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.products?.price ?? 0) * item.quantity,
    0
  )

  return (
    <div className="flex min-h-screen flex-col">
      <Header cartCount={itemCount} />

      <main className="flex-1 py-12">
        <div className="container">
          <h1 className="mb-8 text-center font-serif text-3xl font-bold md:text-4xl lg:text-left">
            Shopping Cart
          </h1>

          {cartItems.length === 0 ? (
            <div className="rounded-lg border bg-muted/30 p-12 text-center">
              <p className="mb-4 text-lg text-muted-foreground">Your cart is empty</p>
              <a href="/products" className="text-primary hover:underline">
                Continue shopping
              </a>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <CartItems items={cartItems} />
              </div>
              <div>
                <CartSummary subtotal={subtotal} itemCount={itemCount} />
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
