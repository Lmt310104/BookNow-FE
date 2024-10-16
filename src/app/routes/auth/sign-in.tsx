import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignInWithEmail } from "@/features/auth/apis/sign-in";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function SignInRoute() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const signInWithEmailMutation = useSignInWithEmail({
    mutationConfig: {
      onSuccess: () => {
        navigate("/");
      },
    },
  });

  function handleChangeInput({ name, value }: { name: string; value: string }) {
    setUserInfo((currentInfo) => {
      const newInfo = {
        ...currentInfo,
        [name]: value,
      };
      return newInfo;
    });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    signInWithEmailMutation.mutate(userInfo);
  }
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
                placeholder="email@example.com"
                required
                value={userInfo.email}
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
                required
                value={userInfo.password}
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
              <Link to="/dashboad">Dang Nhap</Link>
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
