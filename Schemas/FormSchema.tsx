import * as z from 'zod'

export const formSchema = z.object({
    route: z.string(),
    // dates:z.object({
    //     from:z.string(),
    //     to:z.string(),
    // }),
    // location: z.object({
    //     from:z.string(),
    //     to:z.string()
    // }),
    //  adults: z.number(),
    // children: z.number(),
  

})