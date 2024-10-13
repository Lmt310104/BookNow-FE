import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const SignUpRoute = () => {
  return (
    <div className="w-full grid grid-cols-2 h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Dang Ky</h1>
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

            <Button className="w-full" type="submit">
              Tiep tuc
            </Button>
            <Button variant="outline" className="w-full">
              Dang Ky voi Google
            </Button>
          </div>

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
