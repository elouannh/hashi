/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ObjectDeepValidator.ts                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ehosta <ehosta@student.42lyon.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/07/27 20:06:39 by ehosta            #+#    #+#             */
/*   Updated: 2024/07/28 15:03:15 by ehosta           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Constructable, InstanceValidator, InstanceValidatorReturner } from '../shared';

/**
 * All the object type
 */
export const ObjectDeepValidator: Record<string, InstanceValidatorReturner> = {
	/**
	 * Verify if the value is a class instance.
	 * @param constructable The class the value shall inherit.
	 */
	IsInstanceOf: (constructable: Constructable<NonNullable<unknown>>): InstanceValidator => {
		return function (target: object, key: string): void {
			let value: unknown;

			const setter = (newValue: unknown): void => {
				if (typeof newValue !== 'object' || !(newValue instanceof constructable))
					throw new Error(
						`The property ${target.constructor.name}.${key} must be an instance of ` +
							`${constructable.prototype.name}.`,
					);
				value = newValue;
			};

			Object.defineProperty(target, key, {
				get: (): typeof value => value,
				set: setter,
				enumerable: true,
				configurable: true,
			});
		};
	},
	/**
	 * Verify if the value is an object string-dataMap.
	 * @param dataMap The dataMap constructor.
	 */
	KeyDataMapPair: (dataMap: Constructable<NonNullable<unknown>>): InstanceValidator => {
		return function (target: object, key: string): void {
			let value: unknown;

			const setter = (newValue: unknown): void => {
				if (
					typeof newValue !== 'object' ||
					!Object.entries(newValue).every(
						([_key, _value]: [string, unknown]): boolean =>
							typeof _key === 'string' && _value instanceof dataMap,
					)
				)
					throw new Error(
						`The property ${target.constructor.name}.${key} must be an object ` +
							`string-dataMap.`,
					);
				value = newValue;
			};

			Object.defineProperty(target, key, {
				get: (): typeof value => value,
				set: setter,
				enumerable: true,
				configurable: true,
			});
		};
	},
	/**
	 * Verify if the value is an object string-superModelColumn.
	 * @param superModelColumn The superModelColumn constructor.
	 */
	KeySuperModelColumnPair: (
		superModelColumn: Constructable<NonNullable<unknown>>,
	): InstanceValidator => {
		return function (target: object, key: string): void {
			let value: unknown;

			const setter = (newValue: unknown): void => {
				if (
					typeof newValue !== 'object' ||
					!Object.entries(newValue).every(
						([_key, _value]: [string, unknown]): boolean =>
							typeof _key === 'string' && _value instanceof superModelColumn,
					)
				)
					throw new Error(
						`The property ${target.constructor.name}.${key} must be an object ` +
							`string-superModelColumn.`,
					);
				value = newValue;
			};

			Object.defineProperty(target, key, {
				get: (): typeof value => value,
				set: setter,
				enumerable: true,
				configurable: true,
			});
		};
	},
	/**
	 * Verify if the value is a class instance of a placeholder value.
	 * @param arg The class constructor.
	 * @param placeholder The placeholder constructor.
	 */
	KindOfInstance: (
		arg: Constructable<NonNullable<unknown>>,
		placeholder: Constructable<NonNullable<unknown>>,
	): InstanceValidator => {
		return function (target: object, key: string): void {
			let value: unknown;

			const setter = (newValue: unknown): void => {
				if (
					typeof newValue !== 'object' ||
					!Object.entries(newValue).every(
						([_key, _value]: [string, unknown]): boolean =>
							typeof _key === 'string' &&
							(_value instanceof arg || _value instanceof placeholder),
					)
				)
					throw new Error(
						`The property ${target.constructor.name}.${key} must be an ` +
							`instance of ${arg.prototype.name} or a default placeholder.`,
					);
				value = newValue;
			};

			Object.defineProperty(target, key, {
				get: (): typeof value => value,
				set: setter,
				enumerable: true,
				configurable: true,
			});
		};
	},
} as const;
