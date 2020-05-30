const UsersModel = require('../Models/Users')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const _SERVER_CONFIG = require('../Config/serverConfig.json')

const tokenGen = async id => {
    return jwt.sign(id,_SERVER_CONFIG.scretHash,{
        expiresIn:"86400"
    })
}

const login = async(res,json) => {
    try{
    const password = json.password
    const email = json.email
    const user = await UsersModel.findOne({email})
    if(!user)
        return {err:'Usuario não encontrado'}
    if(!await bcryptjs.compare(password,user.password))
        return {err:'Senha incorreta'}
    let id = {id :user._id}
    let token = await tokenGen(id)
    return token
}
    catch(e){
        console.log(e)
        return {err:"Erro com o servidor"}
    }
}

const cadastro = async(res,json) => {
    try{
    const email = json.email
    if(!await UsersModel.findOne({email})) {
        json.password = await bcryptjs.hash(json.password,10)
        const user = await UsersModel.create(json)
        let id = {id :user._id}
        let token = await tokenGen(id)
        return token
    }
    else {
    return {err:'Usuario já cadastrado'}}}
    catch(e){
        console.log(e)
        return {err:'Erro com o servidor'}
    }
}

const listAll =() => new Promise((resolve,reject) => {
    {
        try{
            const users = []
            UsersModel.find((err,res)=> {
                if(err)
                return {err}
                for (let i in res){
                    res[i].password = undefined
                    users.push(res[i])
                }
                resolve( users )
            })
        }catch(e) {
            console.log(e)
            reject ({err:e})
        }
    }
}) 
module.exports = {
    cadastro,login,listAll
}