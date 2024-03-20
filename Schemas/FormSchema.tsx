import * as z from 'zod'

export const formSchema = z.object({
    route: z.string({
    }),
    dates:z.date(),
    dateR:z.date(),
    location: z.string(),
    locationR: z.string(),
    adults: z.string(),
    children: z.string(),
})