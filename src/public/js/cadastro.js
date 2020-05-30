$(document).ready(()=> {
    $('form').submit(e=> {
        $('#err').css('visibility','hidden')
        pass1 = $('[name=password2]').val()
        pass2 = $('[name=password]').val()
        if(pass1 !== pass2){
            $('#err').css('visibility','visible')
            e.preventDefault()
        }
        if(pass1.length <7 )
        {
            $('p').css('visibility','visible')
            e.preventDefault()
        }
    })
})