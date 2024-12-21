import { Order } from "@/types/order";
import OrderDetails from "./OrderCard";

interface OrderGridProps {
  orders: Order[];
  handleStatusChange: (orderId: number, newStatus: string) => void;
}

export function OrderGrid({ orders, handleStatusChange }: OrderGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {orders.map((order) => (
        <OrderDetails
          key={order.id}
          order={order}
          handleStatusChange={handleStatusChange}
        />
      ))}
    </div>
  );
}
