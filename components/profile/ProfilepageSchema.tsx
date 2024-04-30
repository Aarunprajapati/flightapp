import { z } from "zod";

export const phonenumberSchema = z.object({
  name: z.string(),
  dob: z.string(),
  gender: z.string(),
  phoneNumber: z.string(),
});
