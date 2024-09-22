/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   FunctionValidator.ts                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ehosta <ehosta@student.42lyon.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/07/27 20:06:32 by ehosta            #+#    #+#             */
/*   Updated: 2024/07/28 14:29:29 by ehosta           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { InstanceValidator } from '../shared';

/**
 * All the function type
 */
export const FunctionValidator: Record<string, InstanceValidator> = {
	/**
	 * Verify if the value is a function.
	 * @param target The class instance.
	 * @param key The attribute to set.
	 */
	Matches: (target: object, key: string): void => {
		let value: unknown;

		const setter = (newValue: unknown): void => {
			if (typeof newValue !== 'function')
				throw new Error(
					`The property ${target.constructor.name}.${key} must be a function.`,
				);
			value = newValue;
		};

		Object.defineProperty(target, key, {
			get: (): typeof value => value,
			set: setter,
			enumerable: true,
			configurable: true,
		});
	},
} as const;
