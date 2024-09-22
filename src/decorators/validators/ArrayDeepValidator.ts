import {
	Constructable,
	InstanceValidator,
	InstanceValidatorReturner,
	isConstructor,
} from '../shared';

/**
 * All the array type
 */
export const ArrayDeepValidator: Record<string, InstanceValidatorReturner> = {
	/**
	 * Verify if an array is composed only of a constructable class object.
	 * @param constructable The class the value shall inherit.
	 */
	OnlyConstructorOf: (constructable: Constructable<NonNullable<unknown>>): InstanceValidator => {
		return function (target: object, key: string): void {
			let value: Constructable<object>;

			const setter = (newValue: unknown): void => {
				if (
					typeof newValue !== 'object' ||
					!isConstructor(newValue as Constructable<object>) ||
					(isConstructor(newValue as Constructable<object>) &&
						'prototype' in newValue &&
						'name' in (newValue.prototype as object) &&
						(newValue.prototype as object & { name: string }).name !==
							constructable.prototype.name)
				)
					throw new Error(
						`The property ${target.constructor.name}.${key} must be a constructor of ` +
							`${constructable.prototype.name}.`,
					);
				value = newValue as Constructable<object>;
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
