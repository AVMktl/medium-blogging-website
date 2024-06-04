import { Oval } from "react-loader-spinner"
import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks/UseBlogs"

interface BlogInterface {
    id: string;
    title: string;
    description: string;
    author: {
        id: string;
        name: string;
    }
}

export const Blogs = () => {
    const blogs = useBlogs();

    return (
        <div className="h-screen">
            <Appbar />
            {blogs.loading == true ? 
                <div className="w-full flex justify-center h-2/5 align-bottom">
                    <div className="flex flex-col justify-end">
                        <Oval
                        visible={true}
                        height="80"
                        width="80"
                        color="#1B1B1B"
                        ariaLabel="oval-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        secondaryColor="#808080"
                        /> 
                    </div>
                </div>
                : 
                blogs.blogs.map((blog: BlogInterface)=>{
                    return(
                        <BlogCard key={blog.id} id={blog.id} authorName={blog.author.name} publishDate="23 dec, 2023" title={blog.title} description={blog.description}/>
                    )
                })
            }
        </div>
    )
}