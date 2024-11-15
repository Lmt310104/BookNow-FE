import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import image from "@/assets/placeholder.svg";
import { ResBookDetail } from "@/types/book";
import React, { useRef, useState } from "react";
import { BOOK_STATUS } from "@/common/constants";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useNavigate } from "react-router-dom";
import bookService from "@/services/book.service";
import { BookStatus } from "@/common/enums";
import CustomAlertDialog, {
  CustomAlertDialogRef,
} from "../shared/alert-dialog";
import { toastSuccess } from "@/utils/toast";

interface ProductTableRowProps {
  data: ResBookDetail;
  onRefetch: () => Promise<void>;
}

export const ProductTableRow: React.FC<ProductTableRowProps> = ({
  data,
  onRefetch,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const alertDialogRef = useRef<CustomAlertDialogRef | null>(null);

  const handleUpdate = () => {
    navigate(`/portal/book/${data.id}`);
  };

  const handleActive = async () => {
    setIsOpen(false);
    alertDialogRef.current?.onOpen(
      {
        title: `Bạn có chắc chắn muốn kích hoạt sách này?`,
        description:
          "Sau khi kích hoạt, sách này sẽ hiển thị trên hệ thống và khách hàng có thể tìm thấy cũng như mua sách.",
      },
      async () => {
        try {
          await bookService.activeBookById(data.id);
          toastSuccess("Sách đã được hiển thị");
          await onRefetch();
        } catch (err) {
          console.log(err);
        }
      }
    );
  };

  const handleHide = async () => {
    setIsOpen(false);
    alertDialogRef.current?.onOpen(
      {
        title: `Bạn có chắc chắn muốn ẩn sách này?`,
        description:
          "Sau khi ẩn, khách hàng sẽ không thể tìm thấy hoặc mua sách.",
      },
      async () => {
        try {
          await bookService.inactiveBookById(data.id);
          toastSuccess("Sách đã được ẩn");

          await onRefetch();
        } catch (err) {
          console.log(err);
        }
      }
    );
  };
  
  return (
    <>
      <CustomAlertDialog ref={alertDialogRef} />
      <TableRow>
        {/* <TableCell>
        <Checkbox />
      </TableCell> */}
        <TableCell className="flex flex-row gap-4">
          <div className="overflow-hidden rounded-md w-[64px] aspect-square">
            <img
              alt="Product image"
              className="object-cover w-full h-full"
              src={(data.image_url.length > 0 && data.image_url[0]) || image}
            />
          </div>
          <div className="w-full flex flex-col justify-center">
            <div className="font-medium">{data.title}</div>
            <div>{`Id: ${data.id}`}</div>
          </div>
        </TableCell>
        <TableCell>{data.Category?.name}</TableCell>
        <TableCell>
          <Badge variant="outline">{BOOK_STATUS[data.status]}</Badge>
        </TableCell>
        <TableCell>{data.entry_price}</TableCell>
        <TableCell>{data.price}</TableCell>
        <TableCell>{data.stock_quantity}</TableCell>
        <TableCell>
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-max p-1">
              <div
                className="py-2 px-3  w-full hover:bg-[#F4F4F5]"
                onClick={handleUpdate}
              >
                Chỉnh sửa
              </div>
              {data.status === BookStatus.INACTIVE ? (
                <div
                  className="py-2 px-3  w-full hover:bg-[#F4F4F5]"
                  onClick={handleActive}
                >
                  Hiển thị
                </div>
              ) : (
                <div
                  className="py-2 px-3  w-full hover:bg-[#F4F4F5]"
                  onClick={handleHide}
                >
                  Ẩn
                </div>
              )}
            </PopoverContent>
          </Popover>
        </TableCell>
      </TableRow>
    </>
  );
};
