const mongoose = require('mongoose')
const {mongoUserName,mongoPassword,dataBaseName} = require('../Config/serverConfig.json')

mongoose.connect(`mongodb+srv://${mongoUserName}:${mongoPassword}@cluster0-emomq.gcp.mongodb.net/${dataBaseName}?Writes=true&w=majority`,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).catch()

mongoose.Promise = global.Promise

module.exports = mongoose