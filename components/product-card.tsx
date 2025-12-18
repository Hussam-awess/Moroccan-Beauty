import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
  id: string
  name: string
  price: number
  imageUrl: string
  category: string
  stock: number
}

export function ProductCard({ id, name, price, imageUrl, category, stock }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/products/${id}`}>
        <div className="aspect-square overflow-hidden bg-muted">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={name}
            width={400}
            height={400}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <Badge variant="secondary" className="mb-2 text-xs">
          {category}
        </Badge>
        <Link href={`/products/${id}`}>
          <h3 className="mb-2 font-semibold transition-colors group-hover:text-primary">{name}</h3>
        </Link>
        <p className="text-lg font-bold text-primary">${price.toFixed(2)}</p>
        {stock === 0 && <p className="mt-1 text-sm text-destructive">Out of stock</p>}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full" disabled={stock === 0}>
          <Link href={`/products/${id}`}>{stock === 0 ? "Out of Stock" : "View Details"}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
