import { Gender } from "@/common/enums";

export interface User {
  fullName: string;
  password: string;
  email: string;
  gender: Gender;
  birthday: Date | null;
}

