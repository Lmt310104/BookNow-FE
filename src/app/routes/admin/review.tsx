import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal, Search } from "lucide-react";

import image from "@/assets/placeholder.svg";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import DashBoardLayout from "@/components/layouts/dashboard-layout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-label";

export const ReviewRoute = () => {
  return (
    <DashBoardLayout>
      <main className="flex flex-1 flex-col gap-6 p-6  bg-muted/40 overflow-y-auto">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">
            Danh Sach Danh Gia
          </h1>
        </div>
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader className="flex flex-col gap-4">
            <div className="flex flex-row gap-6">
              <Label className="font-medium">So sao danh gia</Label>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <span>Tat ca</span>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <span>1 Sao</span>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" /> <span>2 Sao</span>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" /> <span>3 Sao</span>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" /> <span>4 Sao</span>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" /> <span>5 Sao</span>
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Nhap ten san pham"
                  className="w-full rounded-lg bg-background pl-8"
                />
              </div>
              <Input
                type="date"
                className="w-fit rounded-lg bg-background pl-8"
              />
              <Select defaultValue="all">
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="Select a statetus" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tat ca</SelectItem>
                  <SelectItem value="to-reply">Can phan hoi</SelectItem>
                  <SelectItem value="reply">Da tra loi</SelectItem>
                </SelectContent>
              </Select>

              <Button>Ap dung</Button>
              <Button variant="outline" className="border border-black">
                Nhap lai
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã đơn hàng</TableHead>
                  <TableHead>Sản phẩm</TableHead>
                  <TableHead>Đánh giá</TableHead>
                  <TableHead>Nội dung</TableHead>
                  <TableHead>Người đánh giá</TableHead>
                  <TableHead>Ngày đánh giá</TableHead>
                  <TableHead>Nhà bán trả lời</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>
                    <span className="sr-only">Thao tac</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
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

                  <TableCell>5</TableCell>
                  <TableCell>San pham tuyet lam</TableCell>
                  <TableCell>Le Minh Toan</TableCell>
                  <TableCell>13/10/2024</TableCell>
                  <TableCell>cam on ban da mua hang</TableCell>

                  <TableCell>
                    <Badge variant="outline">Draft</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Chinh sua</DropdownMenuItem>
                        <DropdownMenuItem>An</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
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

                  <TableCell>5</TableCell>
                  <TableCell>San pham tuyet lam</TableCell>
                  <TableCell>Le Minh Toan</TableCell>
                  <TableCell>13/10/2024</TableCell>
                  <TableCell>cam on ban da mua hang</TableCell>

                  <TableCell>
                    <Badge variant="outline">Draft</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Chinh sua</DropdownMenuItem>
                        <DropdownMenuItem>An</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
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

                  <TableCell>5</TableCell>
                  <TableCell>San pham tuyet lam</TableCell>
                  <TableCell>Le Minh Toan</TableCell>
                  <TableCell>13/10/2024</TableCell>
                  <TableCell>cam on ban da mua hang</TableCell>

                  <TableCell>
                    <Badge variant="outline">Draft</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Chinh sua</DropdownMenuItem>
                        <DropdownMenuItem>An</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
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

                  <TableCell>5</TableCell>
                  <TableCell>San pham tuyet lam</TableCell>
                  <TableCell>Le Minh Toan</TableCell>
                  <TableCell>13/10/2024</TableCell>
                  <TableCell>cam on ban da mua hang</TableCell>

                  <TableCell>
                    <Badge variant="outline">Draft</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Chinh sua</DropdownMenuItem>
                        <DropdownMenuItem>An</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
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

                  <TableCell>5</TableCell>
                  <TableCell>San pham tuyet lam</TableCell>
                  <TableCell>Le Minh Toan</TableCell>
                  <TableCell>13/10/2024</TableCell>
                  <TableCell>cam on ban da mua hang</TableCell>

                  <TableCell>
                    <Badge variant="outline">Draft</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Chinh sua</DropdownMenuItem>
                        <DropdownMenuItem>An</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="bg-muted/50">
            <div className="ml-auto">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </CardFooter>
        </Card>
      </main>
    </DashBoardLayout>
  );
};
