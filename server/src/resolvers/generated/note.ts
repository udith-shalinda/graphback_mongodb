// import { validateRuntimeContext } from "@graphback/";
import { Resolvers } from "../../generated-types"
import { PubSubConfig } from '@graphback/runtime/types/service/PubSubConfig';
import { loadSchemaFiles } from '@graphql-toolkit/file-loading';
import { buildSchema } from 'graphql';
import { createMongoDbRuntimeContext } from '../../new_version/src';
import { join } from 'path';
import { PubSub } from 'apollo-server-express';
// import { validateRuntimeContext } from '../../mongo_model/src';
const url = "mongodb+srv://max:ODjmkgYPiqNhMgTk@testone-e21ea.mongodb.net/graphql_practice";
const MongoClient = require('mongodb').MongoClient;

const client = new MongoClient(url, { useNewUrlParser: true });
// console.log(client);
const pubSub = new PubSub();



export default {
  Note: {
    comment: (parent, args, context) => {
      // validateRuntimeContext(context)
      return context.crudService.batchLoadData("comment", "commentId", parent.id, context);
    }
  },

  Query: {
    findNotes: (_, args, context) => {
      // validateRuntimeContext(context)
      return context.crudService.findBy("note", args.fields);
    },
    findAllNotes: (_, args, context) => {
      // validateRuntimeContext(context)
      console.log(context);
      // console.log(schema);
      // return createMongoDbRuntimeContext("Note",schema,client,pubSub as PubSubConfig).findAll();
      return context.note.findAll();
    }
  },

  Mutation: {
    createNote: (_, args, context) => {
      // validateRuntimeContext(context)
      return context.crudService.create("note",args.input, {
        publishEvent: false
      }, context);
    },
    updateNote: (_, args, context) => {
      // validateRuntimeContext(context)
      return context.crudService.update("note", args.id, args.input, {
        publishEvent: false
      }, context);
    }
  }
} as Resolvers
