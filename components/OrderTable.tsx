import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { Order, OrderStatus } from "@/types/order";

interface OrderTableProps {
  orders: Order[];
  handleStatusChange: (orderId: number, newStatus: OrderStatus) => void;
  handleDeleteOrder: (orderId: number) => void;
}

export function OrderTable({
  orders,
  handleStatusChange,
  handleDeleteOrder,
}: OrderTableProps) {
  return (
    <DataTable
      columns={columns(handleStatusChange, handleDeleteOrder)}
      data={orders}
      searchColumn="full_name"
      filterColumn="order_status"
      handleStatusChange={handleStatusChange}
      //   handleDeleteOrder={handleDeleteOrder}
    />
  );
}
