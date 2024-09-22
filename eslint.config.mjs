/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   eslint.config.mjs                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ehosta <ehosta@student.42lyon.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/07/27 20:02:48 by ehosta            #+#    #+#             */
/*   Updated: 2024/07/27 20:02:48 by ehosta           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config({
	"ignores": ["types", "lib", "docs", "node_modules", "doc.builder.js", "builder.js"],
	"extends": [
		eslint.configs.recommended,
		...tseslint.configs.recommended,
		...tseslint.configs.strict,
		...tseslint.configs.stylistic,
	],
	"rules": {
		"init-declarations": ["error", "never", { "ignoreForLoopInit": true }],
		"id-length": ["error", { "min": 3, "exceptions": ["on", "db", "i", "id"] }],
		"max-classes-per-file": ["error", { "max": 1 }],
		"max-depth": ["error", { "max": 4 }],
		"max-lines": ["error", { "max": 1000, "skipBlankLines": true, "skipComments": true }],
		"max-lines-per-function": ["error", { "max": 80 }],
		"max-nested-callbacks": ["error", { "max": 4 }],
		"max-params": ["error", { "max": 4 }],
		"max-statements": ["warn", { "max": 50 }],
		"max-len": ["error", { "code": 100, "tabWidth": 4, "ignoreUrls": true }],
		"no-extraneous-class": "off",
		"@typescript-eslint/no-var-requires": ["error", { "allow": ['/package\\.json$'] }],
	}
});
