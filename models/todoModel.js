const mongoose = require("mongoose")
const Schema = mongoose.Schema;



const todoSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type:String,
    },
    body: {
        type:String,
        required: true
    },
    priority: {
        type:String,
       
    },
    completed: {
        type: Boolean,
        default:false
    },
    pinned: {
        type: Boolean,
        default: false
    },
    archived: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    adminOwner: {
        type:String,
    }


}, { timestamps: true })

const Todo = mongoose.model("todo", todoSchema)

module.exports = Todo