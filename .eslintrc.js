module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'plugin:react/recommended',
    'google',
    'prettier',
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
    'react/prop-types': 0
  },
};