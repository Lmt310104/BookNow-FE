import { Outlet } from "react-router-dom";
import LogoImage from "../../assets/logo.svg"

function AuthLayout() {
    return (
        <>
            <div className="flex justify-center">
                <div style={{color:"#ee4d2d", height: "42px"}}>
                    <img src={LogoImage} alt="logo" />
                </div>
                <h1>Đăng nhập</h1>
            </div>
            <div>
                <Outlet />
            </div>
        </>
    )
}

export default AuthLayout;