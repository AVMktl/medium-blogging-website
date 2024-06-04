import z, { string } from "zod";

const signUpInput = z.object({
    email: z.string({
        invalid_type_error: "Invalid name",
        required_error: "Email is required"
    }).email({message: "Not a valid email"}),
    password: z.string({
        invalid_type_error: "Invalid password",
        required_error: "Password is required"
    }).min(6, {message: "Password should be more than 6 characters"}),
    name: z.string().optional()
})


const signInInput = z.object({
    email: z.string({
        invalid_type_error: "Invalid name",
        required_error: "Email is required"
    }).email({message: "Not a valid email"}),
    password: z.string({
        invalid_type_error: "Invalid password",
        required_error: "Password is required"
    }).min(6, {message: "Password should be more than 6 characters"}),
})


const blogCreateInput = z.object({
    title: z.string({message: "Title Required"}),
    description: z.string({message: "Description Required"}),
})


const blogUpdateInput = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
})


type SignUpInput = z.infer<typeof signUpInput>;

type SignInInput = z.infer<typeof signInInput>;

type BlogCreateInput = z.infer<typeof blogCreateInput>

type BlogUpdateInput = z.infer<typeof blogUpdateInput>

export {signInInput, signUpInput, blogCreateInput, blogUpdateInput, SignInInput, SignUpInput, BlogCreateInput, BlogUpdateInput}