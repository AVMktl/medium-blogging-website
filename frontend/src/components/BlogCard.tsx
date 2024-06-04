import { Link } from "react-router-dom";
import { Avatar } from "./Avatar"
import HTMLReactParser from "html-react-parser/lib/index";

interface CardInput {
    authorName: string;
    publishDate: string,
    title: string,
    description: string,
    id: string
}

export const BlogCard = ({id, authorName, publishDate, title, description}: CardInput) => {
    return (
        
            <div className="p-2 flex flex-col items-center text-left ">
                <div className="w-11/12 lg:w-2/4 border-b-2 py-4">
                    <Link to={`/blog/${id}`}>
                        <div className="flex justify-start items-center gap-2 pb-2">
                            <div className="">
                                <Avatar initials={authorName.split(" ")[0].slice(0,1).toUpperCase()}/>
                            </div>
                            <div>
                                <span className="font-semibold">{authorName}</span> &bull; <span className="text-slate-500">{publishDate}</span>
                            </div>                                                                          
                        </div>
                        <div className="">
                            <div className="font-bold text-xl pb-1">
                                {title}
                            </div>
                            <div className="text-slate-600 font-serif text-base font-normal">
                                {HTMLReactParser(description.length >= 200 ? description.slice(0, 200) + "..." : description)}
                            </div> 
                            <div className="pt-4 pb-2 text-slate-500">
                                {Math.ceil(description.length/300)} minute{Math.ceil(description.length/300) == 1 ? "" : "(s)"} read
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        
    )
}