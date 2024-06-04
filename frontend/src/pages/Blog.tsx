import { Appbar } from "../components/Appbar";
import { Avatar } from "../components/Avatar";
import { useBlogs } from "../hooks/UseBlog"
import { useParams } from "react-router-dom";
import HTMLReactParser from "html-react-parser/lib/index";

export const Blog = () => {
    const {id} = useParams();
    // console.log(id);
    const {loading, blog} = useBlogs({id: id || ""});

    return (
        <div>
            <Appbar/>
            {
                loading == true ?
                
                <div role="status" className="animate-pulse overflow-y-hidden">
                    <div className="grid grid-cols-12">
                        <div className="col-span-8 p-20 ml-10">
                            <div className="font-bold text-5xl"><div className="h-12 bg-gray-200 rounded-full w-4/5 mb-4"></div></div>
                            <div className="font-semibold text-slate-400 text-base py-2"><div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div></div>
                            <div className="pt-2 font-semibold text-slate-500" >
                                <div className="h-2.5 bg-gray-200 rounded-full w-4/5 mb-4"></div>
                                <div className="h-2.5 bg-gray-200 rounded-full w-4/5 mb-4"></div>
                                <div className="h-2.5 bg-gray-200 rounded-full w-4/5 mb-4"></div>
                                <div className="h-2.5 bg-gray-200 rounded-full w-4/5 mb-4"></div>
                                <div className="h-2.5 bg-gray-200 rounded-full w-4/5 mb-4"></div>
                                <div className="h-2.5 bg-gray-200 rounded-full w-4/5 mb-4"></div>
                                <div className="h-2.5 bg-gray-200 rounded-full w-4/5 mb-4"></div>
                                <div className="h-2.5 bg-gray-200 rounded-full w-4/5 mb-4"></div>
                                <div className="h-2.5 bg-gray-200 rounded-full w-4/5 mb-4"></div>
                            </div>
                            {/* <div className="pt-2 font-semibold text-slate-500"dangerouslySetInnerHTML={{ __html: blog?.description || "" }}/> */}
                        </div>
                        
                        <div className="col-span-4 border-l h-full">
                            <div className="p-20 sticky top-0">
                                <div className="font-semibold"><div className="h-2.5 bg-gray-200 rounded-full w-24 mb-4"></div></div>
                                <div className="flex justify-around items-center gap-4 pt-2">
                                    <div><div className="bg-gray-200 rounded-full h-10 w-10 mb-4"></div></div>
                                    <div className="text-left">
                                        <div className="font-bold text-2xl pb-1"><div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div></div>
                                        <div className="font-semibold text-slate-500">
                                            <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
                                            <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>     
                    <span className="sr-only">Loading...</span>
                </div>
                : 
                <div className="grid grid-cols-12">
                    <div className="col-span-8 p-20 ml-10">
                        <div className="font-bold text-5xl">{blog?.title}</div>
                        <div className="font-semibold text-slate-400 text-base py-2">Posted on August 24, 2023</div>
                        <div className="pt-2 font-semibold text-slate-500" >{HTMLReactParser(blog?.description || "")}</div>
                        {/* <div className="pt-2 font-semibold text-slate-500"dangerouslySetInnerHTML={{ __html: blog?.description || "" }}/> */}
                    </div>
                    
                    <div className="col-span-4 border-l min-h-screen">
                        <div className="p-20 sticky top-0">
                            <div className="font-semibold">Author</div>
                            <div className="flex justify-around items-center gap-4 pt-2">
                                <div><Avatar initials={blog?.author.name.slice(0,1).toUpperCase() || ""}/></div>
                                <div className="text-left">
                                    <div className="font-bold text-2xl pb-1">{blog?.author.name}</div>
                                    <div className="font-semibold text-slate-500">I am an Blogger from from India. #Travelling #ComputerScience</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}