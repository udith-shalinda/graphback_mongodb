import { validateRuntimeContext } from "@graphback/runtime";
import { Resolvers } from "../../generated-types"
const Comment = require('./../../mongo_model/Comment')

export default {
  Query: {
    findComments: (_, args, context) => {
      validateRuntimeContext(context)
      return context.crudService.findBy(Comment, args.fields);
    },
    findAllComments: (_, args, context) => {
      validateRuntimeContext(context)
      return context.crudService.findAll(Comment);
    }
  },

  Mutation: {
    createComment: (_, args, context) => {
      validateRuntimeContext(context)
      const comment = new Comment({
        title:args.input.title,
        description:args.input.description,
    })
    return context.crudService.create("model",comment);
    },
    updateComment: (_, args, context) => {
      validateRuntimeContext(context)
      return context.crudService.update(Comment, args.id, args.input, {
        publishEvent: false
      }, context);
    }
  }
} as Resolvers
