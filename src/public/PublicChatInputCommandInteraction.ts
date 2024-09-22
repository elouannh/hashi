import { ChatInputCommandInteraction, Client, APIInteraction } from 'discord.js';

/**
 * The public remaster of the Discord.js interaction.
 */
export class PublicChatInputCommandInteraction extends ChatInputCommandInteraction {
	constructor(...args: unknown[]) {
		super(args[0] as Client<true>, args[1] as APIInteraction);
	}
}
