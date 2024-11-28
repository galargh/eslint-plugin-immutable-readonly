const { rule: noReadonlyWrapper } = require("./rules/no-readonly-wrapper.js");
const { rule: noTypeAnnotation } = require("./rules/no-type-annotation.js");

const plugin = {
  rules: {
    "no-readonly-wrapper": noReadonlyWrapper,
    "no-type-annotation": noTypeAnnotation,
  },
};

export = plugin;
