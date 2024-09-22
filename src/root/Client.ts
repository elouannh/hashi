import {
	ActivityType,
	ApplicationCommandDataResolvable,
	Client as DiscordClient,
	ClientOptions as DiscordClientOptions,
	PresenceData,
} from 'discord.js';
import {
	CommandManager,
	DatabaseManager,
	DataMap,
	DATAMAP_INTENTS,
	DiscordEventManager,
	Logger,
	TypedDataMapStored,
} from '../base/';
import { ObjectValidator, ObjectDeepValidator } from '../decorators';
import { ClientOptions, JSONHashiConfigStructure } from './';

/**
 * The Client class. It extends the Client class from discord.js and implements extra methods
 * for the Hashi module.
 */
export class Client {
	/**
	 * The Discord Client instance.
	 */
	@ObjectDeepValidator.IsInstanceOf(DiscordClient)
	public readonly src: DiscordClient;

	/**
	 * The logger for the Client.
	 */
	@ObjectDeepValidator.IsInstanceOf(Logger)
	public readonly logger: Logger;

	/**
	 * The command manager instance.
	 */
	@ObjectDeepValidator.IsInstanceOf(CommandManager)
	public readonly commands: CommandManager = new CommandManager(this);

	/**
	 * The event manager instance.
	 */
	@ObjectDeepValidator.IsInstanceOf(DiscordEventManager)
	public readonly events: DiscordEventManager = new DiscordEventManager(this);

	/**
	 * The database manager for accessing data maps/lakes.
	 */
	@ObjectDeepValidator.IsInstanceOf(DatabaseManager)
	public readonly db: DatabaseManager = new DatabaseManager(this);

	/**
	 * Configuration JSON content.
	 */
	@ObjectValidator.Matches
	public readonly config: JSONHashiConfigStructure;

	/**
	 * @param options The options for the Client.
	 */
	constructor(options: ClientOptions | (JSONHashiConfigStructure & DiscordClientOptions)) {
		options = Client.formatOptions(options);

		this.src = new DiscordClient({
			intents: options.intents || 3276799,
			failIfNotExists: options.failIfNotExists || false,
			presence:
				options.presence ||
				({
					status: 'online',
					activities: [
						{
							name: `with version ${require('../../package.json').version}`,
							type: ActivityType.Playing,
						},
					],
				} as PresenceData),
		});
		this.config = options.config;

		new Logger().log('info', `Process initialization.`);

		this.db.dbName = options.config.database.databaseName || 'main';
		this.db.connectionURI = options.config.database.connectionURI;
		this.db.connectOptions = {
			dbName: options.config.database.databaseName,
			family: Number(options.config.database.addressFamily.replace('IPv', '')),
		};

		process.on('unhandledRejection', (reason: Error): void => {
			new Logger().log('error', reason);
			new Logger().log('error', reason.stack);
			console.log(reason, reason.stack);
		});
		process.on(
			'uncaughtException',
			(err: Error, origin: NodeJS.UncaughtExceptionOrigin): void => {
				new Logger().log('error', err);
				new Logger().log('error', origin);
				console.log(err, origin);
			},
		);
	}

	/**
	 * Converts the constructor argument into a valid format if it is not.
	 * @param options The options for the Client.
	 * @returns The formatted object.
	 */
	public static formatOptions(
		options: ClientOptions | (JSONHashiConfigStructure & DiscordClientOptions),
	): ClientOptions {
		if ('config' in options) return options as ClientOptions;
		else return { config: options, ...options } as ClientOptions;
	}

	/**
	 * Tries something and returns null if it does not exist.
	 * @param func The function to call.
	 * @param args The args associated to the function.
	 * @returns The func callback or null.
	 */
	public static tryTo(func: (...args: unknown[]) => unknown, ...args: unknown[]): unknown | null {
		try {
			return func(...args);
		} catch {
			return null;
		}
	}

	/**
	 * Connect the database.
	 * @returns Nothing.
	 */
	public async connectDatabase(): Promise<void> {
		new Logger().log('info', 'Database is connecting...');
		await this.db.connect();
		new Logger().log('success', 'Database is connected.');
	}

	/**
	 * Login the client to Discord.
	 * @param token The token of the bot.
	 * @returns Nothing.
	 */
	public async login(
		token: string = process.env.TOKEN || process.env.token || process.env.Token,
	): Promise<string> {
		new Logger().log('info', 'Bot is connecting...');
		await this.src.login(token);
		new Logger().log('success', 'Bot is connected.');

		void (await this.src.application.commands.set(
			this.commands.discordCommandsData as ApplicationCommandDataResolvable[],
		));
		new Logger().log('success', 'Commands loaded.');

		let i: number;
		i = -1;
		let dataMap: DataMap<TypedDataMapStored>;
		while (++i < Object.keys(this.db.dataMaps).length) {
			dataMap = Object.values(this.db.dataMaps)[i];
			if (dataMap.intents.includes(DATAMAP_INTENTS.CORE)) await dataMap.refreshCore();
		}

		new Logger().log(
			'info',
			`The client is successfully launched on Discord as ${this.src.user.tag}.`,
		);

		return '0';
	}
}
