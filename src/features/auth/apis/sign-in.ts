import { AuthResponse, User } from "@/types/api";
import { api } from "@/lib/api-client";
import {z} from "zod"

export const getUser = async (): Promise<User> => {
    const response = await api.get("/auth/get-me");
    return response.data;
}
export const signInByEmailSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, {
        message: "Username must be at least 8 characters.",
    })
})
export type SignInByEmailInput = z.input<typeof signInByEmailSchema>
export const signInByEmail = async (
    data: SignInByEmailInput,
): Promise<AuthResponse> => {
    return (await api.post("/auth/sign-in/email", data)).data;
}