import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { BookData } from "@/types/book";

export const ProductInfoSection : React.FC<{data: BookData}>= ({data}) => {
  console.log(data);
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Thong Tin Chi Tiet</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="grid grid-cols-[120px_1fr]  gap-4">
          <Label className="text-right">Ten san pham</Label>
          <Input id="name" type="name" placeholder="Ten san pham" required value={data.title}/>
        </div>
        <div className="grid grid-cols-[120px_1fr_1fr] gap-4">
          <Label className="text-right">Hinh anh san pham</Label>
          <div className="grid grid-cols-4 gap-4">
            {
              data.image_url.map((image) => {
                return(
                  <img
                    alt="Product image"
                    className="aspect-square rounded-md object-cover"
                    height="70"
                    src={image}
                    width="70"
                  />
                )
              })
            }
            <button className="flex aspect-square h-[70px] w-[70px] items-center justify-center rounded-md border border-dashed">
              <Upload className="h-4 w-4 text-muted-foreground" />
              <span className="sr-only">Upload</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-[120px_2fr] gap-4">
          <Label className="text-right">Anh bia</Label>
          <img
            alt="Product image"
            className="aspect-square rounded-md object-cover"
            height="70"
            src={data.image_url[0]}
            width="70"
          />
        </div>
        <div className="grid grid-cols-[120px_1fr]  gap-4">
          <Label className="text-right">Danh muc</Label>
          <Dialog>
            <DialogTrigger asChild>
              <button className="inline-flex items-center  whitespace-nowrap rounded-md text-sm  transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                {data.Category?.name}
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Chinh sua danh muc</DialogTitle>
              </DialogHeader>
              {/* <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value="Pedro Duarte"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Username
                    </Label>
                    <Input
                      id="username"
                      value="@peduarte"
                      className="col-span-3"
                    />
                  </div>
                </div> */}
              <DialogFooter>
                <Button type="submit">Xac nhan</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid grid-cols-[120px_1fr]  gap-4">
          <Label className="text-right">Mo ta san pham</Label>
          <Textarea placeholder="Mo ta san pham" required rows={4} />
        </div>
      </CardContent>
    </Card>
  );
};
