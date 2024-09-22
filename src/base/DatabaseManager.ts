/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   DatabaseManager.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ehosta <ehosta@student.42lyon.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/07/27 20:04:50 by ehosta            #+#    #+#             */
/*   Updated: 2024/07/28 15:18:30 by ehosta           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { connect, ConnectOptions, Model } from 'mongoose';
import { BaseClient, DataMap, DataMapsObject, Logger, TypedDataMapStored } from './';
import {
	ObjectDeepValidator,
	StringValidator,
	ObjectValidator,
	ArrayDeepValidator,
} from '../decorators';
import { StructureColumnOrChild, SuperModel } from '../root';

/**
 * The class who manages the database of the project.
 */
export class DatabaseManager extends BaseClient {
	/**
	 * The database name. Not useful to change it (only for MongoDB). Default: main.
	 */
	@StringValidator.ValidId
	public dbName: string;

	/**
	 * The connection URI.
	 */
	@StringValidator.NotEmpty
	public connectionURI: string;

	/**
	 * The options for the connection.
	 */
	@ObjectValidator.Matches
	public connectOptions: ConnectOptions;

	/**
	 * The list of dataMaps.
	 */
	@ObjectDeepValidator.KeyDataMapPair(DataMap)
	public dataMaps: DataMapsObject = {};

	/**
	 * The list of dataMaps constructor waiting for being initialized.
	 */
	@ArrayDeepValidator.OnlyConstructorOf(SuperModel)
	public sleepingSuperModels: SuperModel[] = [];

	/**
	 * Build and save a data map.
	 * @param name The name of the collection.
	 */
	public createDataMap(name: string): DataMap<TypedDataMapStored> {
		const dataMap: DataMap<TypedDataMapStored> = new DataMap<TypedDataMapStored>(
			this.client,
			name,
		);
		this.dataMaps[name] = dataMap;
		return dataMap;
	}

	/**
	 * Connect the database to the mongodb cluster.
	 * @param connectionURI The connection URI.
	 * @param connectOptions The connection options.
	 */
	public async connect(
		connectionURI: string = this.connectionURI,
		connectOptions: ConnectOptions = { dbName: this.dbName },
	): Promise<void> {
		if (connectionURI) this.connectionURI = connectionURI;
		if (connectOptions) this.connectOptions = connectOptions;

		await connect(this.connectionURI, this.connectOptions);
	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * The decorator to inject metadata into the constructor of an extension of SuperModel.
	 * @param name The name of the super-SuperModel.
	 * @param columns The columns object.
	 * @returns The decorator.
	 */
	public inject(name: string, columns: StructureColumnOrChild): SuperModel {
		new Logger().log('info', `Bound model: ${name}`);

		this.dataMaps[name] = new DataMap<TypedDataMapStored>(this.client, name);
		this.createDataMap(name);

		const superModel: SuperModel = new SuperModel(name, columns);
		this.dataMaps[name].definition = superModel;

		return superModel;
	}

	/**
	 * Get a table and its model.
	 * @param name The name of the table.
	 * @returns The model of the table.
	 */
	public get(name: string): Model<NonNullable<unknown>> {
		const table: DataMap<NonNullable<unknown>> = this.dataMaps[name];
		if (!table) return null;

		return table.definition.model;
	}
}
