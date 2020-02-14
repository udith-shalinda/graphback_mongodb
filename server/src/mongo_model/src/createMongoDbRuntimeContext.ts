import { PubSubEngine } from 'graphql-subscriptions';
import * as Knex from 'knex'
import { MongoCRUDService, PgKnexDBDataProvider } from '.';
import { GraphbackRuntimeContext } from './api/GraphbackRuntimeContext';
 
/**
 * Create context object required for the graphback runtime layer 
 */
export const createMongoDbRuntimeContext = (pubSub: PubSubEngine): GraphbackRuntimeContext => {
  const crudDb = new PgKnexDBDataProvider();
  const crudService = new MongoCRUDService(crudDb, pubSub);

  return {
    crudService,
    crudDb,
    pubSub
  };
}
