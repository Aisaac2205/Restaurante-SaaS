const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');

module.exports = tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['src/**/*.ts'],
        rules: {
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-unused-vars': 'error',
            // Disable interface prefix rule if it exists in recommended, as I used 'I' prefix which is sometimes debated but requested effectively.
            // Actually recommendation is usually against 'I', but user requested interfaces.
            // I will leave defaults and override 'no-explicit-any' to error.
        }
    },
    {
        ignores: ['dist/']
    }
);
