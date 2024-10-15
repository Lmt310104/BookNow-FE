import { api } from "@/lib/api-client"

export type VerificationEmailInput = {
    token: string;
}
export const verificationEmail = (data: VerificationEmailInput) => {
    return api.post("auth/verify-email", data)
}