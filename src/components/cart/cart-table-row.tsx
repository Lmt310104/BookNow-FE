import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CategoryState } from "@/common/enums";
import image from "@/assets/placeholder.svg";

export const CartTableRow = () => {
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
          //   src={(data.image_url.length > 0 && data.image_url[0]) || image}
          src={image}
          width="64"
        />
        <div className="w-full flex flex-col justify-center">
          <div className="font-medium">{"data.title"}</div>
        </div>
      </TableCell>
      <TableCell>{"data.name"}</TableCell>
      <TableCell>
        <Badge variant="secondary">{CategoryState.ACTIVE}</Badge>
      </TableCell>
      <TableCell>
        <Popover>
          <PopoverTrigger asChild>
            <Button size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-max p-1">
            <div className="py-2 px-3 w-full hover:bg-[#F4F4F5]">Chinh sua</div>
            {true ? (
              <div className="py-2 px-3  w-full hover:bg-[#F4F4F5]">
                Hien thi
              </div>
            ) : (
              <div className="py-2 px-3  w-full hover:bg-[#F4F4F5]">An</div>
            )}
          </PopoverContent>
        </Popover>
      </TableCell>
    </TableRow>
  );
};
