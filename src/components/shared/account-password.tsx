import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import InputOTPPattern from "@/app/routes/auth/Input-otp-pattern";
import { PasswordInput } from "./password-input";
import { FormEvent, useState } from "react";
import { routes } from "@/config";
import authService from "@/services/auth.service";
import { removeAccessToken } from "@/lib/api-client";
import { useNavigate } from "react-router-dom";
import { UserRole } from "@/common/enums";
import useAuth from "@/hooks/useAuth";
import useUser from "@/hooks/useUser";

type ErrorState = {
  password?: string;
  code?: string;
};

export default function AccountPassword() {
  const [auth, setAuth] = useAuth();
  const [user, setUser] = useUser();

  const [newPassword, setNewPassword] = useState("");
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState<ErrorState>({});
  const navigate = useNavigate();

  const validateInputs = () => {
    const newErrors: ErrorState = {};

    if (!code.trim()) {
      newErrors.code = "OTP không được để trống";
    } else if (code.trim().length !== 6) {
      newErrors.code = "OTP gồm 6 ký tự";
    }

    if (!newPassword.trim()) {
      newErrors.password = "Mật khẩu không được để trống";
    } else if (newPassword.trim().length < 6) {
      newErrors.password = "Mật khẩu phải tối thiểu 6 ký tự";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const resetPassword = async () => {
    if (user)
      try {
        await authService.resetPassword({
          email: user?.email,
          newPassword: newPassword,
          code: code,
        });
        await authService.logOut();
        setAuth(null);
        removeAccessToken();
        navigate(routes.AUTH.SIGN_IN);
      } catch (err) {
        console.log(err);
      }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateInputs()) return;
    await resetPassword();
  };

  const handleCancel = () => {
    setCode("");
    setNewPassword("");
  };

  return (
    <form
      className="justify-center items-center flex h-full"
      onSubmit={handleSubmit}
      noValidate
    >
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Đổi Mật Khẩu</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="otp">OTP</Label>
            <div className="mx-auto">
              <InputOTPPattern value={code} onChange={setCode} />
            </div>
            {errors?.code && (
              <p className="text-red-500 text-xs">{errors.code}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <PasswordInput
              id="password"
              name="password"
              placeholder="Mật khẩu"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {errors?.password && (
              <p className="text-red-500 text-xs">{errors.password}</p>
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
