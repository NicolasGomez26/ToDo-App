window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    const form = document.forms[0];
    const emailInput = document.querySelector('#inputEmail')
    const passwordInput = document.querySelector('#inputPassword')
    const url = 'https://ctd-todo-api.herokuapp.com/v1';


    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        //creamos el cuerpo de la request payload
        const payload = {
            email: emailInput.value,
            password: passwordInput.value
        }
        //configuramos la request del Fetch settings
        const settings ={
            method:"POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type":"application/json"
            }
        }

        //funciones de normalizar
        // if (normalizarEmail(emailInput) && validarEmail(emailInput) != true) {
        //     event.preventDefault()
        // }

        // if (validarContrasenia(passwordInput)!= true) {
        //     event.preventDefault()
        // }

        //lanzamos la consulta de login a la API
        realizarLogin(settings);
        
        //limpio los campos del formulario
        form.reset();
    });


    /* -------------------------------------------------------------------------- */
    /*                     FUNCIÓN 2: Realizar el login [POST]                     */
    /* -------------------------------------------------------------------------- */
    function realizarLogin(settings) {
        console.log("Lanzando la consulta a la API...");
        //fetch login
        fetch(`${url}/users/login`, settings)
            //then datos incorrectos
            .then(response =>{
                console.log(response)

                if (response.ok != true) {
                    alert("Algunos de los datos ingresados es incorrecto.")
                }

                return response.json();

                
            })
            //then datos correctos
            .then(data => {
                console.log("Promesa cumplida:");
                console.log(data);

                

                if (data.jwt) {
                    //guardo en LocalStorage el objeto con el token
                    localStorage.setItem("jwt", JSON.stringify(data.jwt))
                    //redireccionamos a la página
                    location.replace("/mis-tareas.html")
                }
            })
            //catch error
            .catch(err => {
                console.log("Promesa incorrecta:");
                console.log(err);
            })
    };
    //JWT
    const jwt = 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pY29sYXNnb21lejE0NThAZ21haWwuY29tIiwiaWQiOjUxMjAsImlhdCI6MTY1NjM3NjQ4MH0.S5S8jbDDX6LuzxtB9aL4NKtf6lUqPWP6mpcoZ2XQ8eg"
});
