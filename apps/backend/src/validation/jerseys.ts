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

const jerseyCreateSchema = z.object({
  clubName: z.string().min(1),
  league: z.string().min(1),
  country: z.string().min(1),
  season: z.string().min(1),
  kitType: z.string().min(1),
  issueType: z.string().min(1),
  brand: z.string().min(1),
  gender: z.string().min(1),
  price: z.number().int().positive(),
  description: z.string().min(1),
  image: z.string().min(1),
  rating: z.number().min(0).max(5),
  isNew: z.boolean(),
  stock: z.number().int().min(0),
});

const jerseyUpdateSchema = jerseyCreateSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  { message: "At least one field is required" }
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
export type JerseyCreatePayload = z.infer<typeof jerseyCreateSchema>;
export type JerseyUpdatePayload = z.infer<typeof jerseyUpdateSchema>;

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

export const parseJerseyCreatePayload = (input: unknown): JerseyCreatePayload => {
  const parsed = jerseyCreateSchema.safeParse(input);
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

export const parseJerseyUpdatePayload = (input: unknown): JerseyUpdatePayload => {
  const parsed = jerseyUpdateSchema.safeParse(input);
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
