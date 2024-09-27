import {z} from "zod"
import { AuthResponse } from "@/types/api";
import { api } from "@/lib/api-client"

export const signUpByEmailSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, {
        message: "Username must be at least 8 characters.",
    }), 
    role: z.string(),   
})
export type SignUpByEmailInput = z.input<typeof signUpByEmailSchema>
export const signUpByEmail = (
    data: SignUpByEmailInput,
): Promise<AuthResponse> => {
    return api.post("/auth/sign-up", data);
}