import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, MapPin, Clock, CreditCard } from "lucide-react"

export default function ShippingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <div className="mb-12 text-center">
            <h1 className="text-balance font-serif text-4xl font-bold md:text-5xl">Shipping Information</h1>
            <p className="mt-2 text-muted-foreground">Everything you need to know about delivery</p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Truck className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Shipping Methods</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="mb-2 font-semibold">Standard Delivery</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    We offer standard delivery across East Africa. Delivery times vary by location but typically take
                    3-7 business days within Kenya, and 7-14 business days for other East African countries.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Free Shipping</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Enjoy free shipping on all orders over $100. For orders under $100, a flat rate of $10 applies.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Delivery Areas</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  We currently ship to Kenya, Uganda, Tanzania, Rwanda, and Burundi. We're working on expanding to more
                  countries in the region. If your country is not listed, please contact us to discuss shipping options.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Processing Time</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Orders are typically processed within 1-2 business days. You'll receive an email confirmation with
                  tracking information once your order has been shipped.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Payment Options</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="mb-2 font-semibold">M-Pesa</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Pay securely using M-Pesa mobile money. Available for customers in Kenya.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Cash on Delivery</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Pay with cash when your order arrives. Available in select locations.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
