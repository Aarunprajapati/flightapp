import * as z from 'zod'

export const formSchema = z.object({
    route:z.object({
        oneway:z.string(),
        roundtrip:z.string(),
    }),
    location: z.string().min(2,"must be 2 characters").max(20),
    onward: z.date(),
    return: z.date(),
    travells:z.object({
        adults: z.number().min(1).max(10),
        children: z.number().min(0).max(10),
    })

})