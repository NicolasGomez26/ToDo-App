/* ---------------------------------- texto --------------------------------- */
function validarTexto(texto) {
    return texto.length > 3 && texto.length < 15 ? true : false
}


function normalizarTexto(texto) {
    return texto.trim().toLowerCase()
}


/* ---------------------------------- email --------------------------------- */
function validarEmail(email) {
    if (/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(email) && (email.length < 7 && email.length <= 40)) {
        return true
    }
    else{return false}
}

function normalizarEmail(email) {
    return email.trim().toLowerCase() 
}

/* -------------------------------- password -------------------------------- */
function validarContrasenia(contrasenia) {
    let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,16})").test(contrasenia)

    if (strongRegex && (contrasenia.length > 6 && contrasenia.length < 30)) {
        return true
    }
    else{return false}
}

function compararContrasenias(contrasenia_1, contrasenia_2) {
    return contrasenia_1 === contrasenia_2 ? true : false
}

function normalizarContrasenia(contrasenia) {
    return contrasenia.trim()
}