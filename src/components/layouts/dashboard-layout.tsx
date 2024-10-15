import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  CircleUser,
  Home,
  MessageSquareMore,
  Package,
  Package2,
  ShoppingCart,
  UserRound,
  Users,
} from "lucide-react";
import { routes } from "@/config";
import { Link, useLocation } from "react-router-dom";

const inActive =
  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary";
const active =
  "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary";

export default function DashBoardLayout({ children }) {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className="grid min-h-screen w-full grid-cols-[280px_1fr]">
      <div className=" border-r">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <a
              href={routes.ADMIN.DASHBOAD}
              className="flex items-center gap-2 font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="">Book Now</span>
            </a>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <a
                href={routes.ADMIN.DASHBOAD}
                className={
                  pathname === routes.ADMIN.DASHBOAD ? active : inActive
                }
              >
                <Home className="h-4 w-4" />
                Trang Chu
              </a>

              <a
                href={routes.ADMIN.PRODUCT}
                className={
                  pathname === routes.ADMIN.PRODUCT ? active : inActive
                }
              >
                <Package className="h-4 w-4" />
                Quan Ly San Pham{" "}
              </a>
              <a
                href={routes.ADMIN.ORDER}
                className={pathname === routes.ADMIN.ORDER ? active : inActive}
              >
                <ShoppingCart className="h-4 w-4" />
                Quan Ly Don Hang
                {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  6
                </Badge> */}
              </a>
              <a
                href={routes.ADMIN.REVIEW}
                className={pathname === routes.ADMIN.REVIEW ? active : inActive}
              >
                <MessageSquareMore className="h-4 w-4" />
                Quan Ly Danh Gia{" "}
              </a>
              <a
                href={routes.ADMIN.CUSTOMER}
                className={
                  pathname === routes.ADMIN.CUSTOMER ? active : inActive
                }
              >
                <Users className="h-4 w-4" />
                Quan Ly Khach Hang
              </a>

              <a
                href={routes.ADMIN.ACCOUNT_PROFILE}
                className={
                  pathname === routes.ADMIN.ACCOUNT_PROFILE ? active : inActive
                }
              >
                <UserRound className="h-4 w-4" />
                Tai khoan
              </a>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col h-screen">
        <header className="flex justify-end  h-[60px] items-center gap-4 border-b  px-6 ">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link to={routes.ADMIN.ACCOUNT_PROFILE}>Tai khoan cua toi</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to={routes.AUTH.SIGN_IN}>Dang xuat</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        {children}
      </div>
    </div>
  );
}
