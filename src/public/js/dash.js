function navbar(name,href) {
    $('.lista').append(`<li class="nav-item active"> <a class="nav-link" href=${href} data-abc="true">${name}<span class="sr-only"></span></a> </li>`)
}
function CalcularMediaTotal(arr = [0,0],atvs = 0) {
    let soma = 0
    let media = 0
    for(let i in arr){
        soma = Number(soma)+ Number(arr[i].nota)
    }
    media = Number(soma)/atvs
    
    return Math.round(media)
}
function nameResponsive(name ="") {
    let win=$(window).width();
    if(win >650)
    return name
    const arr = name.split(" ",3)
    return arr[0]
}
function gerarGrafico (nomes=[],colors=[],data=[],alunos=[]){
    const alunosArray = []
    alunos.forEach(element =>{ if(element.atividadesFeitas.length){alunosArray.push(nameResponsive(element.name))}})
    const GraficoPadrão = {
        type:"bar",
        data:{
            labels:alunosArray,
            datasets:[]},
            options:{
                legend:{
                    position:'bottom',
                     //display: true,
                },
                scales:
                { 
                    yAxes:[{
                        ticks:{
                            beginAtZero:true
                        }
                    }]
                }
            }
    }
    GraficoPadrão.data.datasets.push({
        label:"Médias",
        data:data.mediaNasMaterias.Médias,
        backgroundColor:colors[0],
        borderColor:'black',
        borderWidth: 1
    })
    for (let i in nomes){
        if(data.atividades[nomes[i]][0])
        GraficoPadrão.data.datasets.push({
            label:data.atividades[nomes[i]][0].materia,
            data:data.mediaNasMaterias[nomes[i]],
            backgroundColor:colors[i],
            borderColor:'black',
            borderWidth: 1
        })
    }
    return GraficoPadrão 
}
function Atividades(arr=[],materiaPes,alunos){
    let numbers = []
    let result = {
        atividades:{},
        fizeram:{},
        mediaNasMaterias:[],
        mediaTotal:[]
    }
    for (let m in materiaPes){
        result.atividades[materiaPes[m]] = arr.filter(v => {
            return v.materia == materiaPes[m]
        })
    }
    arr.forEach((atvs,i) => {
        let id = atvs.id
        let nameMateria = atvs.materia
        if(!result.fizeram[nameMateria])
            result.fizeram[nameMateria] = []
         alunos.forEach((alunos,index) => {
             let {name,email,number,professor} = alunos
             alunos.atividadesFeitas.forEach(atv => {
                 if(result.fizeram[nameMateria].email != email)
                 if(id==atv.AtvId ){
                     result.fizeram[nameMateria].push( {name,email,number,professor,id:atv.AtvId,nota:atv.nota} )
                    }
                });
            });
        });
        alunos.forEach(alunos =>{if(alunos.atividadesFeitas.length)
        result.mediaTotal.push(CalcularMediaTotal(alunos.atividadesFeitas,arr.length))})
        for(let i in materiaPes) {
            if(!result.mediaNasMaterias[materiaPes[i]])
            result.mediaNasMaterias[materiaPes[i]] = []
          if(result.fizeram[materiaPes[i]]){
            result.fizeram[materiaPes[i]].forEach((element) => {
                const number = element.number
                let arr = []
                if(numbers.indexOf(number) <= -1)
                    numbers.push(number)
                let index = numbers.indexOf(number)
                if(!result.mediaNasMaterias[materiaPes[i]][index])
                result.mediaNasMaterias[materiaPes[i]][index] = []
                
                result.mediaNasMaterias[materiaPes[i]][index].push(element)
            });
            result.mediaNasMaterias[materiaPes[i]].forEach((element,index,array)=> {
                result.mediaNasMaterias[materiaPes[i]][index] = CalcularMediaTotal(element,result.atividades[materiaPes[i]].length)
            })
        }
    }
                result.mediaNasMaterias.Médias = result.mediaTotal
                return result
      }

        


function grafico(findUsers,atvs,all) {
    const ctx = $('#mychart')
    const mediasChart = $('.medias-Chart')
    let users = findUsers
    let names = ['Médias',"Matematica","Português","Filosofia","Sociologia","Geografia","Historia","Biologia","Fisica"]
    let colors = ["#4b0082","#D8D800","#0058D8","#D88900","#6B6B6B","#FF9A20","#764200","#007607","#971919"]
    let data = Atividades(all,names,users)
    new Chart(ctx,gerarGrafico(names,colors,data,users))
    mediasChart.css('display',"block")
    list(["N°","Nome","Atividades Feitas","Média"],data,findUsers)
}
function list(titles=[''],atvs,bodys=
    {
        n:[0],
        nome:['sla'],
        nota:['sla']
    }
){
    console.log(atvs)
    $('.medias-Alunos').css('display',"block")
    let title = $('.listaTitles')
    let body = $(".listaBody")
    for(let i in titles){
        title.append(`<th scope="col">${titles[i]}</th>`)
    }
    let counter = 0 
    for(let i in bodys){
        let name = atvs.mediaTotal[counter]
        if(bodys[i].atividadesFeitas.length){
        body.append(`
        <tr>
        <th scope="row">${bodys[i].number}</th>
        <td>${nameResponsive(bodys[i].name)}</td>
        <td>${bodys[i].atividadesFeitas.length}</td>
        <td>${name}<td>
        </tr>
        `); counter = counter +1}
    }
}

navbar('Adicionar atividade','/addAtv')
$(document).ready(async()=> {
    const findUsers = await $.post('users')
    const atividades = await $.post('atv')
    const listAll = await $.post('allAtv')
    grafico(findUsers,atividades,listAll)
})