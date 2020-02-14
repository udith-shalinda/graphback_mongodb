import { validateRuntimeContext } from "@graphback/runtime";
import { Resolvers } from "../../generated-types"
const mongoose = require('mongoose');
const Comment = require('./../../mongo_model/Comment')

export default {
  Query: {
    findComments: (_, args, context) => {
      // validateRuntimeContext(context)
      if(args.fields.id){
        // const dataType:Model=mongoose.Model()
        return Comment.find({_id:args.fields.id});
      }
      return Comment.find(args.fields);
    },
    findAllComments: (_, args, context) => {
      // validateRuntimeContext(context)
      return Comment.find();
    }
  },

  Mutation: {
    createComment: (_, args, context) => {
      // validateRuntimeContext(context)
      const comment = new Comment({
        title:args.input.title,
        description:args.input.description,
        noteId:args.input.noteId
      });
      return comment.save();
    },
    updateComment: (_, args, context) => {
      // validateRuntimeContext(context)
      return Comment.updateOne({_id:args.id},args.input)
      .then((result :any)=>{
          console.log("comment updated")
          return Comment.findOne({_id:args.id});
      });  
    }
  }
} as Resolvers
