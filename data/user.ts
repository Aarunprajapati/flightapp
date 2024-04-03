import { formSchema } from "@/Schemas"
import axiosinstance from "@/axiosinstance"
import axios from "axios"
import { z } from "zod"



export const getUserByEmail = async (email:string) => {
    try {
            
            const res = await axiosinstance.post('/login', email)
            return res.data
        
    } catch (error) {
        return null
    }
}
// export const getUserById = async (id: string) => {
//     try {
//         const user = await db.user.findUnique({
//             where: {
//                 id
//             }
//         })
//         return user
    
// } catch (error) {
//     return null
// }
// }