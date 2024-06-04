import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from "hono/jwt";
import { signInInput, signUpInput } from "@avmktl25/common";
import authMiddleWare from "../middleware";

const user = new Hono<{
	Bindings: {
		DATABASE_URL: string
        JWT_SECRET: string
	},
    Variables: {
        userId : string
    }
}>();

user.post("/signup", async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const validation = signUpInput.safeParse(body);

    if(!validation.success){
        c.status(411);
        return c.json({message: (validation.error.issues[0].message)})
    }

    try{
        const foundUser = await prisma.user.findFirst({
            where: {
                email: body.email
            },
            select: {
                id: true
            }
        })
        if(foundUser){
            c.status(403)
            return c.json({message: "User already exists"})
        }

        const payload = await prisma.user.create({
            data: {
                email: body.email.toLowerCase(),
                password: body.password,
                name: body.name
            },
            select: {
                id: true,
            }
        })
        const token = await sign(payload, c.env.JWT_SECRET)
        await prisma.$disconnect();
        return c.json({jwt: token});
    }catch(e: any){
        await prisma.$disconnect();
        c.status(403)
        return c.json({message: "Something went wrong..."});
    }
})

user.get("/me", authMiddleWare, async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try{
        const res = await prisma.user.findFirst({
            where:{
                id: c.get('userId')
            },
            select:{
                id: true,
                name: true
            }
        })
        c.status(200);
        return c.json({id: res?.id, name: res?.name})
    }catch(e){
        await prisma.$disconnect();
        c.status(403)
        return c.json({message: "Something went wrong..."});
    }
})

user.post("/signin", async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const validation = signInInput.safeParse(body);

    if(!validation.success){
        c.status(411);
        return c.json({message: (validation.error.issues[0].message)})
    }

    try{
        const foundUser = await prisma.user.findFirst({
            where: {
                email: body.email,
            }
        })
        if(!foundUser){
            c.status(403)
            return c.json({message: "User not found"})
        }else if(foundUser.password != body.password){
            c.status(403)
            return c.json({message: "Incorrect password"});
        }else{
            c.status(200);
            const token = await sign({id: foundUser.id}, c.env.JWT_SECRET)
            return c.json({
                jwt: token
            })
        }
    }catch(e){
        await prisma.$disconnect();
        c.status(403)
        return c.json({message: "Something went wrong..."});
    }
})

export default user;
