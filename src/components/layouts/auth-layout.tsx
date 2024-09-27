import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg"

type LayoutProps = {
    children: React.ReactNode;
    title: string;
}
export const AuthLayout = ({children, title}: LayoutProps) => { 
    return (
        <div>
            <div className="flex">
                <div className="flex">
                    <div className="flex">
                        <img src={Logo}/>
                        <h1>{title}</h1>
                    </div>
                    <Link to="/helps">Bạn cần giúp đỡ ?</Link>
                </div>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}