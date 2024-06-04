import { Link } from "react-router-dom"

export const Subheading = ({titleInput, forwardLink, forwardLinkName}: {titleInput: string, forwardLink: string, forwardLinkName: string}) =>{
    return(
        <div className="text-slate-500">
            {titleInput}
            <Link className="pl-2 underline" to={forwardLink}>{forwardLinkName}</Link>
        </div>
    )
}