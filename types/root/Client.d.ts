import { Client as DiscordClient, ClientOptions as DiscordClientOptions } from 'discord.js';
import { CommandManager, DatabaseManager, DiscordEventManager, Logger } from '../base/';
import { ClientOptions, JSONHashiConfigStructure } from './';
/**
 * The Client class. It extends the Client class from discord.js and implements extra methods
 * for the Hashi module.
 */
export declare class Client {
    /**
     * The Discord Client instance.
     */
    readonly src: DiscordClient;
    /**
     * The logger for the Client.
     */
    readonly logger: Logger;
    /**
     * The command manager instance.
     */
    readonly commands: CommandManager;
    /**
     * The event manager instance.
     */
    readonly events: DiscordEventManager;
    /**
     * The database manager for accessing data maps/lakes.
     */
    readonly db: DatabaseManager;
    /**
     * Configuration JSON content.
     */
    readonly config: JSONHashiConfigStructure;
    /**
     * @param options The options for the Client.
     */
    constructor(options: ClientOptions | (JSONHashiConfigStructure & DiscordClientOptions));
    /**
     * Converts the constructor argument into a valid format if it is not.
     * @param options The options for the Client.
     * @returns The formatted object.
     */
    static formatOptions(options: ClientOptions | (JSONHashiConfigStructure & DiscordClientOptions)): ClientOptions;
    /**
     * Tries something and returns null if it does not exist.
     * @param func The function to call.
     * @param args The args associated to the function.
     * @returns The func callback or null.
     */
    static tryTo(func: (...args: unknown[]) => unknown, ...args: unknown[]): unknown | null;
    /**
     * Connect the database.
     * @returns Nothing.
     */
    connectDatabase(): Promise<void>;
    /**
     * Login the client to Discord.
     * @param token The token of the bot.
     * @returns Nothing.
     */
    login(token?: string): Promise<string>;
}
