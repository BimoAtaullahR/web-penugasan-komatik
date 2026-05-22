import { z } from "zod";
import { ValidationError } from "../middleware/errors";

const coerceString = (value: unknown) => {
  if (Array.isArray(value)) return value[0];
  if (value === undefined || value === null) return undefined;
  if (typeof value === "string") return value.trim();
  return String(value);
};

const coerceNumber = (value: unknown) => {
  if (Array.isArray(value)) return value[0];
  if (value === undefined || value === null || value === "") return undefined;
  const num = Number(value);
  return Number.isNaN(num) ? value : num;
};

const optionalString = z.preprocess(coerceString, z.string().min(1)).optional();

const limitSchema = z.preprocess(
  coerceNumber,
  z.number().int().min(1).max(100)
);

const offsetSchema = z.preprocess(
  coerceNumber,
  z.number().int().min(0)
);

export const jerseyListQuerySchema = z.object({
  limit: limitSchema.default(10),
  offset: offsetSchema.default(0),
  search: optionalString,
  league: optionalString,
  kitType: optionalString,
  issueType: optionalString,
  brand: optionalString,
});

export type JerseyListQuery = z.infer<typeof jerseyListQuerySchema>;

const jerseyIdSchema = z.preprocess(
  coerceNumber,
  z.number().int().positive()
);

export const parseJerseyListQuery = (input: unknown): JerseyListQuery => {
  const parsed = jerseyListQuerySchema.safeParse(input);
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

export const parseJerseyId = (input: unknown): number => {
  const parsed = jerseyIdSchema.safeParse(input);
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
