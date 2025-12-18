import { notFound } from "next/navigation"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: product } = await supabase.from("products").select("*").eq("id", id).single()

  if (!product) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Product Image */}
            <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-lg bg-muted lg:mx-0 lg:max-w-none">
              <Image
                src={product.image_url || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Product Info */}
            <div className="space-y-6 text-center lg:text-left">
              <div>
                <Badge variant="secondary" className="mb-2">
                  {product.category}
                </Badge>
                <h1 className="text-balance font-serif text-3xl font-bold md:text-4xl">{product.name}</h1>
              </div>

              <div>
                <p className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</p>
                {product.stock === 0 ? (
                  <p className="mt-2 text-sm text-destructive">Out of stock</p>
                ) : product.stock < 10 ? (
                  <p className="mt-2 text-sm text-amber-600">Only {product.stock} left in stock</p>
                ) : (
                  <p className="mt-2 text-sm text-muted-foreground">In stock</p>
                )}
              </div>

              <Separator />

              <div>
                <h2 className="mb-2 font-semibold">Description</h2>
                <p className="leading-relaxed text-muted-foreground">{product.description}</p>
              </div>

              {product.ingredients && (
                <div>
                  <h2 className="mb-2 font-semibold">Ingredients</h2>
                  <p className="leading-relaxed text-muted-foreground">{product.ingredients}</p>
                </div>
              )}

              {product.usage_instructions && (
                <div>
                  <h2 className="mb-2 font-semibold">How to Use</h2>
                  <p className="leading-relaxed text-muted-foreground">{product.usage_instructions}</p>
                </div>
              )}

              <AddToCartButton productId={product.id} stock={product.stock} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
