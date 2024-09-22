/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   SuperModel.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ehosta <ehosta@student.42lyon.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/07/27 19:48:30 by ehosta            #+#    #+#             */
/*   Updated: 2024/07/28 14:45:44 by ehosta           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import {
	Document,
	model,
	Model,
	Schema,
	SchemaDefinition,
	SchemaDefinitionProperty,
} from 'mongoose';
import { ObjectDeepValidator, ObjectValidator, StringValidator } from '../decorators';
import { Placeholder, StructureColumnOrChild, SuperModelColumn } from './';

/**
 * The class that combines a model and a schema.
 */
export class SuperModel {
	/**
	 * The list of the columns of the collection.
	 */
	@ObjectDeepValidator.KeySuperModelColumnPair(SuperModelColumn)
	public columns: StructureColumnOrChild = {};

	/**
	 * The model class content.
	 */
	@ObjectDeepValidator.KindOfInstance(Model, Placeholder)
	public readonly model: Model<SchemaDefinition & Document>;

	/**
	 * The schema class content.
	 */
	@ObjectDeepValidator.KindOfInstance(Schema, Placeholder)
	public readonly schema: Schema<SchemaDefinition>;

	/**
	 * The model name (the name of the collection).
	 */
	@StringValidator.ValidId
	public readonly name: string = 'default';

	/**
	 * The structure of the model.
	 */
	@ObjectValidator.Matches
	public structure: Record<string, SchemaDefinitionProperty>;

	/**
	 * The default values of the model.
	 */
	@ObjectValidator.Matches
	public defaultValues: Record<string, NonNullable<unknown>>;

	/**
	 * @param name The name of the model.
	 * @param tableStructure The structure of the columns.
	 */
	constructor(name: string, tableStructure: StructureColumnOrChild) {
		this.name = name;
		this.columns = tableStructure as StructureColumnOrChild;

		this.structure = SuperModel.diveObject(this.columns, 'data');
		this.defaultValues = SuperModel.diveObject(this.columns, 'defaultValue');

		this.schema = new Schema<typeof this.structure>(this.structure, this.defaultValues);
		this.model = model<Document & typeof this.structure>(this.name, this.schema);
	}

	/**
	 * Generates a new object based on the property you chose to take into the current
	 * instance-value.
	 * @param obj The object to dive in.
	 * @param propertyName The name of the property to take into the value. If it is empty,
	 * the function won't touch the source.
	 * @returns An object (the finale one or a child).
	 */
	private static diveObject(obj: object, propertyName?: string) {
		obj = Object.assign({}, obj);
		if ('data' in obj && ('type' in obj || 'defaultValue' in obj))
			return propertyName ? obj[propertyName] : obj;

		if (typeof obj === 'object' && typeof obj !== 'string') {
			const result: object = {};

			for (const key in obj)
				result[key] = SuperModel.diveObject(obj[key], propertyName ?? undefined);

			return result;
		}

		return obj;
	}

	/**
	 * Get data from the object based on the type of data that will be used after.
	 * Optimize the type forcing.
	 * @param queryParameters The options usually passed into the findOne function.
	 * @returns The fetched data as the correct type.
	 */
	public async findOne<ReturnType extends NonNullable<Document>>(
		...queryParameters: unknown[]
	): Promise<ReturnType> {
		return (await this.model.findOne(...queryParameters).exec()) as unknown as ReturnType;
	}
}
