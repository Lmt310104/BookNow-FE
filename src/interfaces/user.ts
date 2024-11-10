import { UserRole } from "@/common/enums";

export interface User {
  id: string;
  fullName: string;
  email: string;
  userRole: UserRole;
}
