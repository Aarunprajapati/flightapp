import * as z from 'zod'

export const formSchema = z.object({
    // route: z.string().min(2,{
    //     message:'Please enter a valid route'
    // }),
    route:z.string().min(3).max(20),
    dates:z.object({
        from:z.string(),
        to:z.string(),
    }),
    location: z.object({
        from:z.string(),
        to:z.string()
    }),
     adults: z.number(),
    children: z.number(),
  

})