import { useState } from "react"
import { TextEditor } from "../components/TextEditor"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../config";

export const Publish = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    async function sendRequest(){
        try{
            axios.post(`${BACKEND_URL}/api/v1/blog`, {
                title,
                description
            }, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            }).then((res)=>{
                // console.log(res.data.id);
                toast.success("New Blog Published ! 🎉🎉")
                navigate("/blog/" + res.data.id);
            })
        }catch(e){
            toast.error("Something went wrong !")
        }
    }

    return(
        <div>
            <Appbar/>
            <div className="flex justify-center items-center mt-12 h-full">
                <div className="w-3/5">
                    <div className="pb-8">
                        <input type="text" value={title} onChange={(e)=>{
                            setTitle(e.target.value)
                        }} placeholder="Title..." className="text-slate-800 font-serif font-semibold w-full text-3xl p-4 border-l-4 border-slate-700 focus:outline-none" />
                    </div>
                    <div className="h-3/6">
                        <TextEditor value={description} setValue={setDescription}/>
                    </div>
                    <div className="mt-4">
                        <button type="button" onClick={sendRequest} className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Publish</button>
                    </div>
                </div>
            </div>
        </div>
    )
}