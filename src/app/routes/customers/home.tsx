import { BookStatus } from "@/common/enums";
import ProductLayout, {
  ProductLayoutRef,
} from "@/components/layouts/product-layout";
import { FilterButton } from "@/components/product/filter-button";
import ProductItemCard from "@/components/product/product-item-card";
import { FiveStars } from "@/components/shared/five-stars";
import { TablePagination } from "@/components/shared/table-pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import bookService from "@/services/book.service";
import categoryService from "@/services/category.service";
import { Meta } from "@/types/api";
import { ResBookDetail } from "@/types/book";
import { Category } from "@/types/category";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function HomeRoute() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const param = Object.fromEntries(searchParams.entries());
  const homeRef = useRef<ProductLayoutRef | null>(null);
  const [books, setBooks] = useState<ResBookDetail[]>([]);
  const [meta, setMeta] = useState<Meta>({
    page: 1,
    take: 20,
    itemCount: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryMeta, setCategoryMeta] = useState<Meta>({
    page: 1,
    take: 8,
    itemCount: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  });

  const [priceRange, setPriceRange] = useState<{
    min: number | null;
    max: number | null;
  }>({
    min: null,
    max: null,
  });

  const getAllBooks = async () => {
    console.log(param);
    try {
      const response = await bookService.getAllBooks(
        {
          page:
            parseInt(param?.page as string) > 0
              ? parseInt(param.page as string)
              : 1,
          take: meta.take,
        },
        {
          status: BookStatus.ACTIVE,
          ...param,
        }
      );

      setBooks(response.data.data);
      setMeta(response.data.meta);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllCategories = async () => {
    try {
      const response = await categoryService.getAllCategories(
        {
          page: categoryMeta.page,
          take: categoryMeta.take,
        },
        false
      );
      setCategories(response.data.data);
      setCategoryMeta(response.data.meta);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLoadMoreCategories = () => {
    setCategoryMeta((prevMeta) => {
      return {
        ...prevMeta,
        take: prevMeta.take + 8,
      };
    });
  };

  const handleSetParam = (data: Record<string, string | number | null>) => {
    const newParams = { ...param, ...data };
    if (!("sortBy" in data)) delete newParams.sortBy;
    const newSearchParams = new URLSearchParams();
    Object.entries(newParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        newSearchParams.set(key, String(value));
      }
    });

    const paramString = newSearchParams.toString();
    const url = paramString
      ? `${location.pathname}?${paramString}`
      : location.pathname;

    navigate(url);
  };

  const handleSetPriceRange = (name: string, value: string) => {
    const eValue = value === "" ? null : Number(value);
    if (eValue === null || (!isNaN(eValue) && eValue >= 0)) {
      setPriceRange({ ...priceRange, [name]: eValue });
    }
  };

  const handleApplyPriceRange = () => {
    handleSetParam({
      min_price: priceRange.min,
      max_price: priceRange.max,
    });
  };

  const handleRemoveParams = () => {
    navigate(location.pathname);
  };

  useEffect(() => {
    const minPrice = param.min_price ? Number(param.min_price) : null;
    const maxPrice = param.max_price ? Number(param.max_price) : null;
    setPriceRange({
      min: minPrice,
      max: maxPrice,
    });

    getAllBooks();
  }, [location.search]);

  useEffect(() => {
    getAllCategories();
  }, [categoryMeta.take]);

  useEffect(() => {
    handleSetParam({ page: meta.page });
  }, [meta.page]);

  return (
    <ProductLayout ref={homeRef}>
      <div className="grid grid-cols-[220px_1fr] py-4 gap-4 h-full">
        <div className="w-full h-full bg-white rounded-md p-4 space-y-4">
          <p className="font-bold">BỘ LỌC TÌM KIẾM</p>
          <div className="space-y-2">
            <div className="font-medium mb-4">Theo danh mục</div>
            {categories.map((item, index) => {
              return (
                <div
                  key={index}
                  className={"flex flex-row gap-2 rounded-md p-2 hover:bg-muted".concat(
                    param?.category && param.category === item.id
                      ? " bg-muted"
                      : " bg-transparent"
                  )}
                  onClick={() => handleSetParam({ category: item.id })}
                >
                  {item.name}
                </div>
              );
            })}
            {categoryMeta.hasNextPage && (
              <div
                className="flex flex-row gap-2 hover:text-gray-400"
                onClick={handleLoadMoreCategories}
              >
                <span>Thêm</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            )}
          </div>
          <hr />
          <div className="space-y-2">
            <div className="font-medium mb-4">Khoảng giá</div>
            <div>
              <div className="flex flex-row gap-4 mb-4">
                <Input
                  placeholder="Từ"
                  value={priceRange.min || ""}
                  onChange={(e) =>
                    handleSetPriceRange("min", e.target.value.trim())
                  }
                />
                <Input
                  placeholder="Dến"
                  value={priceRange.max || ""}
                  onChange={(e) =>
                    handleSetPriceRange("max", e.target.value.trim())
                  }
                />
              </div>
              <Button className="w-full" onClick={handleApplyPriceRange}>
                Áp dụng
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-medium mb-4">Đánh giá</div>
            {[5, 4, 3, 2, 1].map((value) => (
              <div
                key={value}
                className={"flex flex-row gap-2 rounded-md p-2 hover:bg-muted".concat(
                  param?.min_star && param.min_star === value.toString()
                    ? " bg-muted"
                    : " bg-transparent"
                )}
                onClick={() => handleSetParam({ min_star: value })}
              >
                <FiveStars value={value} />
                {value !== 5 && <span>trở lên</span>}
              </div>
            ))}
          </div>
          <hr />
          <Button className="w-full" onClick={handleRemoveParams}>
            Xóa tất cả
          </Button>
        </div>
        <div>
          <div className="p-4 bg-muted flex flex-row gap-4 items-center mb-6">
            <span className="font-semibold">Sắp xếp theo</span>
            <FilterButton
              value="Mới nhất"
              isActive={
                param?.sortBy && param.sortBy !== "created_at" ? false : true
              }
              onClick={() => handleSetParam({ sortBy: "created_at" })}
            />
            <FilterButton
              value="Bán chạy"
              isActive={
                (param?.sortBy && param.sortBy === "sold_quantity") || false
              }
              onClick={() => handleSetParam({ sortBy: "sold_quantity" })}
            />
            <FilterButton
              value="Giá cao đến thấp"
              isActive={
                (param?.sortBy &&
                  param.sortBy === "price" &&
                  !(param?.order && param?.order === "asc")) ||
                false
              }
              onClick={() => handleSetParam({ sortBy: "price" })}
            />
            <FilterButton
              value="Giá thấp đến cao"
              isActive={
                (param?.sortBy &&
                  param.sortBy === "price" &&
                  param?.order &&
                  param?.order === "asc") ||
                false
              }
              onClick={() => handleSetParam({ sortBy: "price", order: "asc" })}
            />
          </div>
          <div className="w-full grid grid-cols-5 gap-4 mb-6">
            {books.map((item, index) => {
              return <ProductItemCard key={index} data={item} />;
            })}
          </div>
          <TablePagination data={meta} onChange={setMeta} />
        </div>
      </div>
    </ProductLayout>
  );
}
