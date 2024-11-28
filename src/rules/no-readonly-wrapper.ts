import {
  AST_NODE_TYPES,
  ESLintUtils,
  TSESTree,
} from "@typescript-eslint/utils";
import debug from "debug";

const log = debug("@galargh/immutable-readonly/no-readonly-wrapper");

const createRule = ESLintUtils.RuleCreator(
  () => `https://github.com/galargh/eslint-plugin-immutable-readonly`,
);

function isTypeReference(
  node: TSESTree.Node | undefined,
): node is TSESTree.TSTypeReference {
  return node !== undefined && node.type === AST_NODE_TYPES.TSTypeReference;
}

function isReadonly(node: TSESTree.Node | undefined): boolean {
  return (
    isTypeReference(node) &&
    node.typeName.type === AST_NODE_TYPES.Identifier &&
    node.typeName.name === "Readonly"
  );
}

export const rule = createRule({
  create(context) {
    return {
      "PropertyDefinition, TSPropertySignature"(
        node: TSESTree.PropertyDefinition | TSESTree.TSPropertySignature,
      ) {
        if (!node.readonly) {
          return;
        }
        if (node.typeAnnotation === undefined) {
          return;
        }
        const typeNodes: TSESTree.TypeNode[] = [
          node.typeAnnotation.typeAnnotation,
        ];
        while (typeNodes.length > 0) {
          const typeNode = typeNodes.pop()!;
          switch (typeNode.type) {
            case AST_NODE_TYPES.TSUnionType:
            case AST_NODE_TYPES.TSIntersectionType:
              typeNodes.push(...typeNode.types);
              break;
            case AST_NODE_TYPES.TSTypeReference:
              if (!isReadonly(typeNode)) {
                let parent: TSESTree.Node | undefined = typeNode.parent;
                while (
                  parent !== undefined &&
                  parent !== node &&
                  parent.type !== AST_NODE_TYPES.TSTypeReference
                ) {
                  parent = parent.parent;
                }
                if (!isReadonly(parent)) {
                  context.report({
                    node: typeNode,
                    messageId: "noReadonlyWrapper",
                    fix: (fixer) => {
                      const typeText = context.sourceCode.getText(typeNode);
                      return fixer.replaceText(
                        typeNode,
                        `Readonly<${typeText}>`,
                      );
                    },
                  });
                }
              }
              typeNodes.push(...(typeNode.typeArguments?.params ?? []));
              break;
            case AST_NODE_TYPES.TSStringKeyword:
            case AST_NODE_TYPES.TSNumberKeyword:
            case AST_NODE_TYPES.TSBooleanKeyword:
            case AST_NODE_TYPES.TSNullKeyword:
            case AST_NODE_TYPES.TSUndefinedKeyword:
              break;
            default:
              log("unknown type", typeNode);
              break;
          }
        }
      },
    };
  },
  name: "no-readonly-wrapper",
  meta: {
    docs: {
      description: "Properties marked as readonly should be immutable.",
    },
    messages: {
      noReadonlyWrapper:
        "This type T should be immutable, but is not wrapped in a Readonly<T>.",
    },
    type: "suggestion",
    schema: [],
    fixable: "code",
  },
  defaultOptions: [],
});
