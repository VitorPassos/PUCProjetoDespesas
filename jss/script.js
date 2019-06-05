function acesso (form) {

    if (form.email.value == "marcio@gmail.com" && form.senha.value == "123456" || 
    form.email.value == "lucas@gmail.com" && form.senha.value == "123456" ||
    form.email.value == "camila@gmail.com" && form.senha.value == "123456" ||
    form.email.value == "vitor@gmail.com" && form.senha.value == "123456" ||
    form.email.value == "matthew@gmail.com" && form.senha.value == "123456" ) {
        location = "/html/paginaprincipal.html" }
    
    else {
        form.email.value = ""
        form.senha.value = ""
        alert ("Dados Inválidos") 
       }
    
    }