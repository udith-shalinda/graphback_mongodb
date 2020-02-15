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
      return context.crudService.findBy("note", args.fields);
    },
    findAllNotes: (_, args, context) => {
      validateRuntimeContext(context)
      return context.crudService.findAll("note");
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
    return context.crudService.create("note",args.input);
    },
    updateNote: (_, args, context) => {
      validateRuntimeContext(context)
      return context.crudService.update("note", args.id, args.input, {
        publishEvent: false
      }, context);
    }
  }
} as Resolvers
