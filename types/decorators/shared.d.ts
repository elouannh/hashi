import { Command, DiscordEvent, SuperModel } from '../root';
/**
 * The function that returns if a value is a constructor or a constructed.
 * @param value The value to check.
 * @returns If the value is a constructor.
 */
export declare function isConstructor(value: Constructable<NonNullable<unknown>>): boolean;
/**
 * Represents a constructable class.
 */
export type Constructable<T extends object> = new (...args: unknown[]) => T;
/**
 * Represents a function returned for a validator decorator.
 * @param target The class instance.
 * @param key The attribute to set.
 */
export type InstanceValidator = (target: object, key: string) => void;
/**
 * Represents a function returned for an injector decorator.
 * @param target The class instance.
 */
export type InstanceInjector = (target: object) => void;
/**
 * Represents a deferred (with parameters) function returned for a decorator.
 * @param target The class instance.
 * @param key The attribute to set.
 */
export type InstanceValidatorReturner = (...args: unknown[]) => InstanceValidator;
/**
 * The target type for the DiscordEventInjector.
 */
export type DiscordEventInjectorTarget = new () => DiscordEvent;
/**
 * The target type for the CommandInjector.
 */
export type CommandInjectorTarget<T extends Command = Command> = new (...args: unknown[]) => T;
/**
 * The target type for the SuperModelInjector.
 */
export type SuperModelInjectorTarget<T extends SuperModel = SuperModel> = new (...args: unknown[]) => T;
