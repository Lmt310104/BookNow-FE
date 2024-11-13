import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { routes } from "@/config";
import authService from "@/services/auth.service";
import { toastSuccess } from "@/utils/toast";
import { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

type ErrorState = {
  email?: string;
};

export default function ForgotPasswordRoute() {
  const [input, setInput] = useState("");
  const [errors, setErrors] = useState<ErrorState>({});
  const navigate = useNavigate();
  const forgotPassword = async (email: string) => {
    try {
      await authService.forgotPassword(email);
      toastSuccess("OTP đã được gửi đến email của bạn");
      navigate(`${routes.AUTH.RESET_PASSWORD}?email=${input}`);
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 400) {
        setErrors({
          email: "Email không tồn tại. Vui lòng kiểm tra lại",
        });
      }
      console.log(err);
    }
  };

  const validateInputs = () => {
    const newErrors: ErrorState = {};

    if (!input.trim()) {
      newErrors.email = "Email không được để trống";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input)) {
        newErrors.email = "Email chưa đúng định dạng";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateInputs()) return;
    await forgotPassword(input);
  };

  const handleCancel = () => {
    navigate(routes.AUTH.SIGN_IN);
  };

  return (
    <form
      className="justify-center items-center flex h-screen"
      onSubmit={handleSubmit}
      noValidate
    >
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Nhập Email Của Bạn</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              value={input}
              onChange={handleChangeInput}
            />
            {errors?.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="grid grid-cols-2 gap-4">
          <Button variant="outline" type="button" onClick={handleCancel}>
            Huy
          </Button>
          <Button type="submit">Tiep Tuc</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
