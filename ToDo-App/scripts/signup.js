window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    const form = document.forms[0];
    const firstNameInput = document.querySelector('#inputNombre');
    const lastNameInput = document.querySelector('#inputApellido');
    const emailInput = document.querySelector('#inputEmail');
    const passwordInput = document.querySelector('#inputPassword');
    const passwordInputRepetida = this.document.querySelector('#inputPasswordRepetida')
    const url = 'https://ctd-todo-api.herokuapp.com/v1';

    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        //creamos el cuerpo de la request
        const payload ={
            firstName: firstNameInput.value ,
            lastName: lastNameInput.value,
            email: emailInput.value,
            password: passwordInput.value
        }
        //configuramos la request del Fetch
        const settings = {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type" : "application/json"
            }
        }
        

        //lanzamos la consulta de login a la API
        realizarRegister(settings);

        //limpio los campos del formulario
        form.reset();
    });

    /* -------------------------------------------------------------------------- */
    /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarRegister(settings) {
        console.log("Lanzando la consulta a la API");
        //fetch
        fetch(`${url}/users`, settings)
            //primer then datos incorrectos
            .then(response =>{
                console.log(response)

                response.ok ? response.json() : alert("Algunos de los datos ingresados es incorrecto.")
            })
            //segundo then datos correctos
            .then(data => {

                console.log("Promesa cumplida:");
                console.log(data);
                
                //funciones de normalizar
            if (validarEmail(emailInput) != true) {
                alert("El email es invalido")
                location.reload()
            }
            else{normalizarEmail(emailInput)}

            if (validarContrasenia(passwordInput)!= true) {
                alert("La contraseña es invalida")
                location.reload()
            }
            else if(compararContrasenias(passwordInput, passwordInputRepetida) != true){
                alert("Las contraseñas no coinciden")
                location.reload()
            }
            else{normalizarContrasenia(passwordInput)}
        
                if (data.jwt) {
                    //guardo en LocalStorage el objeto con el token
                    localStorage.setItem("jwt", JSON.stringify(data.jwt))
                    //redireccionamos a la página
                    location.replace("/mis-tareas.html")
                }
            })
            //catch
            .catch(err => {
                console.log("Promesa rechazada");
                console.log(err);
            })
    };


});
