import { PubSubEngine } from 'graphql-subscriptions';
import { MongoCRUDService } from '.';
import { GraphbackRuntimeContext } from './api/GraphbackRuntimeContext';
import { MongoDBDataProvider } from './data/MongoDBDataProvider';
 
/**
 * Create context object required for the graphback runtime layer 
 */
export const createMongoDbRuntimeContext = (db:any,pubSub: PubSubEngine): GraphbackRuntimeContext => {
  const crudDb = new MongoDBDataProvider(db);
  const crudService = new MongoCRUDService(crudDb, pubSub);

  return {
    crudService,
    crudDb,
    pubSub
  };
}
