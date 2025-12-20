export type Product = {
  id: string
  name: string
  price: number
  image_url: string
  stock: number
}

export type CartItem = {
  id: string
  quantity: number
  products: Product | null
}
