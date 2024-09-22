/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   PublicChatInputCommandInteraction.ts               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ehosta <ehosta@student.42lyon.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/07/27 20:07:45 by ehosta            #+#    #+#             */
/*   Updated: 2024/07/28 14:43:43 by ehosta           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { ChatInputCommandInteraction, Client, APIInteraction } from 'discord.js';

/**
 * The public remaster of the Discord.js interaction.
 */
export class PublicChatInputCommandInteraction extends ChatInputCommandInteraction {
	constructor(...args: unknown[]) {
		super(args[0] as Client<true>, args[1] as APIInteraction);
	}
}
