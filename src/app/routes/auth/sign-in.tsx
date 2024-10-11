import { AuthLayout } from "@/components/layouts/auth-layout"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignInByEmailInput, signInByEmailSchema } from "@/features/auth/apis/sign-in"
import { Link, useNavigate } from "react-router-dom"
import { routes } from "@/config"
import GoogleLogo from "@/assets/google.svg"
import FacebookLogo from "@/assets/facebook.svg"
import SignInForm from "@/features/auth/components/sign-in-form"


export const SignInRoute = () => {
    const navigate = useNavigate();
    return (
        <AuthLayout title="Sign in into your account">
            <div>
                <div>
                    <div>
                        <div></div>
                        <div>
                            <div>
                                <div>
                                    Đăng nhập
                                </div>
                                <div>
                                    <SignInForm onSuccess={() => navigate("/app",{replace: true})}/>
                                    <div>
                                        <Link to={routes.AUTH.FORGOT_PASSWORD}>Forgot password</Link>
                                    </div>
                                    <div>
                                        <div>
                                            <div></div>
                                            <span>hoặc</span>
                                            <div></div>
                                        </div>
                                        <div>
                                            <Button>
                                                <img src={GoogleLogo} alt="Google" />
                                                <span>Sign in with Google</span>
                                            </Button>
                                            <Button>
                                                <img src={FacebookLogo} alt="Facebook" />
                                                <span>Sign in with Facebook</span>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <span>Bạn mới biết tới BookNow</span>
                                        <Link to={routes.AUTH.SIGN_UP}>Sign up</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    )
}