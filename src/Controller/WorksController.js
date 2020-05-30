const WorksModel = require('../Models/Works')
const UsersModel = require('../Models/Users')
const logic = require('../logic')
const find = async(atividade) => new Promise((resolve,reject) => {
    try {
    let array = []
     WorksModel.find({}).sort({createdAt:-1}).exec((err,res)=> {
         logic.arrayId(res,atividade).then(r => resolve(r) )
         
    })

}
    catch(e) {
        console.log(e)
        return {err:'Erro com o server'}
    }
})
const listAll = async() => new Promise((resolve,rejct)=> {
    try {
        let array = []
         return WorksModel.find({}).sort({createdAt:-1}).exec((err,res)=>  {
             for(let i in res){
                 if(res[i].materia)
                    array.push({
                        materia:res[i].materia,
                        id:res[i]._id,
                        title:res[i].title
                    })}
                    console.log(array)
                    resolve(array)
        })
    
    }
        catch(e) {
            console.log(e)
            return {err:'Erro com o server'}
        }
})
const findByid = async(id) => {
    try{
        return await WorksModel.findById(id)
    }catch(e){console.log(e); return{err:e}}
}

const add = async(json) => {
    try {
    return await WorksModel.create(json)
}
    catch(e) {
        console.log(e)
        return {err:'Erro com o server'}
    }
}
const corrigir = async(json) => {
    try{
        
        const user = await UsersModel.findById(json.dados.userId)
        const atv = await WorksModel.findById(json.dados.atvId)
        const quest = json.dados.quest

        for(let i = 0; i < user.atividadesFeitas.length; i ++){
            console.log(i)
            console.log(user.atividadesFeitas[i].AtvId ,json.dados.atvId )
            if(user.atividadesFeitas[i].AtvId == json.dados.atvId)
                return {err:'Parece que essa atividade já foi realizada'}
        }
        let respostasCertas = 0
        let nota = 10 / atv.atividade.length
        
        for (let i in atv.atividade){
            if(atv.atividade[i].respostas == quest[i])
            respostasCertas = respostasCertas+1
        }
        nota = nota*respostasCertas
        nota = Math.round(nota)
        const group = {
            AtvId :json.dados.atvId,
            nota,
            respostasCertas
        }
        arr = user.atividadesFeitas.concat([group])
        user.atividadesFeitas = arr
        await user.save()
       return group
    }
    catch(e) {
        return {err:"erro com o servidor"}
    }
}
module.exports = {
    corrigir,
    findByid,
    add,find,
    listAll
}