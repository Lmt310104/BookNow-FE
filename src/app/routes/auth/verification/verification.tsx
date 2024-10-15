import { Button } from "@/components/ui/button";
import { MdMarkEmailUnread } from "react-icons/md";
import { Link } from "react-router-dom";
export const VerificationRoute = () => {
    return (
        <div className="flex flex-col justify-center items-center h-[100vh] gap-10">
            <MdMarkEmailUnread size={48} color="#4caf50"/>
            <span className="text-2xl text-[#4caf50] font-bold">Account verification</span>
            <span className="font-bold">You're already have a BookNow account</span>
            <div className="flex flex-col items-center gap-5">
                <span>To continue:</span>
                <Button className="h-10"><Link to="success">Verify your email here</Link></Button>
            </div>
        </div>
    )
}