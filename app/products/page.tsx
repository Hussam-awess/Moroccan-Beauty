import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

async function ProductsGrid({ category }: { category?: string }) {
  const supabase = await createClient()

  let query = supabase.from("products").select("*").order("created_at", { ascending: false })

  if (category) {
    query = query.eq("category", category)
  }

  const { data: products } = await query

  if (!products || products.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">No products found.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          imageUrl={product.image_url}
          category={product.category}
          stock={product.stock}
        />
      ))}
    </div>
  )
}

function ProductsGridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i}>
          <Skeleton className="aspect-square w-full" />
          <CardContent className="p-4">
            <Skeleton className="mb-2 h-5 w-16" />
            <Skeleton className="mb-2 h-6 w-3/4" />
            <Skeleton className="h-6 w-20" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const params = await searchParams
  const category = params.category

  const categories = ["All", "Oils", "Toners", "Cleansers", "Masks"]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="border-b bg-muted/30 py-12 text-center">
          <div className="container">
            <h1 className="text-balance font-serif text-4xl font-bold md:text-5xl">Our Products</h1>
            <p className="mt-2 text-muted-foreground">Authentic Moroccan beauty essentials</p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="border-b py-6">
          <div className="container">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <a
                  key={cat}
                  href={cat === "All" ? "/products" : `/products?category=${cat}`}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    (cat === "All" && !category) || category === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {cat}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12">
          <div className="container">
            <Suspense fallback={<ProductsGridSkeleton />}>
              <ProductsGrid category={category} />
            </Suspense>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
