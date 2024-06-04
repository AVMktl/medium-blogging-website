import { useState } from "react"
import { Button } from "./Button"
import { Heading } from "./Heading"
import { LabeledInput } from "./LabeledInput"
import { Subheading } from "./Subheading"
import { SignInInput } from "@avmktl25/common"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { BACKEND_URL } from "../config"

export const SigninAuth = ({setLoading}: {setLoading: any}) => {
    const navigate = useNavigate();

    const [postInput, setPostInput] = useState<SignInInput>({
        email: "",
        password: ""
    })

    async function sendRequest(){
        try{
            setLoading(true);
            const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, postInput);
            // console.log(res.data);
            setLoading(false);
            localStorage.setItem("token", "Bearer " + res.data.jwt);
            navigate("/blogs");
            toast.success("Welcome back!")
        }catch(e: any){
            setLoading(false);
            // console.log(e);
            toast.error(e.response.data.message);
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div>
                <div className="text-center mx-12 mb-6">
                    <Heading titleInput="Welcome"/>
                    <Subheading titleInput="Don't have an account?" forwardLink="/signup" forwardLinkName="Signup"/>
                </div>
                <div>
                    <LabeledInput label="email" placeholder="lakshya@gmail.com" onChange={(e)=>{
                        setPostInput((x)=>({
                            ...x,
                            email: e.target.value
                        }))
                    }}/>
                    <LabeledInput label="password" placeholder="password" type="password" onChange={(e)=>{
                        setPostInput((x)=>({
                            ...x,
                            password: e.target.value
                        }))
                    }}/>
                </div>
                <Button label="Signin" onClick={sendRequest}/>
            </div>
        </div>
    )
}