import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export interface BlogInterface {
    title: string,
    description: string,
    author: {
        name: string
    }
}

export const useBlogs = ({id}: {id: string}) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<BlogInterface>();

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then((res)=>{
            setBlog(res.data.blog);
            setLoading(false);
        })
    }, []);

    return {loading, blog};
}