type TWholesaleOrderDetail = {
  orderDetailId: number
  orderId: number
  productId: number
  quantity: number
}

export type TWholesaleData = {
  orderId: number
  customerId: number
  orderTime: number
  status: "PENDING" | "DELIVERED"
  totalAmount: number
  orderDetails: TWholesaleOrderDetail[]
}
