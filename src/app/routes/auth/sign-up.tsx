import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "@/services/auth.service";
import { User } from "@/types/user";
import { dateToString, stringToDate } from "@/utils/format";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Gender } from "@/common/enums";
import { PasswordInput } from "@/components/shared/password-input";
import { AxiosError } from "axios";
import { toastSuccess } from "@/utils/toast";

type ErrorState = {
  email?: string;
  password?: string;
  fullName?: string;
  gender?: string;
  birthday?: string;
};

export default function SignUpRoute() {
  const [input, setinput] = useState<User>({
    email: "",
    password: "",
    fullName: "",
    gender: Gender.MALE,
    birthday: new Date(),
  });
  const [errors, setErrors] = useState<ErrorState>({});
  const navigate = useNavigate();

  function handleChangeInput({ name, value }: { name: string; value: string }) {
    if (name === "birthday") {
      setinput((currentInfo) => {
        const newInfo = {
          ...currentInfo,
          [name]: stringToDate(value || dateToString(new Date())),
        };
        return newInfo;
      });
    } else {
      setinput((currentInfo) => {
        const newInfo = {
          ...currentInfo,
          [name]: value,
        };
        return newInfo;
      });
    }
  }

  const validateInputs = () => {
    const newErrors: ErrorState = {};

    if (!input.email.trim()) {
      newErrors.email = "Email không được để trống";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.email)) {
        newErrors.email = "Email chưa đúng định dạng";
      }
    }

    if (!input?.password || !input.password.trim()) {
      newErrors.password = "Mật khẩu không được để trống";
    } else if (!input?.password || input.password.trim().length < 6) {
      newErrors.password = "Mật khẩu phải tối thiểu 6 ký tự";
    }

    if (!input.fullName?.trim()) {
      newErrors.fullName = "Họ và tên không được để trống";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      await authService.signUpByEmail(input);
      setinput({
        email: "",
        password: "",
        fullName: "",
        gender: Gender.MALE,
        birthday: new Date(),
      });
      toastSuccess("Email xác nhận tài khoản đã được gửi đến bạn");
      navigate("/auth/sign-in");
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 400) {
        setErrors({
          email: "Email đã tồn tại. Vui lòng chọn email khác",
        });
      }
      console.log(err);
    }
  };

  return (
    <div className="w-full grid grid-cols-2 h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Đăng Ký</h1>
          </div>
          <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-2">
              <Label htmlFor="name">Họ và tên</Label>
              <Input
                id="name"
                type="text"
                name="name"
                value={input.fullName}
                placeholder="Họ và tên"
                onChange={(e) =>
                  handleChangeInput({
                    name: "fullName",
                    value: e.target.value,
                  })
                }
              />
              {errors?.fullName && (
                <p className="text-red-500 text-xs">{errors.fullName}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="birthday">Ngày sinh</Label>
                <Input
                  id="birthday"
                  type="date"
                  name="birthday"
                  value={dateToString(input.birthday || new Date())}
                  onChange={(e) =>
                    handleChangeInput({
                      name: "birthday",
                      value: e.target.value,
                    })
                  }
                  max={new Date().toISOString().split("T")[0]}
                />
                {errors?.birthday && (
                  <p className="text-red-500 text-xs">{errors.birthday}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="gender">Giới tính</Label>
                <Select
                  value={input.gender}
                  onValueChange={(e) =>
                    handleChangeInput({
                      name: "gender",
                      value: e,
                    })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Gioi tinh" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value={Gender.MALE}>Nam</SelectItem>
                      <SelectItem value={Gender.FEMALE}>Nữ</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                value={input.email}
                onChange={(e) =>
                  handleChangeInput({ name: "email", value: e.target.value })
                }
              />
              {errors?.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <PasswordInput
                id="password"
                name="password"
                placeholder="Mật khẩu"
                value={input.password}
                onChange={(e) =>
                  handleChangeInput({ name: "password", value: e.target.value })
                }
              />
              {errors?.password && (
                <p className="text-red-500 text-xs">{errors.password}</p>
              )}
            </div>
            <Button className="w-full" type="submit">
              Tiếp tục
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            Đã có tài khoản?{" "}
            <a href="./sign-in" className="underline">
              Đăng nhập
            </a>
          </div>
        </div>
      </div>
      <div className="bg-black"></div>
    </div>
  );
}
