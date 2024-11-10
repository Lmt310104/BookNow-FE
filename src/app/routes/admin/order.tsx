import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoreHorizontal, Search } from "lucide-react";

import image from "@/assets/placeholder.svg";
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

export const OrderRoute = () => {
  return (
    <DashBoardLayout>
      <main className="flex flex-1 flex-col gap-6 p-6  bg-muted/40 overflow-y-auto">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">
            Danh Sach Don Hang
          </h1>
        </div>
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">Tat ca (0)</TabsTrigger>
              <TabsTrigger value="awaiting">Cho xac nhan (0)</TabsTrigger>
              <TabsTrigger value="processing" className="hidden sm:flex">
                Dang xu ly (0)
              </TabsTrigger>
              <TabsTrigger value="shipping" className="hidden sm:flex">
                Dang van chuyen (0)
              </TabsTrigger>
              <TabsTrigger value="delivered" className="hidden sm:flex">
                Da giao hang (0)
              </TabsTrigger>
              <TabsTrigger value="canceled" className="hidden sm:flex">
                Da huy (0)
              </TabsTrigger>
            </TabsList>
          </div>
          {/* <TabsContent value="all" className="flex flex-col gap-6">
              </TabsContent> */}
        </Tabs>
        <Card x-chunk="dashboard-06-chunk-0">
          <CardContent className="flex flex-col gap-6 mt-6">
            <div className="flex flex-row gap-4">
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Nhap ma don hang"
                  className="w-full rounded-lg bg-background pl-8"
                />
              </div>
              <Button>Ap dung</Button>
              <Button variant="outline" className="border border-black">
                Nhap lai
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã đơn hàng</TableHead>
                  <TableHead>Trạng thái</TableHead>

                  <TableHead>Han xac nhan</TableHead>
                  <TableHead>Đánh giá</TableHead>
                  <TableHead>Nội dung</TableHead>
                  <TableHead>Người đánh giá</TableHead>
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
