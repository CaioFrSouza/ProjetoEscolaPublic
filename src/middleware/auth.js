const jwt = require('jsonwebtoken')
const authController = require('../Controller/authController').findById
const _SERVER_CONFIG = require('../Config/serverConfig.json').scretHash
const Users = require('../Models/Users')
module.exports = async(req,res,next) => {
    const {token} = req.cookies
    if(!token)
        return res.redirect('/auth/login')
    jwt.sign(token,_SERVER_CONFIG,(err,decoded)=> {
        if(err)
            return {err:'Erro'}
    })
    id = jwt.decode(token)
    let user = await Users.findOne({_id:id.id})
    if(user.password)
        user.password = undefined
    req.id = {id,user}


    next()
}