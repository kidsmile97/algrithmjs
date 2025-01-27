module.exports = {
	parser: '@typescript-eslint/parser',
	extends: ['plugin:prettier/recommended'],
	parserOptions: {
		ecmaVersion: 2015,
		sourceType: 'module',
	},
	rules: {
		'prettier/prettier': 'error',
		// 'import/no-unresolved': 'off',
		// 'no-plusplus': 'off',
		// 'import/prefer-default-export': 'off',
		// 'import/extensions': 'off',
		'no-param-reassign': ['warn', { props: false }],
		// 'no-underscore-dangle': 'off',
		'no-shadow': 'warn',
		'default-case': 'warn',
		'max-len': ['error', { code: 120 }],
		'no-unused-vars': 'warn',
		'@typescript-eslint/no-use-before-define': 'off',
		'no-restricted-globals': 'warn',
		'no-unused-expressions': 'warn',
		'@typescript-eslint/no-loop-func': 'off',
		'@typescript-eslint/no-redeclare': 'off',
		'@typescript-eslint/no-shadow': 'off',
	},
};
