import { PubSubEngine } from 'graphql-subscriptions';
import * as Knex from 'knex'
import { CRUDService, PgKnexDBDataProvider } from '.';
import { GraphbackRuntimeContext } from './api/GraphbackRuntimeContext';
 
/**
 * Create context object required for the graphback runtime layer 
 */
export const createKnexRuntimeContext = (pubSub: PubSubEngine): GraphbackRuntimeContext => {
  const crudDb = new PgKnexDBDataProvider();
  const crudService = new CRUDService(crudDb, pubSub);

  return {
    crudService,
    crudDb,
    pubSub
  };
}

//changed