/*POST SCHEMA FOR POSTS CREATED BY USERS */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const postSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  heading:{
    type:String,
    required:true
  },
  name:{
    type:String,
    required:true
  },
  posttext: {
    type: String,
    required: true
  },
  createrpic:{
    type:String
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  dislikes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  comments :[
      {
        user: {
        type:Schema.Types.ObjectId,
        ref:"users"
        },
        username:{
          type:String,
          required:true
        },
        text:{
            type:String,
            required:true
        },
        createdAt:{
            type:Date,
            default:Date.now()
        }
      }
  ],
  createdAt:{
      type:Date,
      default:Date.now()
  }
});

module.exports = mongoose.model("posts",postSchema);