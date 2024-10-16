import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { LockKeyhole, Mail, Pencil, Phone } from "lucide-react";

import image from "@/assets/placeholder.svg";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Link, useLocation } from "react-router-dom";
import { routes } from "@/config";

export const AccountInfo = () => {
  const location = useLocation();
  const { pathname } = location;
  return (
    <Card className="w-full">
      <CardContent className="flex flex-row mt-6">
        <div className="border-r border-gray-300 h-100 basis-1/2 flex flex-col gap-6 pr-8">
          <label>Thong tin ca nhan</label>
          <div className="relative mx-auto">
            <img
              className="w-28 h-28 rounded-full border-4 border-[#C2E1FF]"
              src={image}
              alt="Rounded avatar"
            />
            <div className="absolute bottom-[10px] left-[90px] w-4 h-4 bg-[#64646D] rounded-full flex justify-center items-center">
              <Pencil className="w-3 h-3 text-white absolute" />
            </div>
          </div>
          <div className="grid grid-cols-[1fr_1fr]">
            <label>Ho va ten</label>
            <Input id="name" type="name" required />
          </div>
          <div className="grid grid-cols-[1fr_1fr]">
            <label>Ngay sinh</label>
            <Input id="birthday" type="date" required />
          </div>
          <div className="grid grid-cols-[1fr_1fr]">
            <label>Gioi tinh</label>
            <RadioGroup
              defaultValue="male"
              className="flex-1 flex flex-row justify-between"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="r1" />
                <Label htmlFor="r1">Nam</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="r2" />
                <Label htmlFor="r2">Nu</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="r3" />
                <Label htmlFor="r3">Khac</Label>
              </div>
            </RadioGroup>
          </div>
          <Button className="mx-auto">Luu thay doi</Button>
        </div>
        <div className=" basis-1/2 flex flex-col  gap-8 pl-8">
          <p>So dien thoai va Email</p>
          <div className="flex flex-row w-full gap-2 items-center">
            <Phone className="w-5 h-5" />
            <div className="flex flex-col gap-1">
              <p>So dien thoai</p>
              <p>0343800708</p>
            </div>
            <Button variant="outline" className="border border-black ml-auto">
              Cap Nhat
            </Button>
          </div>
          <div className="flex flex-row w-full gap-2 items-center">
            <Mail className="w-5 h-5" />
            <div className="flex flex-col gap-1">
              <p>Dia chi mail</p>
              <p>email@gmail.com</p>
            </div>
            <Button variant="outline" className="border border-black ml-auto">
              Cap Nhat
            </Button>
          </div>
          <p>Bao mat</p>
          <div className="flex flex-row w-full gap-2 items-center">
            <LockKeyhole className="w-5 h-5" />
            <p>Doi mat khau</p>
            <Button variant="outline" className="border border-black ml-auto">
              <Link
                to={
                  pathname === routes.ADMIN.ACCOUNT_PROFILE
                    ? routes.ADMIN.CHANGE_PASSWORD
                    : routes.CUSTOMER.CHANGE_PASSWORD
                }
              >
                Cap Nhat
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
