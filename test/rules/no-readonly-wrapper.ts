import * as test from "node:test";
import { RuleTester } from "@typescript-eslint/rule-tester";
import { rule } from "../../src/rules/no-readonly-wrapper.js";

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

ruleTester.run("no-readonly-wrapper", rule, {
  valid: [
    "interface Foo { readonly bar: string; }",
    "interface Foo { readonly bar: string | number; }",
    "interface Foo { readonly bar: string & number; }",
    "interface Foo { bar: string; }",
    "interface Foo { readonly bar: Readonly<Bar>; }",
    "interface Foo { readonly bar: Readonly<Array<Readonly<Bar>>>; }",
    "interface Foo { readonly bar: Readonly<Bar> | Readonly<Baz> };",
    "interface Foo { readonly bar: Readonly<Bar> & Readonly<Baz> };",
    "interface Foo { readonly bar: Readonly<Bar | Baz>; }",
    "interface Foo { readonly bar: Readonly<Bar & Baz>; }",
    "class Foo { readonly bar: string; }",
    "class Foo { readonly bar: string | number; }",
    "class Foo { readonly bar: string & number; }",
    "class Foo { bar: string; }",
    "class Foo { readonly bar: Readonly<Bar>; }",
    "class Foo { readonly bar: Readonly<Array<Readonly<Bar>>>; }",
    "class Foo { readonly bar: Readonly<Bar> | Readonly<Baz> };",
    "class Foo { readonly bar: Readonly<Bar> & Readonly<Baz> };",
    "class Foo { readonly bar: Readonly<Bar | Baz>; }",
    "class Foo { readonly bar: Readonly<Bar & Baz>; }",
  ],
  invalid: [
    {
      code: "interface Foo { readonly bar: Bar; };",
      output: "interface Foo { readonly bar: Readonly<Bar>; };",
      errors: [
        {
          messageId: "noReadonlyWrapper",
          suggestions: null,
        },
      ],
    },
    {
      code: "interface Foo { readonly bar: Array<Bar>; };",
      output: [
        "interface Foo { readonly bar: Readonly<Array<Bar>>; };",
        "interface Foo { readonly bar: Readonly<Array<Readonly<Bar>>>; };",
      ],
      errors: [
        {
          messageId: "noReadonlyWrapper",
          suggestions: null,
        },
        {
          messageId: "noReadonlyWrapper",
          suggestions: null,
        },
      ],
    },
    {
      code: "interface Foo { readonly bar: Readonly<Array<Bar>>; };",
      output:
        "interface Foo { readonly bar: Readonly<Array<Readonly<Bar>>>; };",
      errors: [
        {
          messageId: "noReadonlyWrapper",
          suggestions: null,
        },
      ],
    },
    {
      code: "interface Foo { readonly bar: Array<Readonly<Bar>>; };",
      output:
        "interface Foo { readonly bar: Readonly<Array<Readonly<Bar>>>; };",
      errors: [
        {
          messageId: "noReadonlyWrapper",
          suggestions: null,
        },
      ],
    },
    {
      code: "interface Foo { readonly bar: Readonly<Bar> | Baz; };",
      output: "interface Foo { readonly bar: Readonly<Bar> | Readonly<Baz>; };",
      errors: [
        {
          messageId: "noReadonlyWrapper",
          suggestions: null,
        },
      ],
    },
    {
      code: "interface Foo { readonly bar: Bar | Readonly<Baz>; };",
      output: "interface Foo { readonly bar: Readonly<Bar> | Readonly<Baz>; };",
      errors: [
        {
          messageId: "noReadonlyWrapper",
          suggestions: null,
        },
      ],
    },
    {
      code: "interface Foo { readonly bar: Readonly<Bar> & Baz; };",
      output: "interface Foo { readonly bar: Readonly<Bar> & Readonly<Baz>; };",
      errors: [
        {
          messageId: "noReadonlyWrapper",
          suggestions: null,
        },
      ],
    },
    {
      code: "interface Foo { readonly bar: Bar & Readonly<Baz>; };",
      output: "interface Foo { readonly bar: Readonly<Bar> & Readonly<Baz>; };",
      errors: [
        {
          messageId: "noReadonlyWrapper",
          suggestions: null,
        },
      ],
    },
    {
      code: "interface Foo { readonly bar: Map<Bar, Baz>; };",
      output: [
        "interface Foo { readonly bar: Readonly<Map<Bar, Baz>>; };",
        "interface Foo { readonly bar: Readonly<Map<Readonly<Bar>, Readonly<Baz>>>; };",
      ],
      errors: [
        {
          messageId: "noReadonlyWrapper",
          suggestions: null,
        },
        {
          messageId: "noReadonlyWrapper",
          suggestions: null,
        },
        {
          messageId: "noReadonlyWrapper",
          suggestions: null,
        },
      ],
    },
    {
      code: "class Foo { readonly bar: Bar; };",
      output: "class Foo { readonly bar: Readonly<Bar>; };",
      errors: [
        {
          messageId: "noReadonlyWrapper",
          suggestions: null,
        },
      ],
    },
    {
      code: "class Foo { readonly bar: Array<Bar>; };",
      output: [
        "class Foo { readonly bar: Readonly<Array<Bar>>; };",
        "class Foo { readonly bar: Readonly<Array<Readonly<Bar>>>; };",
      ],
      errors: [
        {
          messageId: "noReadonlyWrapper",
          suggestions: null,
        },
        {
          messageId: "noReadonlyWrapper",
          suggestions: null,
        },
      ],
    },
    {
      code: "class Foo { readonly bar: Readonly<Array<Bar>>; };",
      output: "class Foo { readonly bar: Readonly<Array<Readonly<Bar>>>; };",
      errors: [
        {
          messageId: "noReadonlyWrapper",
          suggestions: null,
        },
      ],
    },
    {
      code: "class Foo { readonly bar: Array<Readonly<Bar>>; };",
      output: "class Foo { readonly bar: Readonly<Array<Readonly<Bar>>>; };",
      errors: [
        {
          messageId: "noReadonlyWrapper",
          suggestions: null,
        },
      ],
    },
    {
      code: "class Foo { readonly bar: Readonly<Bar> | Baz; };",
      output: "class Foo { readonly bar: Readonly<Bar> | Readonly<Baz>; };",
      errors: [
        {
          messageId: "noReadonlyWrapper",
          suggestions: null,
        },
      ],
    },
    {
      code: "class Foo { readonly bar: Bar | Readonly<Baz>; };",
      output: "class Foo { readonly bar: Readonly<Bar> | Readonly<Baz>; };",
      errors: [
        {
          messageId: "noReadonlyWrapper",
          suggestions: null,
        },
      ],
    },
    {
      code: "class Foo { readonly bar: Readonly<Bar> & Baz; };",
      output: "class Foo { readonly bar: Readonly<Bar> & Readonly<Baz>; };",
      errors: [
        {
          messageId: "noReadonlyWrapper",
          suggestions: null,
        },
      ],
    },
    {
      code: "class Foo { readonly bar: Bar & Readonly<Baz>; };",
      output: "class Foo { readonly bar: Readonly<Bar> & Readonly<Baz>; };",
      errors: [
        {
          messageId: "noReadonlyWrapper",
          suggestions: null,
        },
      ],
    },
    {
      code: "class Foo { readonly bar: Map<Bar, Baz>; };",
      output: [
        "class Foo { readonly bar: Readonly<Map<Bar, Baz>>; };",
        "class Foo { readonly bar: Readonly<Map<Readonly<Bar>, Readonly<Baz>>>; };",
      ],
      errors: [
        {
          messageId: "noReadonlyWrapper",
          suggestions: null,
        },
        {
          messageId: "noReadonlyWrapper",
          suggestions: null,
        },
        {
          messageId: "noReadonlyWrapper",
          suggestions: null,
        },
      ],
    },
  ],
});
