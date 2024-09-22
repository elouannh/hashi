import { BaseGuildTextChannel, BaseGuildVoiceChannel, ThreadChannel } from 'discord.js';
import { InstanceValidator } from '../shared';

/**
 * All the object type
 */
export const ObjectValidator: Record<string, InstanceValidator> = {
	/**
	 * Verify if a value is an ContextChannel initial type instance.
	 * @param target The class instance.
	 * @param key The attribute to set.
	 */
	ContextChannelInitial: (target: object, key: string): void => {
		let value: unknown;

		const setter = (newValue: unknown): void => {
			if (
				typeof newValue !== 'object' ||
				(!(newValue instanceof BaseGuildTextChannel) &&
					!(newValue instanceof BaseGuildVoiceChannel) &&
					!(newValue instanceof ThreadChannel))
			)
				throw new Error(
					`The property ${target.constructor.name}.${key} must be an instance of one` +
						` of the ContextChannel initial type classes.`,
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
	 * Verify if the value is a dataMapDefinition object.
	 * @param target The class instance.
	 * @param key The attribute to set.
	 */
	IsDataMapDefinition: (target: object, key: string): void => {
		let value: unknown;

		const setter = (newValue: unknown): void => {
			if (
				typeof newValue !== 'object' ||
				!('name' in newValue) ||
				!('entry' in newValue) ||
				!('schema' in newValue) ||
				!('defaultValues' in newValue)
			)
				throw new Error(
					`The property ${target.constructor.name}.${key} must be a ` +
						`dataMapDefinition object.`,
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
	 * Verify if the value is an object string-functions[].
	 * @param target The class instance.
	 * @param key The attribute to set.
	 */
	KeyFunctionPair: (target: object, key: string): void => {
		let value: unknown;

		const setter = (newValue: unknown): void => {
			if (
				typeof newValue !== 'object' ||
				!Object.entries(newValue).every(
					([_key, _value]: [string, unknown]): boolean =>
						typeof _key === 'string' && typeof _value === 'function',
				)
			)
				throw new Error(
					`The property ${target.constructor.name}.${key} must be an object ` +
						`string-functions[].`,
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
	 * Verify if the value is an object string-object.
	 * @param target The class instance.
	 * @param key The attribute to set.
	 */
	KeyObjectPair: (target: object, key: string): void => {
		let value: unknown;

		const setter = (newValue: unknown): void => {
			if (
				typeof newValue !== 'object' ||
				!Object.entries(newValue).every(
					([_key, _value]: [string, unknown]): boolean =>
						typeof _key === 'string' && typeof _value === 'object',
				)
			)
				throw new Error(
					`The property ${target.constructor.name}.${key} must be an object ` +
						`string-object.`,
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
	 * Verify if the value is an object string-string.
	 * @param target The class instance.
	 * @param key The attribute to set.
	 */
	KeyStringPair: (target: object, key: string): void => {
		let value: unknown;

		const setter = (newValue: unknown): void => {
			if (typeof newValue !== 'object' || typeof newValue !== 'string')
				throw new Error(
					`The property ${target.constructor.name}.${key} must be an object ` +
						`string-string.`,
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
	 * Verify if the value is an object string-string[].
	 * @param target The class instance.
	 * @param key The attribute to set.
	 */
	KeyStringArrayPair: (target: object, key: string): void => {
		let value: unknown;

		const setter = (newValue: unknown): void => {
			if (
				typeof newValue !== 'object' ||
				!Object.entries(newValue).every(
					([_key, _value]: [string, unknown]): boolean =>
						typeof _key === 'string' &&
						typeof _value === 'object' &&
						(_value as unknown[]).every(
							(value: unknown): boolean => typeof value === 'string',
						),
				)
			)
				throw new Error(
					`The property ${target.constructor.name}.${key} must be an object ` +
						`string-string[].`,
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
	 * Verify if the value is an object.
	 * @param target The class instance.
	 * @param key The attribute to set.
	 */
	Matches: (target: object, key: string): void => {
		let value: unknown;

		const setter = (newValue: unknown): void => {
			if (typeof newValue !== 'object')
				throw new Error(
					`The property ${target.constructor.name}.${key} must be an object.`,
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
