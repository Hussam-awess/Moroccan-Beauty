import { redirect } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"
import { normalizeCartItems } from "@/lib/normalize-cart"
import type { CartItem } from "@/types/cart"

export default async function CheckoutPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/auth/login")

  const { data: cartData } = await supabase
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

  const cartItems: CartItem[] = normalizeCartItems(cartData)

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.products?.price ?? 0) * item.quantity,
    0
  )
  const shipping = subtotal > 100 ? 0 : 10
  const total = subtotal + shipping

  return (
    <div className="flex min-h-screen flex-col">
      <Header cartCount={cartItems.length} />

      <main className="flex-1 py-12">
        <div className="container">
          <h1 className="mb-8 text-center font-serif text-3xl font-bold md:text-4xl lg:text-left">
            Checkout
          </h1>

          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <div>
              <p>Subtotal: ${subtotal.toFixed(2)}</p>
              <p>Shipping: ${shipping.toFixed(2)}</p>
              <p>Total: ${total.toFixed(2)}</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
