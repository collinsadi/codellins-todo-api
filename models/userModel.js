const mongoose = require("mongoose")
const Schema = mongoose.Schema;




const userSchema = new Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    password: {
        type: String,
        required:true
    },
    resToken: {
        type:String
    },
    token: {
        type:String
    },
    owner: {
        type: String,
        required: true
    },
    validated: {
        type: Boolean,
        default: false
    }


},{timestamps:true})

const User = mongoose.model("user", userSchema)

module.exports = User