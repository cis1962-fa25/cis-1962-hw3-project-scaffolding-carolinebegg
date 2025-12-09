# 🍕 Pizza Validator

A TypeScript + Zod utility for validating whether an arbitrary object is a valid pizza according to the CIS 1962 Homework 3 schema.  
This package provides:

- A type-safe `validatePizza` function that validates unknown input  
- A CLI tool (`pizza-validator`) that accepts a path to a JSON file and reports whether it is a valid pizza

Both the library and CLI follow the same Zod-powered schema for pizza validation.

---

## 📦 Installation

To install dependencies for local development:

```bash npm install```

### To Build

```npm run build```

## 📚 Library Usage (as an npm dependency)

This example demonstrates how another project would import and use your package.

```
import { validatePizza } from "cis-1962-hw3-project-scaffolding-carolinebegg";

const result = validatePizza({
  size: 14,
  crust: "normal",
  toppings: ["pepperoni", "mushrooms"],
});

if (result.isPizza) {
  // TypeScript now knows that `result.pizza` exists
  console.log(result.pizza.crust); // normal
} else {
  // TypeScript now knows that `result.errors` exists
  console.error(result.errors);
}
```

The validator uses Zod to ensure the pizza matches the required schema and returns a discriminated union:

- `{ isPizza: true, pizza: Pizza }`
- `{ isPizza: false, errors: string[] }`

This gives fully type-safe narrowing without manual casting.

## 🖥️ CLI Usage

After building the project, you can use the CLI tool to validate JSON files.

### Option 1 — Install the package globally

```npm install --global .```
```pizza-validator ./examples/valid-pizza.json```

### Option 2 — Run without global installation

```
npm exec -- pizza-validator --file ./examples/valid-pizza.json

# or

npm exec -- pizza-validator ./examples/valid-pizza.json
```

### Example Output (valid pizza)

#### Pizza is valid ✅

{
  "size": 12,
  "crust": "stuffed",
  "isDeepDish": false,
  "toppings": [
    "pepperoni",
    "mushrooms",
    "onions"
  ]
}

### Example Output (invalid pizza)

#### Pizza is invalid ❌

- size: size must be greater than 0
- crust: Invalid option: expected one of "normal"|"stuffed"
- toppings: Forbidden toppings: glass, plastic

### Missing or unreadable file

```Failed to read "examples/nope.json": ENOENT: no such file or directory```


The CLI prints clear validation errors and gracefully handles missing input files.

## 🔎 Pizza Schema Definition

The validator enforces the following rules:

### Required Fields

| Field   | Type   | Description                                             |
| ------- | ------ | ------------------------------------------------------- |
| `size`  | number | Diameter in inches; must be a **positive whole number** |
| `crust` | string | Must be `"normal"` or `"stuffed"`                       |

### Optional Fields

| Field        | Type     | Default  | Description                             |
| ------------ | -------- | -------- | --------------------------------------- |
| `isDeepDish` | boolean  | `false`  | Whether the pizza is deep dish          |
| `toppings`   | string[] | *(none)* | Must **not** include forbidden toppings |

### Forbidden Toppings

This project chooses the following toppings as invalid:

- plastic
- glass
- cardboard
- soap
- staples
Any pizza containing forbidden toppings will fail validation with a detailed error.

## 🧪 Running Tests

This project uses Jest with ts-jest.

To run the test suite:

```npm test```


Included tests:

- 1 valid pizza case
- 2 invalid pizza cases:
  - Missing required fields
  Forbidden toppings

These directly satisfy the assignment rubric.

## Development Scripts

| Script               | Description                             |
| -------------------- | --------------------------------------- |
| `npm run build`      | Compile TypeScript to `dist/`           |
| `npm run test`       | Run Jest test suite                     |
| `npm run lint`       | Run ESLint with TypeScript rules        |
| `npm run format`     | Check Prettier formatting               |
| `npm run format:fix` | Automatically format code with Prettier |

## 📁 Project Structure

cis-1962-hw3-project-scaffolding-carolinebegg/
├── src/
│   ├── index.ts        # validatePizza implementation + Zod schema
│   └── cli.ts          # CLI entry point
├── tests/
│   └── pizzaValidator.test.ts
├── examples/
│   ├── valid-pizza.json
│   └── invalid-pizza.json
├── dist/               # compiled build output (ignored by git)
├── eslint.config.mjs   # ESLint configuration with custom rules
├── jest.config.js      # Jest configuration
├── tsconfig.json       # TypeScript configuration
├── README.md
├── LICENSE             # ISC License
└── AIAssignment.md


## 📜 License

Released under the ISC License.
See the LICENSE file for more information.