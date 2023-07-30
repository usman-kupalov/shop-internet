module.exports = {
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaVersion: 'latest'
  },
  extends: ['standard'],
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  rules: {
    semi: ['error', 'always']
  }
};
