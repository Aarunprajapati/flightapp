import * as z from 'zod'

export const formSchema = z.object({
    select: z.string(),
    fromDate: z.string().optional().or(z.date().optional()),
    toDate: z.string().optional().or(z.date().optional()),
    location: z.string(),
    locationR: z.string(),
    adults: z.string(),
    bacche: z.string(),
})