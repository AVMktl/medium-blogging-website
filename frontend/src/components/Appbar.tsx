import { useEffect, useState } from "react"
import { Avatar } from "./Avatar"
import axios from "axios"
import { Link, useLocation } from "react-router-dom"
import logo from "../assets/feather.png"
import { BACKEND_URL } from "../config"

export const Appbar = () => {

    const {pathname} = useLocation();

    const [userName, setUserName] = useState(" ");

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/user/me`, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }).then((res)=>{
            setUserName(res.data.name);
        })
    }, [])

    return (
        <div className="flex justify-between shadow-sm p-5 px-20 items-center border-b-2 sticky top-0 bg-white z-10">
            <Link to="/blogs" >
                <div className="font-bold text-2xl flex gap-2 items-center">
                    <div ><img className="h-7" src={logo} alt="" /></div>
                    <div>Medium</div>
                </div>
            </Link>
            <div className="flex gap-4 justify-center items-center">
                {
                    pathname !== "/publish" ? 
                    <Link to="/publish" className="flex justify-center items-end flex-col">
                        <button type="button" className="mt-2 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">New</button>
                    </Link>
                    : 
                    <div className="mt-2 p-6"></div>
                }
                <div>
                    <Avatar initials={userName.split(" ")[0].slice(0,1).toUpperCase()} />
                </div>
            </div>
        </div>
    )
}