import { validateRuntimeContext } from "@graphback/runtime";
import { Resolvers } from "../../generated-types"
const Note = require("./../../mongo_model/Note")


export default {
  Note: {
    comment: (parent, args, context) => {
      validateRuntimeContext(context)
      return context.crudService.batchLoadData("comment", "commentId", parent.id, context);
    }
  },

  Query: {
    findNotes: (_, args, context) => {
      validateRuntimeContext(context)
      return context.crudService.findBy(Note, args.fields);
    },
    findAllNotes: (_, args, context) => {
      validateRuntimeContext(context)
      return context.crudService.findAll(Note);
    }
  },

  Mutation: {
    createNote: (_, args, context) => {
      validateRuntimeContext(context)
      const note = new Note({
        title:args.input.title,
        description:args.input.description,
    })
    // return note.save();
    return context.crudService.create("model",note);
    },
    updateNote: (_, args, context) => {
      validateRuntimeContext(context)
      return context.crudService.update(Note, args.id, args.input, {
        publishEvent: false
      }, context);
    }
  }
} as Resolvers
