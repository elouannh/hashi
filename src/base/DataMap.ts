/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   DataMap.ts                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ehosta <ehosta@student.42lyon.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/07/27 20:04:52 by ehosta            #+#    #+#             */
/*   Updated: 2024/07/28 15:21:19 by ehosta           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { BaseClient, DATAMAP_INTENTS, Logger, TypedDataMapStored } from './';
import { ObjectDeepValidator, StringValidator, ArrayValidator } from '../decorators';
import { Client, DataMapEntry, SuperModel } from '../root';

/**
 * The main class. Represents a data map technology.
 */
export class DataMap<DataStructure extends TypedDataMapStored> extends BaseClient {
	/**
	 * The name of the data map.
	 */
	@StringValidator.ValidId
	public name: string;

	/**
	 * The primary key(s). Separate it with a '+' sign.
	 */
	@StringValidator.ValidPrimaryKeys
	public primaryKey: string;

	/**
	 * The default data for the data map.
	 */
	@ObjectDeepValidator.IsInstanceOf(SuperModel)
	public definition: SuperModel;

	/**
	 * Intents for the database. Be careful! Those intents MUST BE set before the launch of the
	 * process.
	 */
	@ArrayValidator.OnlyEnumValues
	public intents: DATAMAP_INTENTS[] = [];

	/**
	 * The constructor of a data map.
	 * @param client The client instance.
	 * @param name The name of the collection.
	 */
	constructor(client: Client, name: string) {
		super(client);
		this.name = name;
	}

	/**
	 * Get some data from the data map.
	 * @param key The key to look for.
	 * @returns The data if found.
	 */
	public async getRaw(
		key: NonNullable<unknown> = this.definition.defaultValues[this.primaryKey],
	): Promise<TypedDataMapStored> {
		const value: TypedDataMapStored = null;
		new Logger().log('debug', key, value);
		return value;
	}

	/**
	 * Automatically refreshes the data map if the data is core flagged.
	 * @returns Nothing.
	 */
	public async refreshCore(): Promise<void> {
		if (!this.intents.includes(DATAMAP_INTENTS.CORE)) return;

		const currentData: TypedDataMapStored = await this.getRaw(
			this.definition.defaultValues[this.primaryKey],
		);
		new Logger().log('debug', currentData);
	}

	/**
	 * Update some data from the database.
	 * @param key The key to look.
	 * @param data The full data.
	 * @param path The path if the data is SQLite.
	 * @returns Nothing.
	 */
	public async update(
		key: NonNullable<unknown> = this.definition.defaultValues[this.primaryKey],
		data: TypedDataMapStored,
		path?: string,
	): Promise<void> {
		new Logger().log('debug', key, data, path);
	}

	/**
	 * Refresh the data in the database if the structure is detected to be different.
	 * @param key The key to look who applies changes on.
	 * @returns The player data.
	 */
	protected async get(
		key: NonNullable<unknown> = this.definition.defaultValues[this.primaryKey],
	): Promise<TypedDataMapStored | DataMapEntry<DataStructure>> {
		const data: TypedDataMapStored = await this.getRaw(key);
		if (!data) return data;

		const structure: this['definition']['defaultValues'] = this.definition.defaultValues;
		let refreshIsRequired: boolean;
		refreshIsRequired = false;

		const compareObj = (source: object, target: object, finalObj: object): object => {
			for (const key of Object.keys(source)) {
				if (this.primaryKey.includes(key)) {
					finalObj[key] = target[key];
					continue;
				}
				if (typeof source[key] !== 'object') {
					finalObj[key] =
						typeof source[key] !== typeof target[key] ? source[key] : target[key];
				} else {
					if (key in target) finalObj[key] = compareObj(source[key], target[key], {});
					else {
						if (typeof finalObj[key] !== 'object') refreshIsRequired = true;
						finalObj = source[key];
					}
				}
			}
			return finalObj;
		};

		const finalStructure = compareObj(structure as object, data as object, {});
		if (refreshIsRequired) await this.update(key, finalStructure);
		return finalStructure as DataStructure;
	}
}
