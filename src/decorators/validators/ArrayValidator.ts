/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ArrayValidator.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ehosta <ehosta@student.42lyon.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/07/27 20:06:28 by ehosta            #+#    #+#             */
/*   Updated: 2024/07/28 14:48:57 by ehosta           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { DiscordAPIError, DiscordjsError, User } from 'discord.js';
import { InstanceValidator } from '../shared';

/**
 * All the array type
 */
export const ArrayValidator: Record<string, InstanceValidator> = {
	/**
	 * Verify if an array is composed only of objects.
	 * @param target The class instance.
	 * @param key The attribute to set.
	 */
	OnlyObjects: (target: object, key: string): void => {
		let value: unknown;

		const setter = (newValue: unknown): void => {
			if (
				typeof newValue !== 'object' ||
				(newValue instanceof Array &&
					!newValue?.every((value: unknown): boolean => typeof value === 'object'))
			)
				throw new Error(
					`The property ${target.constructor.name}.${key} must be an object-only array.`,
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
	/**
	 * Verify if an array is composed only of enumeration values.
	 * @param target The class instance.
	 * @param key The attribute to set.
	 */
	OnlyEnumValues: (target: object, key: string): void => {
		let value: unknown;

		const setter = (newValue: unknown): void => {
			if (
				typeof newValue !== 'object' ||
				(newValue instanceof Array &&
					!newValue?.every(
						(value: unknown): boolean =>
							typeof value === 'string' || typeof value === 'number',
					))
			)
				throw new Error(
					`The property ${target.constructor.name}.${key} must be an ` +
						`enumeration-values-only array.`,
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
	/**
	 * Verify if an array is composed only of HashiErrors initials classes instances.
	 * @param target The class instance.
	 * @param key The attribute to set.
	 */
	OnlyHashiErrors: (target: object, key: string): void => {
		let value: unknown;

		const setter = (newValue: unknown): void => {
			if (
				typeof newValue !== 'object' ||
				(newValue instanceof Array &&
					!newValue?.every(
						(value: unknown): boolean =>
							!(value instanceof Error) &&
							!(value instanceof DiscordjsError) &&
							!(value instanceof DiscordAPIError),
					))
			)
				throw new Error(
					`The property ${target.constructor.name}.${key} must be an ` +
						`HashiErrors-initials-classes-instances array.`,
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
	/**
	 * Verify if an array is composed only of users.
	 * @param target The class instance.
	 * @param key The attribute to set.
	 */
	OnlyUsers: (target: object, key: string): void => {
		let value: unknown;

		const setter = (newValue: unknown): void => {
			if (
				typeof newValue !== 'object' ||
				(newValue instanceof Array &&
					!newValue?.every((value: unknown): boolean => value instanceof User))
			)
				throw new Error(
					`The property ${target.constructor.name}.${key} must be an User-only array.`,
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
