import { PubSubEngine } from 'graphql-subscriptions';
// import { GraphbackRuntimeContext } from './api/GraphbackRuntimeContext';
import { MongoDBDataProvider } from './data/MongoDBDataProvider';
// import { CRUDService} from "./index"
import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { PubSubConfig } from './service/PubSubConfig';
import { CRUDService } from '@graphback/runtime';
// import { GraphbackRuntimeContext } from '../../mongo_model/src';

 
/**
 * Create context object required for the graphback runtime layer 
 */
export const createMongoDbRuntimeContext = (
  modelName: string, schema: GraphQLSchema,
  db: any, pubSubConfig: PubSubConfig
) => {
  const modelType = schema.getType(modelName) as GraphQLObjectType
  console.log(modelType);
  if (modelType === undefined) {
    throw new Error(`
    Schema is missing provided type. 
    Please make sure that you pass the right schema to createCRUDRuntimeContext`)
  }
  const objectDB = new MongoDBDataProvider(modelType,db);

  return new CRUDService(modelType, objectDB, pubSubConfig)
}
