"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface CartItem {
  id: string
  quantity: number
  products: {
    id: string
    name: string
    price: number
    image_url: string
    stock: number
  } | null
}

export function CartItems({ items }: { items: CartItem[] }) {
  const [cartItems, setCartItems] = useState(items)
  const [isUpdating, setIsUpdating] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const updateQuantity = async (itemId: string, newQuantity: number, maxStock: number) => {
    if (newQuantity < 1 || newQuantity > maxStock) return

    setIsUpdating(itemId)
    await supabase.from("cart_items").update({ quantity: newQuantity }).eq("id", itemId)

    setCartItems((prev) => prev.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)))

    setIsUpdating(null)
    router.refresh()
  }

  const removeItem = async (itemId: string) => {
    setIsUpdating(itemId)
    await supabase.from("cart_items").delete().eq("id", itemId)

    setCartItems((prev) => prev.filter((item) => item.id !== itemId))
    setIsUpdating(null)
    router.refresh()
  }

  return (
    <div className="space-y-4">
      {cartItems.map((item) => {
        if (!item.products) return null

        return (
          <Card key={item.id}>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={item.products.image_url || "/placeholder.svg"}
                    alt={item.products.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="font-semibold">{item.products.name}</h3>
                    <p className="text-lg font-bold text-primary">${item.products.price.toFixed(2)}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => updateQuantity(item.id, item.quantity - 1, item.products!.stock)}
                        disabled={item.quantity <= 1 || isUpdating === item.id}
                      >
                        <MinusIcon className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => updateQuantity(item.id, item.quantity + 1, item.products!.stock)}
                        disabled={item.quantity >= item.products.stock || isUpdating === item.id}
                      >
                        <PlusIcon className="h-3 w-3" />
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => removeItem(item.id)}
                      disabled={isUpdating === item.id}
                    >
                      <Trash2Icon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
