import * as z from 'zod'

export const formSchema = z.object({
    route: z.string(),
    // dates:z.string(),
    location: z.string(),
    locationR: z.string(),
    adults: z.number(),
    children: z.number(),
  

})