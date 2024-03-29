import * as z from 'zod'


export const formSchema = z.object({
    email: z.string().email({
        message: 'Invalid email address',
    }),
    password: z.string().min(1,{
        message:"Password is required",
    }),
})


export const registerSchema = z.object({
    name: z.string().min(1,{
        message:"Name is required",
    }),
    email: z.string().email({
        message: 'Invalid email address',
    }),
    password: z.string().min(6,{
        message:"Password must be at least 6 characters",
    }),
    
})