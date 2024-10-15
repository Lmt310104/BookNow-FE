import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export function SignInRoute() {
  return (
    <div className="w-full grid grid-cols-2 h-screen">
      <div className="bg-black"></div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Dang Nhap</h1>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Mat khau</Label>
              <Input id="password" type="password" required />
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
          </div>

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
