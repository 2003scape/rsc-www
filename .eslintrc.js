module.exports = {
    env: {
        node: true,
        browser: true,
        commonjs: false,
        es6: true
    },
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    parserOptions: {
        ecmaVersion: 2018,
        ecmaFeatures: {
            jsx: true
        },
        sourceType: 'module'
    },
    rules: {
        indent: [
            'error',
            4,
            {
                SwitchCase: 1
            }
        ],
        'linebreak-style': ['error', 'unix'],
        semi: ['error', 'always'],
        'no-prototype-builtins': 0,
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 0
    },
    settings: {
        react: { version: 'detect' }
    }
};
