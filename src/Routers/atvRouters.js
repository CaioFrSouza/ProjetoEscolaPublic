const express = require('express')
const auth = require('../middleware/auth')
const authController = require('../Controller/authController')
const Works = require('../Controller/WorksController')
const materias = require('../Config/materias.json')

const Router = express.Router()

Router.get('/', auth , async(req,res) => {
    res.render('home')

})
Router.get('/dash',auth,async(req,res)=> {
    if(!req.id.user.professor)
        return res.redirect('../')
    res.render("dash")
})
Router.post('/users',auth,async(req,res)=> {
    if(!req.id.user.professor)
    return res.redirect('../')
    const users = await authController.listAll()
    res.status(200).send(users)
})
Router.post('/atv',auth,async(req,res)=> {
    atividadesFeitas = req.id.user.atividadesFeitas
    const find = await  Works.find(atividadesFeitas)
    res.send(find)
})
Router.post('/allAtv',auth,async(req,res)=> {
    const find = await  Works.listAll()
    res.status(200).send(find)
})
Router.post('/user',auth,async(req,res)=>{
    let user = req.id.user
    res.send(user)

})
Router.get('/addAtv',auth,async(req,res) => {
    if(!req.id.user.professor)
        return res.redirect('../')
    res.render('adicionarAtividade')
})
Router.post('/addAtv',auth,async(req,res)=> {
    const json = req.body
    await Works.add(json)
    res.status(200).send({sucess:"sucess"})
})
Router.post("/findAtv",auth,async(req,res)=> {
    const json = req.body
    const doc = await Works.findByid(json.id)
    res.send({doc})
})
Router.get('/teste',auth,async(req,res)=>{
    res.render('teste')
})
Router.post('/quest',auth,async(req,res)=> {
    const json = req.body
    const respostas = await Works.corrigir(json)
    res.status(200).send({respostas})
})

Router.post('/materias',auth,async(req,res)=> {
    res.status(200).send(JSON.parse(materias))
})
module.exports = app => app.use('/',Router)