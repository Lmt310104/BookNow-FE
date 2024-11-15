import DashBoardLayout from "@/components/layouts/dashboard-layout";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import bookService from "@/services/book.service";
import { FormEvent, useEffect, useState } from "react";
import { UpdateBookDetail } from "@/types/book";
import { ProductInfoSection } from "@/components/product/product-info-section";
import categoryService from "@/services/category.service";
import { routes } from "@/config";
import { AddProductErrorState } from "./add-product";
import { toastSuccess } from "@/utils/toast";
// import { ProductInfoSection } from "@/components/product/product-info-section";

export default function ProductDetailRoute() {
  const param = useParams();
  const [detailData, setDetailData] = useState<UpdateBookDetail>({
    title: "",
    author: "NXBVN",
    price: 0,
    description: "",
    image_url: [],
    id: "",
    entryPrice: 0,
    stockQuantity: 0,
    categoryId: "",
    images: [],
    initCategory: null,
  });
  const [errors, setErrors] = useState<AddProductErrorState>({});
  const navigate = useNavigate();

  const getBookDetail = async (id: string) => {
    try {
      const bookResponse = await bookService.getBookById(id);
      const bookData = bookResponse.data.data;
      const categoryResponse = await categoryService.getCategoryById(
        bookData.category_id
      );

      setDetailData({
        title: bookData.title,
        author: bookData.author,
        price: +bookData.price,
        description: bookData.description,
        image_url: bookData.image_url,
        id: bookData.id,
        entryPrice: +bookData.entry_price,
        stockQuantity: +bookData.stock_quantity,
        categoryId: bookData.category_id,
        images: [],
        initCategory: categoryResponse.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const validateInputs = () => {
    const newErrors: AddProductErrorState = {};

    if (!detailData.title.trim()) {
      newErrors.title = "Tên sách không được để trống";
    }

    if (!detailData.categoryId.trim()) {
      newErrors.categoryId = "Danh mục không được để trống";
    }

    if (detailData.entryPrice <= 0) {
      newErrors.entryPrice = "Giá nhập phải lớn hơn 0";
    }

    if (detailData.price <= 0) {
      newErrors.price = "Giá bán phải lớn hơn 0";
    }

    if (detailData.price < detailData.entryPrice) {
      newErrors.price = "Giá bán không được nhỏ hơn giá nhập";
    }

    if (detailData.stockQuantity < 0) {
      newErrors.stockQuantity = "Số lượng tồn kho không được nhỏ hơn 0";
    }

    if (!detailData.description.trim()) {
      newErrors.description = "Mô tả không được để trống";
    }

    if (detailData.images.length + detailData.image_url.length < 1) {
      newErrors.images = "Hình ảnh không được để trống";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(
      detailData,
      typeof detailData.price,
      detailData.price < detailData.entryPrice
    );
    if (!validateInputs()) return;
    try {
      await bookService.updateBookById(detailData);
      toastSuccess("Cập nhật sách thành công");
      navigate(routes.ADMIN.PRODUCT);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (param?.bookId) {
      getBookDetail(param.bookId);
    }
  }, [param]);

  return (
    <DashBoardLayout>
      <form
        className="flex flex-1 flex-col gap-6 p-6  bg-muted/40 overflow-y-auto"
        onSubmit={handleSubmit}
        noValidate
      >
        {/* <Tabs defaultValue="detail">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="detail">Thong tin chi tiet</TabsTrigger>
              <TabsTrigger value="sale">Thong tin ban hang</TabsTrigger>
            </TabsList>
          </div>
        </Tabs> */}
        <ProductInfoSection
          detailData={detailData}
          onChange={setDetailData}
          errors={errors}
        />
        {/* <ProductSaleSection /> */}
        <div className="flex flex-row gap-4 mx-auto mb-12">
          <Button
            variant="outline"
            className="w-40"
            type="button"
            onClick={() => navigate(routes.ADMIN.PRODUCT)}
          >
            Hủy
          </Button>
          <Button className="w-40" type="submit">
            Lưu
          </Button>
        </div>
      </form>
    </DashBoardLayout>
  );
}
