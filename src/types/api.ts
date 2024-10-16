export type Meta = {
  page: number;
  total: number;
  totalPages: number;
};
export type AuthResponse = {
  access_token: string;
  user_id: string;
};
export type Entity<T> = {
  [K in keyof T]: T[K];
};
export type User = Entity<{
  id: string;
  email?: string;
  phone?: string;
  role: string;
}>;
