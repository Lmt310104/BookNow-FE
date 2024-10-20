import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import { CircleUser } from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "@/config";
import useAuth from "@/hooks/useAuth";
import { UserRole } from "@/common/enums";
import authService from "@/services/auth.service";

export default function UserDropDownMenu() {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      const response = await authService.logOut();
      if (response) {
        localStorage.removeItem("token");
        setAuth(null);
        navigate(routes.AUTH.SIGN_IN);
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <CircleUser className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {auth && auth.role === UserRole.ADMIN && (
          <DropdownMenuItem>
            <Link to={routes.ADMIN.ACCOUNT_PROFILE}>Tai khoan cua toi</Link>
          </DropdownMenuItem>
        )}
        {auth && auth.role === UserRole.CUSTOMER && (
          <>
            <DropdownMenuItem>
              <Link to={routes.CUSTOMER.ACCOUNT_PROFILE}>
                Tai khoan cua toi
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to={routes.CUSTOMER.PURCHASE}>Don mua</Link>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogOut}>Dang xuat</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
