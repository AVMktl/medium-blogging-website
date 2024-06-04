import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

export const Redirect = () => {
    const [countDown, setCountDown] = useState(5);
    
    const navigate = useNavigate();
    useEffect(()=>{
        const countDownTimer = setInterval(()=>{
            setCountDown(countDown => countDown - 1);
        }, 1000)

        const timer = setTimeout(() => {
            navigate("/signup");
        }, 5000);

        return ()=>{
            clearTimeout(timer);
            clearInterval(countDownTimer);
        }
    },[])

    return (
        <div className="bg-slate-300 h-screen w-screen flex justify-center items-center font-semibold text-xl">
            You will be redirect to SignUp page in {countDown} seconds.
        </div>
    )
}