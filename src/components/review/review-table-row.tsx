import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import image from "@/assets/placeholder.svg";
import { MessageSquareReply } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResReview } from "@/types/review";
import { REVIEW_sTATUS } from "@/common/constants";
import { dateToVNString } from "@/utils/format";
import { ReviewStatus } from "@/common/enums";

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
      <TableCell>{data.order_id}</TableCell>
      <TableCell className="font-medium flex flex-row gap-4 items-center">
        <img
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={data.book.image_url.length>0 && data.book.image_url[0] || image}
          width="64"
        />
        {data.book.title}
      </TableCell>

      <TableCell>{data.rating}</TableCell>
      <TableCell>{data.description}</TableCell>
      <TableCell>{data.user.full_name}</TableCell>
      <TableCell>{dateToVNString(new Date(data.created_at))}</TableCell>
      <TableCell>cam on ban da mua hang</TableCell>

      <TableCell className="w-[130px]  sticky right-[97px] bg-gray-50 z-10">
      <Badge variant="outline">{REVIEW_sTATUS[data.state]}</Badge>
      </TableCell>
      <TableCell  className="w-[100px]  sticky right-0 bg-gray-50 z-10">
        {data.state === ReviewStatus.UNANSWERED && (
          <Button
            aria-haspopup="true"
            size="icon"
            variant="ghost"
            onClick={onReply}
          >
            <MessageSquareReply className="h-4 w-4" />
          </Button>
        )}
        {data.state === ReviewStatus.ANSWERED && (
          <Button
            aria-haspopup="true"
            size="icon"
            variant="ghost"
            onClick={onReply}
          >
            <MessageSquareReply className="h-4 w-4" />
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};
