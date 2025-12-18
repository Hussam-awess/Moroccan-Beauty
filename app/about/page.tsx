import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Heart, Users, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-balance font-serif text-4xl font-bold md:text-5xl">Our Story</h1>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
                Bringing the timeless beauty secrets of Morocco to East Africa, one authentic product at a time.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-lg lg:mx-0 lg:max-w-none">
                <Image
                  src="/moroccan-argan-trees-landscape.jpg"
                  alt="Moroccan landscape"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center space-y-6 text-center lg:text-left">
                <h2 className="text-balance font-serif text-3xl font-bold">Authentic Moroccan Beauty</h2>
                <p className="text-pretty leading-relaxed text-muted-foreground">
                  Moroccan Beauty was founded with a simple mission: to share the incredible natural beauty products of
                  Morocco with the people of East Africa. We work directly with trusted producers in Morocco who use
                  traditional methods passed down through generations.
                </p>
                <p className="text-pretty leading-relaxed text-muted-foreground">
                  Every bottle of argan oil, every drop of rose water, and every bar of black soap is carefully sourced
                  to ensure authenticity and quality. We believe in the power of natural ingredients and the beauty
                  traditions that have stood the test of time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-balance font-serif text-3xl font-bold md:text-4xl">Our Values</h2>
              <p className="mt-2 text-muted-foreground">What we stand for</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-none bg-background">
                <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Leaf className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">Natural & Organic</h3>
                  <p className="text-sm text-muted-foreground">
                    Only the purest natural ingredients, free from harmful chemicals
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none bg-background">
                <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">Ethically Sourced</h3>
                  <p className="text-sm text-muted-foreground">Supporting local communities and fair trade practices</p>
                </CardContent>
              </Card>

              <Card className="border-none bg-background">
                <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">Community Focused</h3>
                  <p className="text-sm text-muted-foreground">
                    Building relationships with our customers and partners
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none bg-background">
                <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">Quality First</h3>
                  <p className="text-sm text-muted-foreground">Every product is tested and verified for authenticity</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
