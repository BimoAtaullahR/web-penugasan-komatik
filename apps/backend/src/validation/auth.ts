import { z } from "zod";
import { ValidationError } from "../middleware/errors";

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export type LoginPayload = z.infer<typeof loginSchema>;

export const parseLoginPayload = (input: unknown): LoginPayload => {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) {
    throw new ValidationError(
      "Validation failed",
      parsed.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      }))
    );
  }

  return parsed.data;
};
