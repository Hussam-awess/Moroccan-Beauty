import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

interface Order {
  id: string
  total_amount: number
  status: string
  created_at: string
  payment_method: string
}

export function RecentOrders({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="mb-4 text-muted-foreground">You haven't placed any orders yet.</p>
        <Button asChild>
          <Link href="/products">Start Shopping</Link>
        </Button>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-1">
            <p className="font-mono text-sm font-semibold">{order.id.slice(0, 8).toUpperCase()}</p>
            <p className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(order.created_at), { addSuffix: true })}
            </p>
            <p className="text-sm">
              <span className="font-medium">${order.total_amount.toFixed(2)}</span>
              <span className="mx-2 text-muted-foreground">•</span>
              <span className="capitalize text-muted-foreground">{order.payment_method}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/account/orders/${order.id}`}>View</Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
