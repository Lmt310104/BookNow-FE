import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Search } from "lucide-react";
import DashBoardLayout from "@/components/layouts/dashboard-layout";
import { TablePagination } from "@/components/shared/table-pagination";
import { CategoryTableRow } from "@/components/category/category-table-row";
import { CategoryTableHeader } from "@/components/category/category-table-header";
import { useCallback, useEffect, useRef, useState } from "react";
import categoryService from "@/services/category.service";
import { Meta } from "@/types/api";
import { Category } from "@/types/category";
import CategoryDialog, {
  CategoryDialogRef,
} from "@/components/category/category-dialog";

export default function CategoryRoute() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [meta, setMeta] = useState<Meta>({
    page: 1,
    take: 10,
    itemCount: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  });
  const dialogRef = useRef<CategoryDialogRef>(null);

  const getAllCategories = async () => {
    try {
      const response = await categoryService.getAllCategories({
        page: meta.page,
        take: meta.take,
      });
      console.log(response.data.meta);
      setCategories(response.data.data);
      setMeta(response.data.meta);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllCategories();
  },[]);

  const handleAddNew = () => {
    dialogRef.current?.onOpen();
  };

  const handleUpdate = (id: string) => {
    dialogRef.current?.onOpen(id);
  };

  return (
    <DashBoardLayout>
      <CategoryDialog ref={dialogRef} />
      <main className="flex flex-1 flex-col gap-6 p-6  bg-muted/40 overflow-y-auto">
        <div className="flex">
          <h1 className="text-lg font-semibold">Danh Muc</h1>
          <Button className="gap-1 ml-auto" onClick={handleAddNew}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span>Them danh muc moi</span>
          </Button>
        </div>
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">Tat ca</TabsTrigger>
              <TabsTrigger value="active">Dang hoat dong</TabsTrigger>
              <TabsTrigger value="archived">Da an</TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <div className="relative flex flex-row gap-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Nhap ten danh muc"
                className="w-full rounded-lg bg-background pl-8"
              />
              <Button>Ap dung</Button>
              <Button variant="outline" className="border border-black">
                Nhap lai
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <CategoryTableHeader />
              <TableBody>
                {categories.map((item, index) => (
                  <CategoryTableRow
                    key={index}
                    data={item}
                    onUpdate={handleUpdate}
                    onRefetch={getAllCategories}
                  />
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="bg-muted/50">
            <TablePagination data={meta} />
          </CardFooter>
        </Card>
      </main>
    </DashBoardLayout>
  );
}
