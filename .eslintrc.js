module.exports = {
  parser: "@typescript-elint/parser",
  extends: ["airbnb"],
  env: {
    browser: true,
    node: true,
    jasmine: true,
    jest: true,
    es6: true,
  },
  rules: {
    "import/extensions": 0,
    "import/no-unresolved": 0,
    "react/jsx-filname-extension": 0,
    "no-use-before-define": 0,
    "import/prefer-default-export": 0,
  }
}