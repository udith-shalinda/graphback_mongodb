import { validateRuntimeContext } from "@graphback/runtime";
import { Resolvers } from "../../generated-types"
import { NoteModel } from '../../mongo_model/NoteModel';
const Event = require('./../../mongo_model/Event')
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
      // console.log("find All notes")
      // return Event.find();
      console.log("reached")
      return Note.find().then((result:NoteModel[])=>{
        return result.map((note:NoteModel)=>{
          return {
            ...note,
            id:note.id,
            title:note.title,
            description:"note.description"
          }
        })
      });
      // return context.crudService.findAll("note");
    }
  },

  Mutation: {
    createNote: (_, args, context) => {
      validateRuntimeContext(context)
      const eve = new Note({
        title:args.input.title,
        description:args.input.description,
    })
    return eve.save();
      // return context.crudService.create("Note", args.input, {
      //   publishEvent: false
      // }, context);
    },
    updateNote: (_, args, context) => {
      validateRuntimeContext(context)
      return context.crudService.update("note", args.id, args.input, {
        publishEvent: false
      }, context);
    }
  }
} as Resolvers

