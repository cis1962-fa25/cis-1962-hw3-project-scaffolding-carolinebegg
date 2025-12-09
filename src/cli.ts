#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import { parseArgs } from "node:util";
import { validatePizza } from "./index";

const printUsage = (): void => {
  console.error(
    "Usage: pizza-validator --file <path-to-json> | pizza-validator <path-to-json>",
  );
};

const run = async (): Promise<void> => {
  const { values, positionals } = parseArgs({
    options: {
      file: { type: "string", short: "f" },
    },
    allowPositionals: true,
  });

  const filePath = values.file ?? positionals[0];

  if (!filePath) {
    printUsage();
    process.exitCode = 1;
    return;
  }

  let rawContents: string;

  try {
    rawContents = await readFile(filePath, "utf8");
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to access the file.";
    console.error(`Failed to read "${filePath}": ${message}`);
    process.exitCode = 2;
    return;
  }

  let json: unknown;

  try {
    json = JSON.parse(rawContents);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Provided file is not valid JSON";
    console.error(`Failed to parse JSON from "${filePath}": ${message}`);
    process.exitCode = 2;
    return;
  }

  const result = validatePizza(json);

  if (result.isPizza) {
    console.log("Pizza is valid ✅");
    console.log(JSON.stringify(result.pizza, null, 2));
    process.exitCode = 0;
    return;
  }

  console.error("Pizza is invalid ❌");
  for (const issue of result.errors) {
    console.error(`- ${issue}`);
  }
  process.exitCode = 1;
};

void run().catch((error) => {
  const message =
    error instanceof Error ? error.message : "Unexpected error occurred.";
  console.error(`Unexpected failure: ${message}`);
  process.exitCode = 2;
});
