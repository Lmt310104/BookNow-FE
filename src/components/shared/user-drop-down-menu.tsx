import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import { ClipboardList, LogOut, User } from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { routes } from "@/config";
import useAuth from "@/hooks/useAuth";
import { UserRole } from "@/common/enums";
import authService from "@/services/auth.service";
import { removeAccessToken } from "@/lib/api-client";
import useUser from "@/hooks/useUser";

const defaultAvatarUrl =
  "https://firebasestorage.googleapis.com/v0/b/booknow-22cff.appspot.com/o/book%2F1729848448797-default-user.jpeg?alt=media&token=c10f8393-cf17-4aa8-8b5f-a793a7058456";

export default function UserDropDownMenu() {
  const [auth, setAuth] = useAuth();
  const [user] = useUser();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      const response = await authService.logOut();
      if (response) {
        setAuth(null);
        removeAccessToken();
        navigate(routes.AUTH.SIGN_IN);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full overflow-hidden aspect-square"
        >
          <img
            className="w-full h-full object-cover"
            src={user?.avatar_url ?? defaultAvatarUrl}
          />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="end">
        <DropdownMenuLabel className="flex flex-row items-center">
          <div className="rounded-full overflow-hidden aspect-square h-7 w-7 mr-2">
            <img
              className="w-full h-full object-cover"
              src={user?.avatar_url ?? defaultAvatarUrl}
            />
          </div>
          <span>{user?.full_name || ""}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {auth && auth.role === UserRole.ADMIN && (
          <DropdownMenuItem
            onClick={() => navigate(routes.ADMIN.ACCOUNT_PROFILE)}
          >
            <User className="w-4 h-4 mr-2" />
            <span>Tai khoan cua toi</span>
          </DropdownMenuItem>
        )}
        {auth && auth.role === UserRole.CUSTOMER && (
          <>
            <DropdownMenuItem
              onClick={() => navigate(routes.CUSTOMER.ACCOUNT_PROFILE)}
            >
              <User className="w-4 h-4 mr-2" />
              <span>Tai khoan cua toi</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate(routes.CUSTOMER.PURCHASE)}
            >
              <ClipboardList className="w-4 h-4 mr-2" />
              <span>Don mua</span>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogOut}>
          <LogOut className="w-4 h-4 mr-2" />
          <span>Dang xuat</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
