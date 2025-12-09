import { validatePizza } from "../src/index";

describe("validatePizza", () => {
  it("returns the pizza when the input is valid", () => {
    const result = validatePizza({
      size: 14,
      crust: "normal",
      toppings: ["pepperoni", "mushrooms", "onions"],
    });

    expect(result.isPizza).toBe(true);
    if (result.isPizza) {
      expect(result.pizza.size).toBe(14);
      expect(result.pizza.isDeepDish).toBe(false);
      expect(result.pizza.toppings).toEqual([
        "pepperoni",
        "mushrooms",
        "onions",
      ]);
    }
  });

  it("reports validation issues when required fields are missing", () => {
    const result = validatePizza({ crust: "normal" });

    expect(result.isPizza).toBe(false);
    if (!result.isPizza) {
      expect(result.errors).toEqual(
        expect.arrayContaining([
          // matches Zod v4 message:
          expect.stringContaining("Invalid input: expected number"),
        ]),
      );
    }
  });

  it("rejects pizzas that contain forbidden toppings", () => {
    const result = validatePizza({
      size: 12,
      crust: "stuffed",
      toppings: ["pepperoni", "glass"],
    });

    expect(result.isPizza).toBe(false);
    if (!result.isPizza) {
      expect(result.errors).toEqual(
        expect.arrayContaining([
          expect.stringContaining("Forbidden toppings: glass"),
        ]),
      );
    }
  });
});
