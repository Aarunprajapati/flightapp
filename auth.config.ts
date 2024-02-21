// import bcrypt from "bcryptjs";

// import type { NextAuthConfig } from "next-auth"
// import Credentials from "next-auth/providers/credentials"
// import { formSchema } from "@/Schemas"
// import { getUserByEmail } from "@/data/user"
// import Google from "next-auth/providers/google"
// import GitHub from "next-auth/providers/github"
 

// export default {  
//   providers:[
//     Google({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     GitHub({
//       clientId: process.env.GITHUB_CLIENT_ID,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET
//     }),
//     Credentials({
//       async authorize(credentials){
//           const validateField = formSchema.safeParse(credentials)
          
//           if(validateField.success){
//           const {email, password} = validateField.data;
//           const user = await getUserByEmail(email);
//           if(!user || !user.password) return null;
//           const passwordMatch = await bcrypt.compare(password, user.password)
//             if(passwordMatch) return user;
//           }
//           return null
//       }
//     })
// ],
// } satisfies NextAuthConfig