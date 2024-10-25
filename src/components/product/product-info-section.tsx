import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import image from "@/assets/placeholder.svg";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { Dispatch, SetStateAction, useRef } from "react";
import { BookDetail } from "@/types/book";

export const ProductInfoSection = ({
  onChange,
  detailData,
}: {
  onChange: Dispatch<SetStateAction<BookDetail>>;
  detailData: BookDetail;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadFile = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onChange((prevDetailData) => {
        return {
          ...prevDetailData,
          image: file,
          preview: URL.createObjectURL(file),
        };
      });
    }
  };

  const handleChangeInput = ({
    name,
    value,
  }: {
    name: string;
    value: string;
  }) => {
    onChange((prevDetailData) => {
      return {
        ...prevDetailData,
        [name]: value,
      };
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Thong Tin Chi Tiet</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="grid grid-cols-[120px_1fr]  gap-4">
          <Label className="text-right">Ten san pham</Label>
          <Input
            id="title"
            name="title"
            placeholder="Ten san pham"
            required
            value={detailData.title}
            onChange={(e) =>
              handleChangeInput({ name: "title", value: e.target.value })
            }
          />
        </div>
        <div className="grid grid-cols-[120px_1fr_1fr] gap-4">
          <Label className="text-right">Hinh anh san pham</Label>
          <div className="flex flex-row gap-4">
            {detailData.preview && (
              <div className="rounded-md h-[70px] w-[70px] overflow-hidden">
                <img
                  alt="Product image"
             className="object-cover h-full w-full"
                  src={detailData.preview}
                />
              </div>
            )}
            <button
              className="flex aspect-square h-[70px] w-[70px] items-center justify-center rounded-md border border-dashed hover:bg-muted"
              onClick={handleUploadFile}
              type="button"
            >
              <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <Upload className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-[120px_1fr]  gap-4">
          <Label className="text-right">Danh muc</Label>
          <Input
            id="categoryId"
            name="categoryId"
            placeholder="categoryId"
            required
            value={detailData.categoryId}
            onChange={(e) =>
              handleChangeInput({ name: "categoryId", value: e.target.value })
            }
          />
          {/* <Dialog>
            <DialogTrigger asChild>
              <button className="inline-flex items-center  whitespace-nowrap rounded-md text-sm  transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                Danh muc
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Chinh sua danh muc</DialogTitle>
              </DialogHeader>

              <DialogFooter>
                <Button type="submit">Xac nhan</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog> */}
        </div>
        <div className="grid grid-cols-[120px_1fr]  gap-4">
          <Label className="text-right">Mo ta san pham</Label>
          <Textarea
            placeholder="Mo ta san pham"
            required
            name="description"
            rows={4}
            value={detailData.description}
            onChange={(e) =>
              handleChangeInput({ name: "description", value: e.target.value })
            }
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="grid grid-cols-[120px_1fr]  gap-4">
            <Label className="text-right">Gia dau vao</Label>
            <Input
              id="entryPrice"
              name="entryPrice"
              type="number"
              min={0}
              required
              defaultValue={0}
              value={detailData.entryPrice}
              onChange={(e) =>
                handleChangeInput({ name: "entryPrice", value: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-[120px_1fr]  gap-4">
            <Label className="text-right">Gia ban</Label>
            <Input
              id="price"
              name="price"
              type="number"
              defaultValue={0}
              min={0}
              required
              value={detailData.price}
              onChange={(e) =>
                handleChangeInput({ name: "price", value: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-[120px_1fr]  gap-4">
            <Label className="text-right">Ton kho</Label>
            <Input
              id="stockQuantity"
              name="stockQuantity"
              type="number"
              min={0}
              defaultValue={0}
              required
              value={detailData.stockQuantity}
              onChange={(e) =>
                handleChangeInput({
                  name: "stockQuantity",
                  value: e.target.value,
                })
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
