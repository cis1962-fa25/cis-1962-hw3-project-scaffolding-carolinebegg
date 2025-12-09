# Pizza Validator

TypeScript + Zod utility for checking whether an arbitrary JSON object is a valid
pizza according to the CIS 1962 Homework 3 schema. The package exposes a single
`validatePizza` function and a CLI that accepts a JSON file path.

## Installation

```bash
npm install
```

To build the project:

```bash
npm run build
```

## Library Usage

```ts
import { validatePizza } from "cis-1962-hw3-project-scaffolding-carolinebegg";

const result = validatePizza({
  size: 14,
  crust: "normal",
  toppings: ["pepperoni", "mushrooms"],
});

if (result.isPizza) {
  console.log(result.pizza.crust); // normal
} else {
  console.error(result.errors);
}
```

## CLI Usage

Install locally and run:

```bash
npm install --global .
pizza-validator ./examples/valid-pizza.json
```

Or run via `npm exec` without installing globally:

```bash
npm exec -- pizza-validator --file ./examples/valid-pizza.json
```

The CLI prints why an input is invalid and handles missing or unreadable files
gracefully.

## Development Scripts

- `npm run build` – compile TypeScript to `dist/`
- `npm run test` – run the Jest test suite
- `npm run lint` – lint the project with ESLint
- `npm run format` – verify formatting with Prettier
- `npm run format:fix` – apply Prettier formatting

## Schema Summary

- `size`: positive whole number in inches
- `crust`: `"normal"` or `"stuffed"`
- `isDeepDish`: optional boolean (defaults to `false`)
- `toppings`: optional string array; must not include any forbidden toppings
  (`plastic`, `glass`, `cardboard`, `soap`, `staples`)

## Project Structure

- `src/index.ts` – `validatePizza` implementation
- `src/cli.ts` – command-line interface
- `tests/` – Jest unit tests
- `dist/` – generated output after running `npm run build`

## License

Released under the ISC License. See `LICENSE` for details.
