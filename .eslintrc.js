module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'plugin:react/recommended',
    'google',
    'prettier',
    'eslint:recommended',
    'next'
  ],
  'overrides': [
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    'react',
  ],
  'rules': {
    'require-jsdoc': 0,
    'new-cap': 0,
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 0,
    "react-hooks/rules-of-hooks": 0,
    "react-hooks/exhaustive-deps": 0
  },
};
