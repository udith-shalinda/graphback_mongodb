import { validateRuntimeContext } from "@graphback/runtime";
import { Resolvers } from "../../generated-types"

export default {
  Query: {
    findComments: (_, args, context) => {
      validateRuntimeContext(context)
      return context.crudService.findBy("comments", args.fields);
    },
    findAllComments: (_, args, context) => {
      validateRuntimeContext(context)
      return context.crudService.findAll("comments");
    }
  },

  Mutation: {
    createComment: (_, args, context) => {
      validateRuntimeContext(context)
    return context.crudService.create("comments",args.input);
    },
    updateComment: (_, args, context) => {
      validateRuntimeContext(context)
      return context.crudService.update("comments", args.id, args.input, {
        publishEvent: false
      }, context);
    }
  }
} as Resolvers
