import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import image from "@/assets/placeholder.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MessageSquareReply, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResReview } from "@/types/review";
import { REVIEW_sTATUS } from "@/common/constants";

interface ReviewTableRowProps {
  data: ResReview;
}

export const ReviewTableRow: React.FC<ReviewTableRowProps> = ({ data }) => {
  return (
    <TableRow>
      <TableCell>2252</TableCell>
      <TableCell className="font-medium flex flex-row gap-4 items-center">
        <img
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={image}
          width="64"
        />
        Laser Lemonade Machine
      </TableCell>

      <TableCell>{data.rating}</TableCell>
      <TableCell>{data.description}</TableCell>
      <TableCell>{"data.user_id"}</TableCell>
      <TableCell>{data.created_at.toString()}</TableCell>
      {/* <TableCell>cam on ban da mua hang</TableCell> */}

      <TableCell>
        <Badge variant="outline">{REVIEW_sTATUS[data.state]}</Badge>
      </TableCell>
      <TableCell>
        <Button aria-haspopup="true" size="icon" variant="ghost">
        <MessageSquareReply className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};
