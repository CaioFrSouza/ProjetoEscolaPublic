const mongoose = require('../Database')
const _Server_CONFIG = require('../Config/serverConfig.json').AtvCollections

const WorksSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    PessoasQueFizeramOsTrabalhos:{
        type:Object,
    },
    content:{
        type:String,
        required:false
    },
    materia:{
        type:String,
        required:false
    },
    atividade:{
        type:Array,
        required:true
    },
    questions:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
})

const work = mongoose.model('Work',WorksSchema,_Server_CONFIG)

module.exports = work