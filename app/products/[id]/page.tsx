import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export async function generateStaticParams() {
  // For static export, we can't reliably fetch from database at build time
  // Return empty array - pages will be generated on-demand
  return []
}

export default async function ProductPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = await createClient()

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", params.id)
    .single()

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header cartCount={0} />
        <main className="flex-1 py-12">
          <div className="container">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
              <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
              <a href="/products" className="text-primary hover:underline">
                Browse all products
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header cartCount={0} />
      <main className="flex-1 py-12">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                <Image
                  src={product.image_url || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <p className="text-2xl font-bold text-primary mt-2">${product.price.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">{product.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                </span>
              </div>
              <Button
                size="lg"
                className="w-full"
                disabled={product.stock === 0}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
