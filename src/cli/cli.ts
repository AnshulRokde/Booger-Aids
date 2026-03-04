#!/usr/bin/env node

import { Command } from "commander"
import { generateTests } from "../generator/generator.js"

const program = new Command()

program
  .name("booger")
  .description("AI test generator")
  .version("0.0.1")

program
  .command("gen")
  .argument("<file>", "File to generate tests for")
  .action(async (file) => {
    await generateTests(file)
  })

program.parse()
