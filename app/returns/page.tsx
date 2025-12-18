import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RefreshCw, Package, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ReturnsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <div className="mb-12 text-center">
            <h1 className="text-balance font-serif text-4xl font-bold md:text-5xl">Returns & Refunds</h1>
            <p className="mt-2 text-muted-foreground">Our commitment to your satisfaction</p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <RefreshCw className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>30-Day Return Policy</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  We want you to love your products! If you're not completely satisfied with your purchase, you can
                  return it within 30 days of delivery for a full refund or exchange. Products must be unused, in their
                  original packaging, and in the same condition you received them.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>How to Return</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
                  <li>Contact our customer service team to initiate a return</li>
                  <li>Pack the item securely in its original packaging</li>
                  <li>Ship the item back to our return address (provided via email)</li>
                  <li>Once we receive and inspect the item, we'll process your refund</li>
                </ol>
                <p className="text-sm text-muted-foreground">
                  Please note: Return shipping costs are the responsibility of the customer unless the item is defective
                  or we made an error.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Questions?</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  If you have any questions about our returns policy or need assistance with a return, please don't
                  hesitate to contact us. We're here to help!
                </p>
                <Button asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
