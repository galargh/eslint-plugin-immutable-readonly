import * as test from "node:test";
import { RuleTester } from "@typescript-eslint/rule-tester";
import { rule } from "../../src/rules/no-type-annotation.js";

RuleTester.afterAll = test.after;
RuleTester.describe = test.describe;
RuleTester.it = test.it;
RuleTester.itOnly = test.it.only;

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      projectService: {
        allowDefaultProject: ["*.ts*"],
      },
      tsconfigRootDir: process.cwd(),
    },
  },
});

ruleTester.run("no-type-annotation", rule, {
  valid: [
    "interface Foo { readonly bar: string; }",
    "class Foo { readonly bar: string; }",
  ],
  invalid: [
    {
      code: "interface Foo { readonly bar; };",
      output: null,
      errors: [
        {
          messageId: "noTypeAnnotation",
          suggestions: null,
        },
      ],
    },
    {
      code: "class Foo { readonly bar; };",
      output: null,
      errors: [
        {
          messageId: "noTypeAnnotation",
          suggestions: null,
        },
      ],
    },
  ],
});
