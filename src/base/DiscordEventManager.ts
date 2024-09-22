import { Collection } from 'discord.js';
import { BaseClient, Logger } from './';
import { ObjectDeepValidator } from '../decorators';
import { Client, DiscordEvent } from '../root';

/**
 * Represents the event manager for the client service.
 */
export class DiscordEventManager extends BaseClient {
	/**
	 * The collection of the events.
	 */
	@ObjectDeepValidator.IsInstanceOf(Collection)
	public readonly eventsList: Collection<string, typeof DiscordEvent> = new Collection<
		string,
		typeof DiscordEvent
	>();

	// noinspection JSUnusedGlobalSymbols
	/**
	 * The decorator to inject metadata into the constructor of DiscordEvent.
	 * @param name The name of the event.
	 * @param callback The called function when the event is triggered.
	 * @returns The decorator.
	 */
	public inject(
		name: string,
		callback: (client: Client, ...args: unknown[]) => Promise<void> | void,
	): DiscordEvent {
		new Logger().log('info', `Bound event: ${name}`);

		const event: DiscordEvent = new DiscordEvent(name);
		event.callback = callback;

		this.client.src[name === 'ready' ? 'once' : 'on'](name, (...args: unknown[]) =>
			event.callback(this.client, ...args),
		);

		return event;
	}
}
