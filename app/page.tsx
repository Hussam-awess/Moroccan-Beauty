import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { createClient } from "@/lib/supabase/server"
import { Sparkles, Leaf, Heart, Truck } from "lucide-react"

export default async function HomePage() {
  const supabase = await createClient()

  // Fetch featured products
  const { data: products } = await supabase.from("products").select("*").limit(3)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative flex min-h-[600px] items-center overflow-hidden bg-gradient-to-br from-accent/20 via-background to-secondary/20">
        <div className="container grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col justify-center space-y-6 text-center lg:text-left">
            <h1 className="text-balance font-serif text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
              Pure Moroccan Beauty
            </h1>
            <p className="text-pretty text-lg text-muted-foreground md:text-xl">
              Discover authentic organic beauty products from Morocco. Argan oil, rose water, and black soap delivered
              to your doorstep in East Africa.
            </p>
            <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
              <Button size="lg" asChild>
                <Link href="/products">Shop Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl" />
            <Image
              src="/moroccan-beauty-products-argan-oil-bottles.jpg"
              alt="Moroccan beauty products"
              width={500}
              height={500}
              className="relative z-10"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-none bg-muted/50">
              <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">100% Organic</h3>
                <p className="text-sm text-muted-foreground">Natural ingredients sourced from Morocco</p>
              </CardContent>
            </Card>

            <Card className="border-none bg-muted/50">
              <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Premium Quality</h3>
                <p className="text-sm text-muted-foreground">Cold-pressed and traditionally crafted</p>
              </CardContent>
            </Card>

            <Card className="border-none bg-muted/50">
              <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Ethically Sourced</h3>
                <p className="text-sm text-muted-foreground">Supporting local Moroccan communities</p>
              </CardContent>
            </Card>

            <Card className="border-none bg-muted/50">
              <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Fast Delivery</h3>
                <p className="text-sm text-muted-foreground">Shipped across East Africa</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container space-y-8">
          <div className="text-center">
            <h2 className="text-balance font-serif text-3xl font-bold md:text-4xl">Featured Products</h2>
            <p className="mt-2 text-muted-foreground">Discover our most popular Moroccan beauty essentials</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products?.map((product) => (
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

          <div className="text-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-lg lg:mx-0 lg:max-w-none">
              <Image src="/moroccan-argan-trees-landscape.jpg" alt="Moroccan landscape" fill className="object-cover" />
            </div>
            <div className="flex flex-col justify-center space-y-6 text-center lg:text-left">
              <h2 className="text-balance font-serif text-3xl font-bold md:text-4xl">
                Authentic Moroccan Beauty Traditions
              </h2>
              <p className="text-pretty leading-relaxed text-muted-foreground">
                For centuries, Moroccan women have used natural ingredients like argan oil, rose water, and black soap
                as part of their beauty rituals. We bring these time-tested treasures directly from Morocco to East
                Africa.
              </p>
              <p className="text-pretty leading-relaxed text-muted-foreground">
                Every product is carefully selected from trusted Moroccan producers who use traditional methods to
                preserve the natural benefits of each ingredient.
              </p>
              <div className="flex justify-center lg:justify-start">
                <Button asChild>
                  <Link href="/about">Our Story</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
