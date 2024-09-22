/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CommandManager.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ehosta <ehosta@student.42lyon.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/07/27 20:04:32 by ehosta            #+#    #+#             */
/*   Updated: 2024/07/28 15:20:12 by ehosta           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { APIApplicationCommand, ChatInputCommandInteraction, Collection } from 'discord.js';
import { BaseClient, Context, Logger } from './';
import {
	InstanceInjector,
	CommandInjectorTarget,
	ObjectDeepValidator,
	FunctionValidator,
} from '../decorators';
import {
	Client,
	Command,
	COMMAND_END,
	CommandGroup,
	CommandMetadata,
	CommandMetadataBase,
	CommandMetadataSubgroup,
	CoolDownManager,
	InterferingManager,
} from '../root';

/**
 * Represents the command manager of the client. This class manages the slash and message commands
 * for the project.
 */
export class CommandManager extends BaseClient {
	/**
	 * The cool downs' manager instance, to get access to the different delays of the current
	 * command.
	 */
	@ObjectDeepValidator.IsInstanceOf(CoolDownManager)
	public readonly coolDowns: CoolDownManager = new CoolDownManager();

	/**
	 * The interfering manager instance, to have access to the different executing commands.
	 */
	@ObjectDeepValidator.IsInstanceOf(InterferingManager)
	public readonly interfering: InterferingManager = new InterferingManager();

	/**
	 * The list of commands.
	 */
	@ObjectDeepValidator.IsInstanceOf(Collection)
	public readonly commandsList: Collection<string, [typeof Command, CommandMetadata]> =
		new Collection<string, [typeof Command, CommandMetadata & { src: null }]>();

	/**
	 * The list of discord commands data.
	 */
	@ObjectDeepValidator.IsInstanceOf(Collection)
	public readonly discordCommandsData: APIApplicationCommand[] = [];

	/**
	 * The function that is called when the cool down manager authorization does not pass.
	 */
	@FunctionValidator.Matches
	public authorizationCallback: (context: Context, errorCode: string) => Promise<void> = async (
		context: Context,
		errorCode: string,
	): Promise<void> => {
		await context.reply({
			content:
				`❌ **Error** → missing privileges ` +
				`authorizations. (privileges error code: **\`${errorCode}\`**)`,
			ephemeral: true,
		});
		return void 0;
	};

	// noinspection JSUnusedGlobalSymbols
	/**
	 * Set the callback function when the authorizations do not pass.
	 * @param callback The function to set.
	 * @returns The class instance.
	 */
	public on(callback: (context: Context, errorCode: string) => Promise<void>): this {
		this.authorizationCallback = callback;
		return this;
	}

	/**
	 * Get a slash command from the cache with the name.
	 * @param interaction The interaction.
	 * @returns The found command instance, or undefined, with its metadata.
	 */
	public getCommandFromInteraction(interaction: ChatInputCommandInteraction): CommandGroup {
		const base: [typeof Command, CommandMetadata] | undefined =
			this.client.commands.commandsList.get(interaction.commandName);
		if (!base) return;

		const commandGroup: CommandGroup = {
			command: new base[0](base[1]),
			metadata: base[1],
			subcommand: null,
			subcommandGroup: null,
		};

		const [maybeSub, maybeGroup]: [string | unknown, string | unknown] = [
			Client.tryTo(interaction.options.getSubcommand),
			Client.tryTo(interaction.options.getSubcommandGroup),
		];

		if (maybeSub) {
			if (maybeGroup)
				commandGroup.subcommandGroup = base[1].subcommandGroups.filter(
					(group: CommandMetadataSubgroup): boolean => group.id === maybeGroup,
				)[0];

			commandGroup.subcommand = (
				maybeGroup ? commandGroup.subcommandGroup || base[1] : base[1]
			).subcommands.filter(
				(sub: CommandMetadataBase): boolean =>
					sub.id === `${base[1].id} ${maybeGroup ? `${maybeGroup} ` : ''}${maybeSub}`,
			)[0];
		}

		return commandGroup;
	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * Function that encapsulates the command detection, authorization and execution.
	 * @param interaction The associated interaction.
	 * @returns The issue of the command.
	 */
	public async detectAndLaunchSlashCommand(
		interaction: ChatInputCommandInteraction,
	): Promise<COMMAND_END> {
		const commandGroup: CommandGroup = this.getCommandFromInteraction(interaction);
		if (commandGroup.command)
			return commandGroup.command.launch(this.client, interaction, commandGroup);
		return COMMAND_END.SUCCESS;
	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * The decorator to inject metadata into the constructor of Command.
	 * @param metadata The metadata of the command.
	 * @returns The decorator.
	 */
	public inject(metadata: CommandMetadata): InstanceInjector {
		const instance: CommandManager = Object.assign({}, this);
		return function (target: CommandInjectorTarget): void {
			new Logger().log('info', `Bound command: ${metadata.id}`);

			if (!('src' in metadata))
				throw new Error(
					`A slash-based command shall have a 'src' property into its metadata.`,
				);

			const discordDataOnly: APIApplicationCommand =
				metadata.src as unknown as APIApplicationCommand;
			instance.discordCommandsData.push(discordDataOnly);

			instance.commandsList.set(metadata.id, [target as typeof Command, { ...metadata }]);
		};
	}
}
