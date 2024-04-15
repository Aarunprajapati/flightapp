import * as z from 'zod';


export const bookschema =z.object({
    code:z.object({
        dial_code:z.string(),
        
    }),
    phone:z.string(),
    email:z.string()
})

const travelleSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    Gender: z.enum(['Male', 'Female', 'Other']),
    Nationality: z.string()
});

export { travelleSchema };