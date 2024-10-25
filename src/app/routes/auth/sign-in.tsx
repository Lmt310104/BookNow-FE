import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "@/services/auth.service";
import { jwtDecode } from "jwt-decode";
import { JWTDecode } from "@/context/auth";
import { UserRole } from "@/common/enums";
import useAuth from "@/hooks/useAuth";
import { setAccessToken } from "@/lib/api-client";

export default function SignInRoute() {
  const [input, setinput] = useState({ email: "", password: "" });
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleChangeInput = ({
    name,
    value,
  }: {
    name: string;
    value: string;
  }) => {
    setinput((currentInfo) => {
      const newInfo = {
        ...currentInfo,
        [name]: value,
      };
      return newInfo;
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await authService.signInWithEmail(input);
      if (response.data) {
        const accessToken: string = response.data.access_token;
        setinput({ email: "", password: "" });
        setAccessToken(accessToken);
        const { id, role }: JWTDecode = jwtDecode(accessToken);
        setAuth({
          userId: id,
          role,
        });
        if (role === UserRole.ADMIN) {
          navigate("/dashboad");
        } else if (role === UserRole.CUSTOMER) {
          navigate("/");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full grid grid-cols-2 h-screen">
      <div className="bg-black"></div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Dang Nhap</h1>
          </div>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="email@example.com"
                required
                value={input.email}
                onChange={(e) =>
                  handleChangeInput({ name: "email", value: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Mat khau</Label>
              <Input
                id="password"
                type="password"
                name="password"
                required
                value={input.password}
                onChange={(e) =>
                  handleChangeInput({ name: "password", value: e.target.value })
                }
              />
            </div>
            <a
              href="./forgot-password"
              className="ml-auto inline-block text-sm underline"
            >
              Quen mat khau?
            </a>
            <Button className="w-full" type="submit">
              Dang Nhap
            </Button>
            <Button variant="outline" className="w-full">
              Dang Nhap voi Google
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            Chua co tai khoan?{" "}
            <a href="./sign-up" className="underline">
              Dang Ky
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
