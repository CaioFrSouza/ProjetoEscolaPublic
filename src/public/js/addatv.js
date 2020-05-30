const appe = (numero) =>{
    $('.quest').append(
        `      <div class="container align-center lista">
        <div class="row align-items-center shadow-lg ">
        <div class="card col-sm">
            <div class="card-body">
                <h5 class="card-header">Questão: ${numero}<h5>
                <form action "">
                <div class="form-group">
                <label for ="text-${numero}"> Texto da questão ${numero}</label>
                <textarea id ="text-${numero}" class='form-control' rows='4' ></textarea>
                </div>
                
                <div class='form-check'>
                <input class="form-check-input" type="radio" id= "check-1-${numero}"  name= "op-${numero}" value ="option1">
                <input type = 'text' class="form-control form-control-sm form-check questao-1-${numero}" for ='check-1-${numero}' placeholder = "Alternativa 1 ">
                </div>

                <div class='form-check'>
                <input class="form-check-input" type="radio" id= "check-2-${numero}"  name= "op-${numero}" value ="option2">
                <input type = 'text' class="form-control form-control-sm form-check questao-2-${numero}" for ='check-2-${numero}' placeholder = "Alternativa 2 ">
                </div>
                
                <div class='form-check'>
                <input class="form-check-input" type="radio" id= "check-3-${numero}" name= "op-${numero}" value ="option3">
                <input type = 'text' class="form-control form-control-sm form-check questao-3-${numero}" for ='check-3-${numero}' placeholder = "Alternativa 3 ">
                </div>
                <div class='form-check'>
                <input class="form-check-input" type="radio" id= "check-4-${numero}" name= "op-${numero}" value ="option4">
                <input type = 'text' class="form-control form-control-sm form-check questao-4-${numero}" for ='check-4-${numero}' placeholder = "Alternativa 4 ">
                </div>
                    </div>
                </div>
                </form>
            </div>
    </div>  
`
    )
}
function selectAppend (materias =[]) {
    const selection = $("#selct")
    console.log('sla')
    if(materias)
        for(let i in materias){
            selection.append(`
            <option value="${materias[i]}">${materias[i]}</option>
            `)
        }
}
$(document).ready(()=> {
    const doc = {}
    const materias =  ["Matematica","Português","Filosofia","Sociologia","Geografia","Historia","Biologia","Fisica"]
    selectAppend(materias)
    $('#gerar').click(e=> {
        const select = $('#selct option:selected').val()
        e.preventDefault()
        let questoes =Number ($('#questoes').val())
        let title = $('#title').val()
        let descri =$("#descrição").val()
        let err = $('#err')
        let err2 = $('.err2')
        if(title.length <= 0  || questoes <= 0 || descri.length <= 0 )
            return err.html('Por favor preencha todos os campos')
        
        doc.title = title
        doc.questions= questoes
        doc.content= descri
        doc.materia=select
        $('.title').html(title)
        $("#gerar").css('display','none')
        for(let i = 0; i<questoes;i++){
            appe(i+1)}
        $('.finalizar').css('visibility','visible')
        $('.enviar').html('<button class="btn btn-primary shadow-lg mb-4 send" id ="btn">Salvar</button>')
        $('.send').click(()=>{
            let dados = []
            for (let i = 0; i< doc.questions; i++){
                dados.push({
                    txt:$(`#text-${i+1}`).val(),
                    opcoes:{
                        opcao1:$(`.questao-1-${i+1}`).val(),
                        opcao2:$(`.questao-2-${i+1}`).val(),
                        opcao3:$(`.questao-3-${i+1}`).val(),
                        opcao4:$(`.questao-4-${i+1}`).val(),
                    },
                    respostas:$(`input[name= op-${i+1}]:checked`).val(),
                })
                let txt = dados[i].txt
                let respostas = dados[i].respostas
                let opcoes = dados[i].opcoes
                let opcao = Object.entries(opcoes)
                for (let i in opcao){
                    
                    if(!opcao[i][1].length)
                        return err2.html(`A questão ${Number(i)+1} tem alguma(s) alternativas faltando`)  
                }
                
                if(!respostas)
                    return err2.html(`A questão ${i+1} não tem resposta`)
                if(!txt.length)
                    return err2.html(`A questão ${i+1} não tem texto`)
                doc.atividade = dados
                $('.carregando').html(`<div class="spinner-border">
                <span class='sr-only'>Caregando....</span>
            </div>`)
                $.post('../addAtv',doc,(data)=>{
                    console.log('done')
                    window.location.replace('../')
                })
            }}
        )
    })
})