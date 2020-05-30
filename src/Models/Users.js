const mongoose = require('../Database')
const bcrypt = require('bcryptjs')
const {UsersCollections} = require('../Config/serverConfig.json')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    number:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    professor:{
        type:Boolean,
        required:false,
    },
    materia:{
        type:String,
        required:false
    },
    atividadesFeitas:{
        type:Array,
        required:false,
        default:[]
    }
})

const User = mongoose.model('Users',userSchema,UsersCollections)

module.exports = User