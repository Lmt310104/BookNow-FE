import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { CircleUser, Search, ShoppingCart } from "lucide-react";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { Link } from "react-router-dom";
import { routes } from "@/config";

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full overflow-y-auto">
      <div className="px-40 h-24 w-full flex flex-row items-center bg-black gap-16">
        <a href="#" className="text-white text-nowrap  text-2xl font-bold">
          Book Now
        </a>

        <div className="flex  w-full rounded-sm items-center space-x-2 bg-white p-[2px]">
          <input
            className="w-full pl-2"
            type="text"
            placeholder="Tim sach..."
          />
          <Button className="rounded-sm" type="submit">
            <Search className="w-6 h-6 text-white" />
          </Button>
        </div>
        <div className="flex flex-row gap-4 w-fit items-center">
          <div className="w-11">
            <ShoppingCart className="h-7 w-7 text-white" />
          </div>
          <div className="w-11">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <CircleUser className="h-7 w-7" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link to={routes.CUSTOMER.ACCOUNT_PROFILE}>
                    Tai khoan cua toi
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to={routes.CUSTOMER.PURCHASE}>Don mua</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  {" "}
                  <Link to={routes.AUTH.SIGN_IN}>Dang xuat</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="px-40 flex flex-col gap-6   bg-[#f9f9f9]">{children}</div>
    </div>
  );
}
