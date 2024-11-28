import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import debug from "debug";

const log = debug("@galargh/immutable-readonly/no-type-annotation");

const createRule = ESLintUtils.RuleCreator(
  () => `https://github.com/galargh/eslint-plugin-immutable-readonly`,
);

export const rule = createRule({
  create(context) {
    return {
      "PropertyDefinition, TSPropertySignature"(
        node: TSESTree.PropertyDefinition | TSESTree.TSPropertySignature,
      ) {
        if (node.readonly && node.typeAnnotation === undefined) {
          context.report({
            node,
            messageId: "noTypeAnnotation",
          });
        }
      },
    };
  },
  name: "no-type-annotation",
  meta: {
    docs: {
      description:
        "Properties marked as readonly should have a type annotation.",
    },
    messages: {
      noTypeAnnotation:
        "This property is marked as readonly, but has no type annotation.",
    },
    type: "suggestion",
    schema: [],
    fixable: undefined,
  },
  defaultOptions: [],
});
