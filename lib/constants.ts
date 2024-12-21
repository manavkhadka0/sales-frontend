/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { JSX } from "@emotion/react/jsx-runtime";
import { Clock, Loader2, Truck, Check, X } from "lucide-react";

export const OrderStatusColors: Record<string, string> = {
  Pending: "text-yellow-500",
  Processing: "text-blue-500",
  Shipped: "text-purple-500",
  Delivered: "text-green-500",
  Cancelled: "text-red-500",
};

export const OrderStatusIcons: Record<string, JSX.Element> = {
  Pending: jsx(Clock, { className: "h-4 w-4" }),
  Processing: jsx(Loader2, { className: "h-4 w-4 animate-spin" }),
  Shipped: jsx(Truck, { className: "h-4 w-4" }),
  Delivered: jsx(Check, { className: "h-4 w-4" }),
  Cancelled: jsx(X, { className: "h-4 w-4" }),
};
