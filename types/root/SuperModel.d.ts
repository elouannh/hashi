/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Document, Model, Schema, SchemaDefinition, SchemaDefinitionProperty } from 'mongoose';
import { StructureColumnOrChild } from './';
/**
 * The class that combines a model and a schema.
 */
export declare class SuperModel {
    /**
     * The list of the columns of the collection.
     */
    columns: StructureColumnOrChild;
    /**
     * The model class content.
     */
    readonly model: Model<SchemaDefinition & Document>;
    /**
     * The schema class content.
     */
    readonly schema: Schema<SchemaDefinition>;
    /**
     * The model name (the name of the collection).
     */
    readonly name: string;
    /**
     * The structure of the model.
     */
    structure: Record<string, SchemaDefinitionProperty>;
    /**
     * The default values of the model.
     */
    defaultValues: Record<string, NonNullable<unknown>>;
    /**
     * @param name The name of the model.
     * @param tableStructure The structure of the columns.
     */
    constructor(name: string, tableStructure: StructureColumnOrChild);
    /**
     * Generates a new object based on the property you chose to take into the current
     * instance-value.
     * @param obj The object to dive in.
     * @param propertyName The name of the property to take into the value. If it is empty,
     * the function won't touch the source.
     * @returns An object (the finale one or a child).
     */
    private static diveObject;
    /**
     * Get data from the object based on the type of data that will be used after.
     * Optimize the type forcing.
     * @param queryParameters The options usually passed into the findOne function.
     * @returns The fetched data as the correct type.
     */
    findOne<ReturnType extends NonNullable<Document>>(...queryParameters: unknown[]): Promise<ReturnType>;
}
