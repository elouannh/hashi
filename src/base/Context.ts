/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Context.ts                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ehosta <ehosta@student.42lyon.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/07/27 20:04:46 by ehosta            #+#    #+#             */
/*   Updated: 2024/07/28 15:17:41 by ehosta           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import {
	ButtonInteraction,
	ChatInputCommandInteraction,
	InteractionEditReplyOptions,
	InteractionReplyOptions,
	InteractionResponse,
	Message,
	MessagePayload,
	StringSelectMenuInteraction,
	User,
} from 'discord.js';
import { BaseClient, ContextChannel, ContextOptions, Logger } from './';
import { ObjectDeepValidator, ObjectValidator, ArrayValidator } from '../decorators';
import { PublicChatInputCommandInteraction } from '../public';
import { Client, Command } from '../root';

/**
 * The class who manages the front part of an interaction with Discord and the user.
 */
export class Context extends BaseClient {
	/**
	 * The command associated with the context.
	 */
	@ObjectDeepValidator.IsInstanceOf(Command)
	public command: Command = null;

	/**
	 * The users implicated in the context/action.
	 */
	@ArrayValidator.OnlyUsers
	public users: User[] = [];

	/**
	 * The channel where the action occurs.
	 */
	@ObjectValidator.ContextChannelInitial
	public channel: ContextChannel = null;

	/**
	 * The interaction, if there is one.
	 */
	@ObjectDeepValidator.IsInstanceOf(PublicChatInputCommandInteraction)
	public interaction: ChatInputCommandInteraction = null;

	/**
	 * The interaction button, if there is one.
	 */
	@ObjectValidator.Matches
	public buttonInteraction: ButtonInteraction = null;

	/**
	 * The interaction dropdown, if there is one.
	 */
	@ObjectValidator.Matches
	public dropdownInteraction: StringSelectMenuInteraction = null;

	/**
	 * The reply message data.
	 */
	@ObjectValidator.Matches
	public replyData: null | Message<boolean> | InteractionResponse<boolean> = void null;

	/**
	 * The list of standalone components (future update).
	 */
	public standaloneComponents: object & Record<string, unknown>[][] = [];

	/**
	 * @param client The client instance.
	 * @param options The context options.
	 */
	constructor(client: Client, options: ContextOptions) {
		super(client);

		if (options.command) this.command = options.command;
		this.users = options.users;
		this.channel = options.channel;
		if (options.interaction) this.interaction = options.interaction;
		if (options.buttonInteraction) this.buttonInteraction = options.buttonInteraction;
	}

	/**
	 * Reply to an interaction.
	 * @param messageData The message data to send (Discord.<BaseMessageOptions>).
	 * @param interaction The interaction to reply to.
	 * @returns The message instance, or null if not sent.
	 */
	public async reply(
		messageData: InteractionReplyOptions | string,
		interaction: Context['interaction'] = this.interaction,
	): Promise<Message | InteractionResponse | null> {
		if (!this.channel.isTextBased()) return null;
		let message: null | InteractionResponse | Message;

		try {
			message =
				(await interaction.reply(messageData).catch(new Logger().clean)) ||
				(await interaction.followUp(messageData).catch(new Logger().clean)) ||
				null;
			if (!message) return null;

			this.replyData = message;
		} catch (error: unknown) {
			new Logger().log('error', error);
			return null;
		}

		return message;
	}

	/**
	 * Edit the reply to an interaction.
	 * @param messageData The message data to send (Discord.<BaseMessageOptions>).
	 * @param interaction The interaction to reply to.
	 * @returns The message instance, or null if not sent.
	 */
	public async editReply(
		messageData: InteractionEditReplyOptions | MessagePayload | string,
		interaction: Context['interaction'] = this.interaction,
	): Promise<Message | InteractionResponse | null> {
		if (!this.channel.isTextBased()) return null;
		let message: null | InteractionResponse | Message;

		try {
			message = (await interaction.editReply(messageData).catch(new Logger().clean)) || null;
			if (!message) return null;

			this.replyData = message;
		} catch (error: unknown) {
			new Logger().log('clean', error);
			return null;
		}

		return message;
	}
}
