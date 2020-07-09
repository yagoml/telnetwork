module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["react-app", "plugin:jsx-a11y/recommended", "prettier"],
  plugins: ["jsx-a11y", "prettier"],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    "prettier/prettier": [
      "warn",
      {
        "singleQuote": true,
        "semi": false,
        "trailingComma": "none"
      }
    ]
  }
};
