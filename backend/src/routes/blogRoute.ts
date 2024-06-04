import { Hono } from "hono";
import { Prisma, PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import authMiddleWare from "../middleware";
import {blogCreateInput, blogUpdateInput} from "@avmktl25/common";

const blog = new Hono<{
	Bindings: {
		DATABASE_URL: string
        JWT_SECRET: string
	},
    Variables:{
        userId: string
    }
}>();


blog.post("/", authMiddleWare, async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const validation = blogCreateInput.safeParse(body);

    if(!validation.success){
        c.status(411);
        return c.json({message: (validation.error.issues[0].message)})
    }

    try{
        const res = await prisma.post.create({
            data: {
                title: body.title,
                description: body.description,
                authorId: c.get('userId'),
            }
        })
        return c.json({
            id: res.id,
            message: "blog Added"
        })
    }catch(e){
        c.status(411);
        return c.json({
            message: "Something went wrong"
        })
    }
})

blog.put("/", authMiddleWare, async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const validation = blogUpdateInput.safeParse(body);

    if(!validation.success){
        c.status(411);
        return c.json({message: (validation.error.issues[0].message)})
    }

    try{
        const res = await prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                description: body.description,
            }
        })
        return c.json({
            id: res.id,
            message: "blog Edited"
        })
    }catch(e){
        c.status(411);
        return c.json({
            message: "Something went wrong"
        })
    }
})

blog.get("/bulk", async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try{
        const res = await prisma.post.findMany({
            select: {
                id: true,
                title: true,
                description: true,
                author: {
                    select: {
                        id: true,
                        name: true, // Adjust fields as necessary
                    }
                }
            }
        });
        return c.json({
            blogs: res
        })
    }catch(e){
        c.status(411);
        return c.json({
            message: "Something went wrong"
        })
    }
})

blog.get("/:id", async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const param = c.req.param("id");

    try{
        const res = await prisma.post.findFirst({
            where: {
                id: param
            },
            select: {
                title: true,
                description: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return c.json({
            blog: res
        })
    }catch(e){
        c.status(411);
        return c.json({
            message: "Something went wrong"
        })
    }
})

export default blog;