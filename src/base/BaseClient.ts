/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   BaseClient.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ehosta <ehosta@student.42lyon.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/07/27 19:49:56 by ehosta            #+#    #+#             */
/*   Updated: 2024/07/28 15:20:04 by ehosta           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { ObjectDeepValidator } from '../decorators';
import { Client } from '../root';

/**
 * The base class for each class of the ./base folder. Each class from (this) the src/base folder
 * is an extend of this class.
 */
export class BaseClient {
	@ObjectDeepValidator.IsInstanceOf(Client)
	public client: Client;

	/**
	 * Initialize the base class with the main client instance.
	 * @param client The client instance.
	 */
	constructor(client: Client) {
		this.client = client;
	}
}
