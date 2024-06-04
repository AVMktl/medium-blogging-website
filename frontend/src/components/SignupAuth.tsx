import { useState } from "react"
import { Button } from "./Button"
import { Heading } from "./Heading"
import { LabeledInput } from "./LabeledInput"
import { Subheading } from "./Subheading"
import { SignUpInput } from "@avmktl25/common"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { BACKEND_URL } from "../config"

export const SignupAuth = ({setLoading}: {setLoading: any}) => {
    const navigate = useNavigate();
    const [postInput, setPostInput] = useState<SignUpInput>({
        email: "",
        name: "A",
        password: ""
    });

    async function sendRequest(){
        try{
            setLoading(true);
            const res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, postInput);
            setLoading(false);
            // console.log(res.data);
            toast.success("Account Created");
            localStorage.setItem("token", "Bearer " + res.data.jwt);
            navigate("/blogs");
        }catch(error: any){
            console.log(error)
            toast.error(error.response.data.message);
            setLoading(false);
        }
    }

    return (
        <div>
            <div className="flex justify-center items-center h-screen">
                <div>
                    <div className="text-center mx-12 mb-6">
                        <Heading titleInput="Create an account"/>
                        <Subheading titleInput="Already have an account?" forwardLink="/signin" forwardLinkName="Login"/>
                    </div>
                    <div>
                        <LabeledInput label="Username" placeholder="Lakshya Gupta" onChange={(e)=>{
                            setPostInput((x)=>({
                                ...x,
                                name: e.target.value
                            }))
                        }}/>
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
                    <Button label="Signup" onClick={sendRequest}/>
                </div>
            </div>
        </div>
    )
}