import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CategoryState } from "@/common/enums";
import image from "@/assets/placeholder.svg";
import { ResCartItem } from "@/types/cart";
import cartService from "@/services/cart.service";

interface CartTableRowProps {
  data: ResCartItem;
  onRefetch: () => Promise<void>;
}

export const CartTableRow: React.FC<CartTableRowProps> = ({
  data,
  onRefetch,
}) => {
  const handleRemove = async () => {
    try {
      await cartService.removeFromCart(data.book_id);
      await onRefetch();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <TableRow>
      <TableCell>
        <Checkbox />
      </TableCell>
      <TableCell className="flex flex-row gap-4">
        <img
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={data.book.image_url.length > 0 ? data.book.image_url[0] : image}
          width="64"
        />
        <div className="w-full flex flex-col justify-center">
          <div className="font-medium">{data.book.title}</div>
        </div>
      </TableCell>
      <TableCell>{data.book.price}</TableCell>
      <TableCell>{data.quantity}</TableCell>
      <TableCell>{data.quantity * data.book.price}</TableCell>
      <TableCell>
        <Button variant="outline" onClick={handleRemove}>Xoa</Button>
      </TableCell>
    </TableRow>
  );
};
