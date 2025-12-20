import type { CartItem } from "@/types/cart.ts"

export function normalizeCartItems(data: any[] | null): CartItem[] {
  if (!data) return []

  return data.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    products: item.products ?? null,
  }))
}
