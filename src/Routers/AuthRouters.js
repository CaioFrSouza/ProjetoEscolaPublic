const express = require('express')
const authController = require('../Controller/authController')

const Router = express.Router()

Router.post('/login',async(req,res)=> {
    const json = req.body
    c = await authController.login(res,json)
    if(c.err){
        return res.render('login',{
            err:c.err
        })
    }
    res.cookie('token',c)
    res.redirect('../../')

})

Router.get('/login',async(req,res)=> {
    const {token} = req.cookies
    if(token)
        return res.redirect('../../')
    res.render('login')
})

Router.post('/cadastro',async(req,res)=> {
    const json = req.body
    const e = await authController.cadastro(res,json)
    if(e.err)
        res.render('cadastro',{
            err:e.err
        })
    res.cookie('token',e)
    res.redirect('../../')
})

Router.get('/cadastro',async(req,res)=> {
    const {token} = req.cookies
    if(token)
        return res.redirect('../../')
    res.render('cadastro')
})


module.exports = app => app.use('/auth',Router)