// 'use server'
// import { formSchema } from '@/Schemas'
// import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
// import { AuthError } from 'next-auth'
// import { signIn } from '@/auth'
// import * as z from 'zod'

// export const login = async(values: z.infer<typeof formSchema>) => {
//     const validationCheck = formSchema.safeParse(values);
//     console.log("user",validationCheck)

//     if (!validationCheck.success) {
//         return {error: "Invalid fields"}
//     }

//     const {email, password} = validationCheck.data;
//     try {
//         await signIn("credentials", {
//             email,
//             password,
//             redirectTo:DEFAULT_LOGIN_REDIRECT
//         })
//     } catch (error) {
//         if( error instanceof AuthError){
//         switch(error.type){
//             case "CredentialsSignin":
//                 return {error: "InValid Credentials!"}
//             default: 
//                 return {error: "Something went wrong"}
//             }
//         }
//         throw error;
//     }
// }