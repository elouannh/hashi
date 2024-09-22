/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Placeholder.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ehosta <ehosta@student.42lyon.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/07/27 20:08:16 by ehosta            #+#    #+#             */
/*   Updated: 2024/07/28 15:06:33 by ehosta           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { StringValidator } from '../decorators';

/**
 * The placeholder class when data is missing.
 */
export class Placeholder {
	/**
	 * The value.
	 */
	@StringValidator.NotEmpty
	public readonly value: string = 'placeholder';
}
