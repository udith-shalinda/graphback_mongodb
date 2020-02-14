import { getTableName, InputModelTypeContext } from "@graphback/core"
import * as Knex from 'knex';
import { KnexDBDataProvider } from './KnexDBDataProvider';
import { NoDataError } from './NoDataError';
import { NoteModel } from '../../NoteModel';
const Note = require('./../../Note');

/**
 * Knex.js database data provider exposing basic CRUD operations.
 *
 * NOTE: This class implements Postgres specific implementaion that provides more performant object creation than generic `KnexDBDataProvider`
 * that works with the rest of the databases.
 */
// tslint:disable-next-line: no-any
export class PgKnexDBDataProvider<Type = any, GraphbackContext = any> extends KnexDBDataProvider<Type, GraphbackContext>{

    constructor() {
        super();
    }

    public async create(name: string,  data:any): Promise<Type> {
        const dbResult = await data.save();
        return dbResult;
        throw new NoDataError(`Cannot create ${name}`);
    }
}

//changed
