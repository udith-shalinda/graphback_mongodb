import { PubSubEngine } from 'graphql-subscriptions';
import { MongoCRUDService } from '.';
import { GraphbackRuntimeContext } from './api/GraphbackRuntimeContext';
import { MongoDBDataProvider } from './data/MongoDBDataProvider';
import { CRUDService } from '@graphback/runtime';
 
/**
 * Create context object required for the graphback runtime layer 
 */
export const createMongoDbRuntimeContext = (db:any,pubSub: PubSubEngine): GraphbackRuntimeContext => {
  const crudDb = new MongoDBDataProvider(db);
  const crudService = new CRUDService(crudDb, pubSub);

  return {
    crudService,
    crudDb,
    pubSub
  };
}
