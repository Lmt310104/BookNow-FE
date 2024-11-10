import { useState } from "react";
import { Radio, RadioGroup } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/20/solid";

const product = {
  name: "Cho Tôi Xin Một Vé Đi Tuổi Thơ (Bìa Mềm) (Tái Bản)",
  price: "68.100d",
  rating: 3.9,
  reviewCount: 117,
  href: "#",
  imageSrc:
    "https://salt.tikicdn.com/cache/750x750/ts/product/8f/63/5d/e17ddc42fbf8bf15b1958222ed1939dc.jpg.webp",
  imageAlt: "Two each of gray, white, and black shirts arranged on table.",

  sizes: [
    { name: "XXS", inStock: true },
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
    { name: "XXL", inStock: true },
    { name: "XXXL", inStock: false },
  ],
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

import ProductLayout from "@/components/layouts/product-layout";
import { Button } from "@/components/ui/button";

export const BookDetailRoute = () => {
  // const [open, setOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]);

  return (
    <ProductLayout>
      <div className="relative flex w-full items-center overflow-hidden bg-white  p-8 mt-6">
        <div className="grid w-full items-start gap-x-8 gap-y-8 grid-cols-12">
          <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 col-span-5 border border-slate-200">
            <img
              alt={product.imageAlt}
              src={product.imageSrc}
              className="object-cover object-center"
            />
          </div>
          <div className="col-span-7 space-y-6">
            <h2 className="text-xl font-medium text-gray-900 ">
              {product.name}
            </h2>

            <div>
              <div className="flex items-center ">
                <p className=" text-sm">{product.rating}</p>
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      aria-hidden="true"
                      className={classNames(
                        product.rating > rating
                          ? "text-gray-900"
                          : "text-gray-200",
                        "h-4 w-4 flex-shrink-0",
                      )}
                    />
                  ))}
                </div>
                <p className="ml-3 text-sm">{product.reviewCount} danh gia</p>
              </div>
            </div>
            <p className="text-xl text-gray-900">{product.price}</p>
            <section aria-labelledby="options-heading">
              <form className="space-y-6">
                <fieldset
                  aria-label="Choose a size"
                  className="grid grid-cols-[100px_1fr]"
                >
                  <div className="text-gray-900">Phan loai</div>
                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="grid grid-cols-5 gap-4"
                  >
                    {product.sizes.map((size) => (
                      <Radio
                        key={size.name}
                        value={size}
                        disabled={!size.inStock}
                        className={classNames(
                          size.inStock
                            ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                            : "cursor-not-allowed bg-gray-50 text-gray-200",
                          "group relative flex items-center justify-center rounded-sm border p-2 text-sm  uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:black ",
                        )}
                      >
                        <span>{size.name}</span>
                        {size.inStock ? (
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-px rounded-md border border-transparent group-data-[focus]:border group-data-[checked]:border-black"
                          />
                        ) : (
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-px rounded-md border-1 border-gray-200"
                          >
                            <svg
                              stroke="currentColor"
                              viewBox="0 0 100 100"
                              preserveAspectRatio="none"
                              className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                            >
                              <line
                                x1={0}
                                x2={100}
                                y1={100}
                                y2={0}
                                vectorEffect="non-scaling-stroke"
                              />
                            </svg>
                          </span>
                        )}
                      </Radio>
                    ))}
                  </RadioGroup>
                </fieldset>
                <fieldset
                  aria-label="Choose a size"
                  className="grid grid-cols-[100px_1fr]"
                >
                  <div className="text-gray-900">Phan loai</div>
                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="grid grid-cols-5 gap-4"
                  >
                    {product.sizes.map((size) => (
                      <Radio
                        key={size.name}
                        value={size}
                        disabled={!size.inStock}
                        className={classNames(
                          size.inStock
                            ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                            : "cursor-not-allowed bg-gray-50 text-gray-200",
                          "group relative flex items-center justify-center rounded-sm border p-2 text-sm  uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:black ",
                        )}
                      >
                        <span>{size.name}</span>
                        {size.inStock ? (
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-px rounded-md border border-transparent group-data-[focus]:border group-data-[checked]:border-black"
                          />
                        ) : (
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-px rounded-md border-1 border-gray-200"
                          >
                            <svg
                              stroke="currentColor"
                              viewBox="0 0 100 100"
                              preserveAspectRatio="none"
                              className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                            >
                              <line
                                x1={0}
                                x2={100}
                                y1={100}
                                y2={0}
                                vectorEffect="non-scaling-stroke"
                              />
                            </svg>
                          </span>
                        )}
                      </Radio>
                    ))}
                  </RadioGroup>
                </fieldset>
                <fieldset
                  aria-label="Choose a size"
                  className="grid grid-cols-[100px_1fr]"
                >
                  <div className="text-gray-900">So luong</div>
                </fieldset>
                <Button>Them vao gio hang</Button>
              </form>
            </section>
          </div>
        </div>
      </div>
      <div className="border border-black h-96"></div>
      <div className="border border-black h-96"></div>
    </ProductLayout>
  );
};
