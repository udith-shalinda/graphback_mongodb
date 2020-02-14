// import { validateRuntimeContext } from "@graphback/runtime";
import { Resolvers } from "../../generated-types"
import { NoteModel } from './../../mongo_model/NoteModel';
const Note = require("./../../mongo_model/Note")

export default {
  Note: {
    comment: (parent, args, context) => {
      // validateRuntimeContext(context)
      return null;
      // return context.crudService.batchLoadData("comment", "commentId", parent.id, context);
    }
  },

  Query: {
    findNotes: (_, args, context) => {
      // validateRuntimeContext(context)
      if(args.fields.id){
        return Note.find({_id:args.fields.id});
      }
      return Note.find(args.fields);
    },
    findAllNotes: (_,args,context) => {
      // validateRuntimeContext(context)
      console.log("reached")
      //mapping is not needed
      // return Note.find().then((result:NoteModel[])=>{
      //   return result.map((note:NoteModel)=>{
      //     return {
      //       ...note,
      //       id:note.id,
      //       title:note.title,
      //       description:note.description
      //     }
      //   })
      // });
      return context.crudService.findAll(Note);
    }
  },

  Mutation: {
    createNote: (_, args,context) => {
      // validateRuntimeContext(context)
      const note = new Note({
        title:args.input.title,
        description:args.input.description,
    })
    // return note.save();
    return context.crudService.create("model",note);
    // return context.crudService.create("note", args.input, {
    //   publishEvent: false
    // }, context);

    },
    updateNote: (_, args, context) => {
      // validateRuntimeContext(context)
      return Note.updateOne({_id:args.id},args.input)
        .then((result :any)=>{
            console.log("updated")
            return Note.findOne({_id:args.id});
        });  
    }
  }
} as Resolvers

