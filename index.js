const express = require('express')
const _SERVER_CONFIG = require('./src/Config/serverConfig.json')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const http = require('http').createServer(app)

app.set('views',`${__dirname}/src/views`)
app.set('view engine','pug')

app.use(bodyParser())
app.use(cookieParser())
app.use('/auth',express.static(`${__dirname}/src/public`))
app.use('/',express.static(`${__dirname}/src/public`))


require('./src/Routers/AuthRouters')(app)
require('./src/Routers/atvRouters')(app)

http.listen(Number(_SERVER_CONFIG.port), ()=> {
    console.clear()
    console.log('Servidor iniciado')
    console.log(`Sevidor rodando na porta ${_SERVER_CONFIG.port}`)
})