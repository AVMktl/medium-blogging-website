import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";

const authMiddleWare = createMiddleware(async(c, next)=>{
    let authToken = c.req.header("authorization");

    authToken = authToken?.split(" ")[1];
    if(!authToken){
        c.status(403);
        return c.json({
            messaage: "User is not Authorized"
        })
    }

    try{
        const response = await verify(authToken, c.env.JWT_SECRET);
        c.set("userId", response.id)
        await next();
    }catch(e){
        c.status(403);
        return c.json({
            message: "User is not Authorized" 
        })
    }
})

export default authMiddleWare;