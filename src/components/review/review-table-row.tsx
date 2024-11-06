import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import image from "@/assets/placeholder.svg";
import { MessageSquareReply } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResReview } from "@/types/review";
import { REVIEW_sTATUS } from "@/common/constants";
import { dateToVNString } from "@/utils/format";

interface ReviewTableRowProps {
  data: ResReview;
  onReply: () => void;
}

export const ReviewTableRow: React.FC<ReviewTableRowProps> = ({
  data,
  onReply,
}) => {
  return (
    <TableRow>
      <TableCell>{"data.id"}</TableCell>
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
      <TableCell>{dateToVNString(new Date(data.created_at))}</TableCell>
      {/* <TableCell>cam on ban da mua hang</TableCell> */}

      <TableCell>
        <Badge variant="outline">{REVIEW_sTATUS[data.state]}</Badge>
      </TableCell>
      <TableCell>
        <Button
          aria-haspopup="true"
          size="icon"
          variant="ghost"
          onClick={onReply}
        >
          <MessageSquareReply className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};
