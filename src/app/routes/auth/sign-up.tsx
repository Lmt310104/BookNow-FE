import { AuthLayout } from "@/components/layouts/auth-layout"

export const SignUpRoute = () => {
    return (
    <AuthLayout title = "Sign up into your account">
        <h1>Sign Up</h1>
        <button onClick={() => {
                // navigate('/app')
        }}>Sign Up</button>
    </AuthLayout>
    )
}