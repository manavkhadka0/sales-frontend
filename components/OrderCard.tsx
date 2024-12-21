import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Order } from "@/types/order";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";

const getStatusColor = (status: string) => {
  switch (status) {
    case "Shipped":
      return "bg-blue-500 hover:bg-blue-600";
    case "Pending":
      return "bg-yellow-500 hover:bg-yellow-600";
    case "Delivered":
      return "bg-green-500 hover:bg-green-600";
    case "Cancelled":
      return "bg-red-500 hover:bg-red-600";
    default:
      return "bg-gray-500 hover:bg-gray-600";
  }
};

interface OrderDetailsProps {
  order: Order;
  handleStatusChange: (orderId: number, newStatus: string) => void;
}

export function OrderDetails({ order, handleStatusChange }: OrderDetailsProps) {
  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg">
      <CardHeader className="flex justify-between items-center border-b pb-4">
        <div>
          <CardTitle className="text-2xl font-bold">
            Order #{order.id}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {format(new Date(order.created_at), "MMMM d, yyyy")}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className={`${getStatusColor(
                order.order_status
              )} text-white font-semibold`}
            >
              {order.order_status}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40">
            <DropdownMenuItem>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleStatusChange(order.id, "Processing")}
              >
                Processing
              </Button>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleStatusChange(order.id, "Shipped")}
              >
                Shipped
              </Button>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleStatusChange(order.id, "Delivered")}
              >
                Delivered
              </Button>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleStatusChange(order.id, "Cancelled")}
              >
                Cancelled
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div>
            <p className="font-semibold text-lg">{order.full_name}</p>
            <p className="text-sm">{order.phone_number}</p>
            {order.alternate_phone_number && (
              <p className="text-sm">{order.alternate_phone_number}</p>
            )}
          </div>

          <div>
            <p className="font-semibold">Delivery Address</p>
            <p>{order.delivery_address}</p>
            {order.landmark && (
              <p className="text-sm text-muted-foreground">{order.landmark}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div>
            <p className="font-semibold">Payment Method</p>
            <p>{order.payment_method}</p>
          </div>

          {order.remarks && (
            <div>
              <p className="font-semibold">Remarks</p>
              <p>{order.remarks}</p>
            </div>
          )}
        </div>
      </CardContent>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead className="text-right">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.order_products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.product.name}</TableCell>
                <TableCell className="text-right">{product.quantity}</TableCell>
                <TableCell className="text-right">
                  ₹{product.get_total_price.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <CardFooter className="flex   justify-between border-t pt-4">
        <div>
          <p className="text-lg font-semibold">Total Amount</p>
          <p className="text-2xl font-bold">₹{order.total_amount}</p>
        </div>
      </CardFooter>
    </Card>
  );
}

export default OrderDetails;
