"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MinusIcon, PlusIcon, ShoppingCart } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export function AddToCartButton({ productId, stock }: { productId: string; stock: number }) {
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleAddToCart = async () => {
    setIsLoading(true)
    const supabase = createClient()

    // Check if user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      // Redirect to login if not authenticated
      router.push("/auth/login")
      return
    }

    // Check if item already exists in cart
    const { data: existingItem } = await supabase
      .from("cart_items")
      .select("*")
      .eq("user_id", user.id)
      .eq("product_id", productId)
      .single()

    if (existingItem) {
      // Update quantity
      await supabase
        .from("cart_items")
        .update({ quantity: existingItem.quantity + quantity })
        .eq("id", existingItem.id)
    } else {
      // Insert new cart item
      await supabase.from("cart_items").insert({
        user_id: user.id,
        product_id: productId,
        quantity,
      })
    }

    setIsLoading(false)
    router.push("/cart")
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">Quantity:</span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            <MinusIcon className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.min(stock, quantity + 1))}
            disabled={quantity >= stock}
          >
            <PlusIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Button size="lg" className="w-full" onClick={handleAddToCart} disabled={stock === 0 || isLoading}>
        <ShoppingCart className="mr-2 h-5 w-5" />
        {isLoading ? "Adding..." : "Add to Cart"}
      </Button>
    </div>
  )
}
