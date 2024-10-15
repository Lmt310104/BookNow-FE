import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignUpByEmail } from "@/features/auth/apis/sign-up";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignUpRoute = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    fullName: "",
  });

  const navigate = useNavigate();
  const signUpByEmailMutation = useSignUpByEmail({
    mutationConfig: {
      onSuccess: () => {
        navigate("/auth/sign-in");
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
    signUpByEmailMutation.mutate(userInfo);
  }

  return (
    <div className="w-full grid grid-cols-2 h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Dang Ky</h1>
          </div>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="name">Ho va ten</Label>
              <Input
                id="name"
                type="text"
                required
                value={userInfo.fullName}
                onChange={(e) =>
                  handleChangeInput({ name: "fullName", value: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={userInfo.email}
                onChange={(e) =>
                  handleChangeInput({ name: "email", value: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Mat khau</Label>
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

            <Button className="w-full" type="submit">
              Tiep tuc
            </Button>
            <Button variant="outline" className="w-full">
              Dang Ky voi Google
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            Da co tai khoan?{" "}
            <a href="./sign-in" className="underline">
              Dang Nhap
            </a>
          </div>
        </div>
      </div>
      <div className="bg-black"></div>
    </div>
  );
};
