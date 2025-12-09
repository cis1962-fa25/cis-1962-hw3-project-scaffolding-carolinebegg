import { z } from "zod";

// Forbidden toppings chosen for the assignment requirement
const FORBIDDEN_TOPPINGS = new Set([
  "plastic",
  "glass",
  "cardboard",
  "soap",
  "staples",
]);

// toppings: optional string[]
// must not include forbidden toppings
const toppingsSchema = z
  .array(
    z
      .string()
      .trim()
      .min(1, { message: "toppings cannot be empty" }),
  )
  .optional()
  .superRefine((toppings, ctx) => {
    if (!toppings) {
      return;
    }
    const invalid = toppings.filter((topping) =>
      FORBIDDEN_TOPPINGS.has(topping.toLowerCase()),
    );

    if (invalid.length > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Forbidden toppings: ${invalid.join(", ")}`,
      });
    }
  });

// pizza schema required by assignment
const pizzaSchema = z.object({
  size: z
    .number()
    .int({ message: "size must be a whole number" })
    .positive({ message: "size must be greater than 0" }),
  crust: z.enum(["normal", "stuffed"]),
  isDeepDish: z.boolean().optional().default(false),
  toppings: toppingsSchema,
});

export type Pizza = z.output<typeof pizzaSchema>;

export interface PizzaValidationSuccess {
  isPizza: true;
  pizza: Pizza;
}

export interface PizzaValidationFailure {
  isPizza: false;
  errors: string[];
}

// discriminated union required by rubric
export type PizzaValidationResult =
  | PizzaValidationSuccess
  | PizzaValidationFailure;

// Zod v4 issue.path type handling
type IssuePath = import("zod").ZodIssue["path"];

const formatIssuePath = (path: IssuePath): string =>
  path.length > 0 ? path.map(String).join(".") : "pizza";

// exported validation function taking unknown
export const validatePizza = (input: unknown): PizzaValidationResult => {
  const outcome = pizzaSchema.safeParse(input);

  if (outcome.success) {
    return { isPizza: true, pizza: outcome.data };
  }

  const errors = outcome.error.issues.map(
    (issue) => `${formatIssuePath(issue.path)}: ${issue.message}`,
  );

  return { isPizza: false, errors };
};

// export forbidden toppings in case user wants them
export const forbiddenToppings = Object.freeze(
  Array.from(FORBIDDEN_TOPPINGS.values()),
);
