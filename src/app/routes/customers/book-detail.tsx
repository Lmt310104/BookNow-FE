import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/20/solid";
import { EmblaOptionsType } from "embla-carousel";

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

import ProductLayout from "@/components/layouts/product-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EmblaCarousel from "@/components/shared/embla-carousel";
import { CounterInput } from "@/components/shared/counter-input";
import { ProductVariation } from "@/features/product/components/product-variation";

const OPTIONS: EmblaOptionsType = {};
const SLIDE_COUNT = 10;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

export const BookDetailRoute = () => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]);

  return (
    <ProductLayout>
      <Card className="mt-6 grid grid-cols-5 gap-12 p-6">
        <div className="w-full col-span-2">
          <EmblaCarousel slides={SLIDES} options={OPTIONS} />
        </div>
        <div className="space-y-6  col-span-3">
          <h2 className="text-xl font-medium text-gray-900 ">{product.name}</h2>

          <div>
            <div className="flex items-center ">
              <p className=" text-sm">{product.rating}</p>
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    aria-hidden="true"
                    className={(product.rating > rating
                      ? "text-gray-900"
                      : "text-gray-200"
                    ).concat(" h-4 w-4 flex-shrink-0")}
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
                    <ProductVariation size={size} />
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
                    <ProductVariation size={size} />
                  ))}
                </RadioGroup>
              </fieldset>
              <fieldset
                aria-label="Choose a size"
                className="grid grid-cols-[100px_1fr]"
              >
                <div className="text-gray-900">So luong</div>
                <CounterInput />
              </fieldset>
              <Button>Them vao gio hang</Button>
            </form>
          </section>
        </div>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Mo Ta San Pham</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec
            ultricies nunc nisl nec nunc.
          </p>{" "}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec
            ultricies nunc nisl nec nunc.
          </p>{" "}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec
            ultricies nunc nisl nec nunc.
          </p>{" "}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec
            ultricies nunc nisl nec nunc.
          </p>{" "}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec
            ultricies nunc nisl nec nunc.
          </p>{" "}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec
            ultricies nunc nisl nec nunc.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Danh Gia San Pham</CardTitle>
        </CardHeader>
      </Card>
    </ProductLayout>
  );
};
