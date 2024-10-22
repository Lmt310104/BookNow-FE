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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { FormEvent, useEffect, useState } from "react";
import categoryService from "@/services/category.service";
import { Meta } from "@/types/api";
import { Category } from "@/types/category";

export default function CategoryRoute() {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [meta, setMeta] = useState<Meta>();
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const handleCloseDialog = () => {
    setOpen(!open);
    setInput("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await categoryService.createCategory({ name: input });
      handleCloseDialog();
    } catch (err) {
      console.log(err);
    }
  };

  const getAllCategories = async () => {
    try {
      const response = await categoryService.getAllCategories();
      if (response) {
        setCategories(response.data.data);
        setIsLoading(false);
        setMeta(response.data.meta);
        console.log(response.data.meta);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
    {isLoading && <div>Is loading</div>}
      { !isLoading &&
      <DashBoardLayout>
        <main className="flex flex-1 flex-col gap-6 p-6  bg-muted/40 overflow-y-auto">
          <div className="flex">
            <h1 className="text-lg font-semibold">Danh Muc</h1>
            <Dialog open={open} onOpenChange={handleCloseDialog}>
              <DialogTrigger asChild>
                <Button className="gap-1 ml-auto">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span>Them danh muc moi</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Them danh muc moi</DialogTitle>
                </DialogHeader>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-4">
                    <Label htmlFor="name">Ten danh muc</Label>
                    <Input
                      id="name"
                      placeholder="Ten danh muc"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCloseDialog}
                    >
                      Huy
                    </Button>
                    <Button type="submit">Luu</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
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
                  {categories.map((item) => (
                    <CategoryTableRow key={item.id} data={item} />
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="bg-muted/50">
              <TablePagination data={meta}/>
            </CardFooter>
          </Card>
        </main>
      </DashBoardLayout>
      }
    </>
  );
  
}
