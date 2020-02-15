import { getTableName, InputModelTypeContext } from "@graphback/core"
import * as Knex from 'knex';
import { MongoDBDataProvider } from './MongoDBDataProvider';
import { NoDataError } from './NoDataError';

//should replace with old code


/**
 * Knex.js database data provider exposing basic CRUD operations.
 *
 * NOTE: This class implements Postgres specific implementaion that provides more performant object creation than generic `KnexDBDataProvider`
 * that works with the rest of the databases.
 */
// tslint:disable-next-line: no-any
export class PgKnexDBDataProvider<Type = any, GraphbackContext = any> extends MongoDBDataProvider<Type, GraphbackContext>{
    
    // constructor() {
    //     // super();
    // }

    // public async create(name: string,  data:any): Promise<Type> {
    //     const dbResult = await this.db(name).insert(data).returning('*');
    //     if (dbResult && dbResult[0]) {
    //         return dbResult[0]
    //     }
    //     throw new NoDataError(`Cannot create ${name}`);
    // }
}

//changed
