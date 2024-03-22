module.exports = {
	extends: ['plugin:prettier/recommended', 'prettier/@typescript-eslint'],
	rules: {
		'prettier/prettier': 'error',
		// 'import/no-unresolved': 'off',
		// 'no-plusplus': 'off',
		// 'import/prefer-default-export': 'off',
		'import/no-extraneous-dependencies': 'warn',
		// 'import/extensions': 'off',
		'no-param-reassign': ['warn', { props: false }],
		// 'no-underscore-dangle': 'off',
		'no-shadow': 'warn',
		'default-case': 'warn',
		'max-len': ['warn', { code: 180 }],
		'no-unused-vars': 'warn',
		// '@typescript-eslint/no-use-before-define': 'off',
		'no-restricted-globals': 'warn',
		'no-unused-expressions': 'warn',
		// '@typescript-eslint/no-loop-func': 'off',
		// '@typescript-eslint/no-redeclare': 'off',
		// '@typescript-eslint/no-shadow': 'off',
	},
};
