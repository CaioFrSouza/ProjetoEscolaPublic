(async function(){
let user = await $.post('user')
if(user.professor){
    menu('Adicionar atividade','/addAtv')
    menu("Diário","/dash")
}})()
$(document).ready(async()=> {
    FinalCard(true,"Carregando....",false,true,"")
    let user = await $.post('user')
    
    let urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get("id")


    if(id){
        
        FinalCard(true,"Carregando....",false,true)
        let atividade = await $.post('/findAtv',{id})
        if(!atividade.doc.err){
        $('.img').html('<img src="image/volta.svg" class="navbar-brand img" alt="Voltar">')
        const perguntas = atividade.doc.atividade
        const {title,content} = atividade.doc
        titleAtv(title,content)
        for(let i in perguntas){
        const {opcoes,txt} = perguntas[i]
        perguntasAppend(Number(i)+1,txt,opcoes.opcao1,opcoes.opcao2,opcoes.opcao3,opcoes.opcao4)
        FinalCard(true,"Aperte o botão para corrigir e enviar",true,false) 
    }
    $('#btn').click(()=> {
        dados = {
            userId : user._id,
            atvId : atividade.doc._id,
            quest:[],
            materia:atividade.doc.materia
        }
        for(i in perguntas){
            dados.quest[i] = $(`[name= op-${Number(i)+1}]:checked`).val()

            if(!dados.quest[i])
                return FinalCard(true,"Aperte o botão para corrigir e enviar",true,false,"Responda todas as questões antes de enviar")
        }
        FinalCard(true,"Carregando...",false,true)
        $.post('../quest',{dados}).done((data)=> {
            $('.atv').html('')
            if(!data.respostas.err){
            const {nota,respostasCertas} = data.respostas
            resposta(nota,respostasCertas)
            if(nota >= 4)
                $('.nota').css('color','green')
            if(nota <= 4)
                $('.nota').css('color','red')
            FinalCard(false)
            return
            }
            FinalCard(false)
            err("Parece que vc já fez essa atividade","Aperte o botão para retornar à pagina inicial")
        })
    })
    return
}}
    
    $.post('atv').done(data => {
        FinalCard(false)
        console.log(data)
        for(let i in data){
            if(data[i])
               appe(data[i].title,data[i].content,data[i]._id)
            }
                final()
    
        $('.btn').click((e)=>{
            $('.inf').html('')
            FinalCard(true,'Carregando...',false,true)
        })
    })
})
function appe (title,body,id) {
    $('.inf').append(`
    <div class="container">
    <div class="row align-items-center">
    <div class = "card col-sm card0">
    <div class = "card-body">
    <h5 class = class="card-title title" style ="text-align: center">Atividade sobre ${title}</h5>    
    <p class="card-text">Descrição: ${body}<p>
    <a href="?id=${id}" class="btn1 btn btn-primary">Fazer atividade</a>
            </div>
            </div>    
            </div>
            </div> `)
}
function menu (name,ref){
    $('.lista').append(`<li class="nav-item active"> <a class="nav-link" href=${ref} data-abc="true">${name}<span class="sr-only"></span></a> </li>`)
}

function FinalCard (aparecer = false,title="",btn=false, Loading=false,err=""){
    if(aparecer){
        $(".cardCar").css('display,block')
    $('.cardtitle').css('display','block').html(`<h5 class="">${title}</h5>`)
    if(err.length){
        $('.err').html(`<p class="err2">${err}</p>`)
    }
    if(btn)
        $('.btnCard').css('display','block')
    if(Loading)
        $(".loading").css('display','block')
    else{$(".loading").css('display','none')}
    }
    
        else{
        $(".cardCar").css('display','none');
        $(".loading").css('display','none');
        $(".btnCard").css('display','none');
        $(".cardtitle").css('display','none');
        $(".loading").css('display','none');
    }
    }
// html 
function perguntasAppend (numero,label,textoopcao1,textoopcao2,textoopcao3,textoopcao4) {
    $('.atv').append(`    <div class="container align-center lista">
    <div class="row align-items-center shadow-lg ">
    <div class="card col-sm">
        <div class="card-body">
            <h5 class="card-header">Questão: ${numero}<h5>
            <form action "">
            <div class="form-group">
            <label id ="text-${numero}" class="texto">${label}</label>
            </div>
            
            <div class='form-check'>
            <input class="form-check-input" type="radio" id= "check-1-${numero}"  name= "op-${numero}" value ="option1">
            <label type = 'text' for ='check-1-${numero}'> ${textoopcao1} </label>
            </div>

            <div class='form-check'>
            <input class="form-check-input" type="radio" id= "check-2-${numero}"  name= "op-${numero}" value ="option2">
            <label type = 'text' class="questao-2-${numero}" for ='check-2-${numero}'> ${textoopcao2} </label>
            </div>
            
            <div class='form-check'>
            <input class="form-check-input" type="radio" id= "check-3-${numero}" name= "op-${numero}" value ="option3">
            <label type = 'text' for ='check-3-${numero}'> ${textoopcao3} </label>
            </div>
            <div class='form-check'>
            <input class="form-check-input" type="radio" id= "check-4-${numero}" name= "op-${numero}" value ="option4">
            <label type = 'text' for ='check-4-${numero}'> ${textoopcao4} </label>
            </div>
                </div>
            </div>
            </form>
        </div>
</div>  `)
}
function titleAtv (title,des) {
    $('.titleAtv').html(`
    <div class="container align-center">
        <div class="row align-items-center">
        <div class="card col-sm">
        <div class="card-body">
            <h5 class="title">Atividade ${title}</h5>
            <label>${des}</label>
            </div>
        </div>
    </div>
</div>
    `)
}

function resposta(nota,certas){
    $('.titleAtv').html(`
    <div class="container align-center">
        <div class="row align-items-center">
        <div class="card col-sm">
        <div class="card-body">
            <h5 class="title">Resultado da atividade</h5>
            <p class="nota">Parece que você acertou ${certas} questões </p>
            <p class="nota">A sua nota nessa atividade foi ${nota}</p>
            </div>
        </div>
    </div>
</div>
    `)
}

function err (err,errtext) {
    $(".titleAtv").html(`<div class="container align-center">
    <div class="row align-items-center">
    <div class="card col-sm">
    <div class="card-body">
        <h5 class="title">${err}</h5>
        <p class="nota">${errtext}</p>
        <a href="../" class="btn1 btn btn-primary">Voltar para a pagina inicial</a>
        </div>
    </div>
</div>
</div>`)
}
function final() {
    $('.inf').append(`
    <div class="container align-center card-img">
    <div class="row align-items-center">
    <div class="card col-sm shadow">
    <img src = "image/final.svg" class="card-img-top">
    <p class="card-title">Parabéns</p>
    <p class="card-text">Parece que você chegou ao fim</p>
    <div class="card-body">
        </div>
    </div>
</div>
</div>`)
}