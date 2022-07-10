
/* ------ comienzan las funcionalidades una vez que carga el documento ------ */
window.addEventListener('load', function () {

  const urlTareas = 'https://ctd-todo-api.herokuapp.com/v1/tasks';
  const urlUsuario = 'https://ctd-todo-api.herokuapp.com/v1/users/getMe';
  const token = JSON.parse(localStorage.jwt);

  const formCrearTarea = document.querySelector('.nueva-tarea');
  const nuevaTareaInput = document.querySelector('#nuevaTarea');
  const btnCerrarSesion = document.querySelector('#closeApp');

  obtenerNombreUsuario();
  consultarTareas();

  /* -------------------------------------------------------------------------- */
  /*                          FUNCIÓN 1 - Cerrar sesión                         */
  /* -------------------------------------------------------------------------- */
  btnCerrarSesion.addEventListener("click", function () {
    localStorage.clear()
    location.replace("/index.html")
  })

  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 2 - Obtener nombre de usuario [GET]                */
  /* -------------------------------------------------------------------------- */
  
    function obtenerNombreUsuario() {
      //settings
      const settings = {
        headers:{
          "Authorization":token
        }
      }
      console.log("Consultando mi usuario...");
      //fetch
      fetch(urlUsuario, settings)
        //then
        .then(response => response.json())
        //then
        .then(data => {
          console.log("Nombre de usuario:");
          console.log(data.firstName);
          const nombreUsuario = document.querySelector(".user-info p")
          nombreUsuario.innerText = data.firstName
        })
        //catch
        .catch(err => {
          mostrarPosibleError(err)
        })
    };
    
    
    /* -------------------------------------------------------------------------- */
    /*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
    /* -------------------------------------------------------------------------- */
    
    
      function consultarTareas() {
        //settings
        const settings = {
          headers: {
            "Authorization":token
          }
        }
        console.log("Consultando mis tareas...");
        //fetch 
        fetch(urlTareas, settings)
          //primer then
          .then(response => response.json())
          //segundo then
          .then(tareas => {
            console.log("Tareas del usuario:");
            console.log(tareas);

            renderizarTareas(tareas)
            cambiarEstado()
            borrarTarea()
          })
          //catch error
          .catch(err => {
            mostrarPosibleError(err);
          })
      }
    
  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
  /* -------------------------------------------------------------------------- */

  formCrearTarea.addEventListener('submit', function (event) {
    //prevenimos recarga de la pagina
    event.preventDefault();

    const payload = {
      description: nuevaTareaInput.value,
      completed: false
    }

    const settings = {
      method:"POST",
      body:JSON.stringify(payload),
      headers:{
        "Content-Type" : "application/json",
        authorization:token
      }
    }
    // COMPLETAR LA PETICION

    fetch(urlTareas, settings)
      .then(response => response.json())
      .then(tareas => {  
        console.log("Nueva tarea");
        console.log(tareas);
        consultarTareas(tareas)
      })
      .catch(err => {
        console.log("No se pudo crear la tarea:");
        mostrarPosibleError(err)
      })

      //limpiamos el form
    formCrearTarea.reset();
  })


  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
  /* -------------------------------------------------------------------------- */
  function renderizarTareas(listado) {
    console.log(listado)
        // COMPLETAR EL RENDERIZADO
        const tareasPendientes = document.querySelector(".tareas-pendientes")
        const tareasCompletadas = document.querySelector(".tareas-terminadas")
        tareasPendientes.innerText = ""
        tareasCompletadas.innerText = ""

        const numeroFinalizadas = document.querySelector("#cantidad-finalizadas")
        let contador = 0
        numeroFinalizadas.innerText = contador

        listado.forEach(tarea => {
          let fecha = new Date(tarea.createdAt)
          if (tarea.completed) {
            contador++
            tareasCompletadas.innerHTML +=`
            <li class="tarea">
            <div class="hecha">
              <i class="fa-regular fa-circle-check"></i>
            </div>
            <div class="descripcion">
              <p class="nombre">${tarea.description}</p>
              <div class="cambios-estados">
                <button class="change incompleta" id="${tarea.id}" ><i class="fa-solid fa-rotate-left"></i></button>
                <button class="borrar" id="${tarea.id}"><i class="fa-regular fa-trash-can"></i></button>
              </div>
            </div>
          </li>
            `
          }
          else {
            tareasPendientes.innerHTML +=`
            <li class="tarea">
              <button class="change" id="${tarea.id}"><i class="fa-regular fa-circle"></i></button>
                <div class="descripcion">
                  <p class="nombre">${tarea.description}</p>
                  <p class="timestamp"><i class="far fa-calendar-alt"></i> ${fecha.toLocaleDateString()}</p>
              </div>
            </li>
          `
          }
          numeroFinalizadas.innerText = contador;
        })
  }

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */
  function cambiarEstado() {
    const botonCambioEstado = document.querySelectorAll(".change")

    botonCambioEstado.forEach( boton => {

      boton.addEventListener("click", function(event){
        console.log("Cambiando la tarea");
        console.log(event);

        const id = event.target.id
        const url = `${urlTareas}/${id}`
        const payload = {}
      
        if (event.target.classList.contains("incompleta")){
          payload.completed = false
        }
        else{payload.completed = true}

        const settingsCambio = {
          method: "PUT",
          headers: {
            "Authorization": token,
            "Content-type": "application/json"
          },
          body: JSON.stringify(payload)
        }
        fetch(url, settingsCambio)
          .then(response => response.json())
          .then(data =>{
            console.log(data.status)
            consultarTareas()
          })
          .catch(err =>{
            mostrarPosibleError(err);
            console.log(err);
          })
      })
    })
  }

  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  function borrarTarea() {
    const botonBorrar = document.querySelectorAll(".borrar")

    botonBorrar.forEach(boton => {
      boton.addEventListener("click",function(event){
        console.log("Borrando Tarea");
        console.log(event);

        const id = event.target.id
        const url = `${urlTareas}/${id}`
        const payload = {}

        const settingsBorrar ={
          method: "DELETE",
          headers: {
            "Authorization": token,
          },
          body: JSON.stringify(payload)
        }
        fetch(url, settingsBorrar)
          .then(response => response.json())
          .then(data => {
            console.log(data.status)
            consultarTareas()
          })
          .catch(err =>{
            mostrarPosibleError(err);
            console.log(err);
          })
      })
    })
  }

/* -------------------------------------------------------------------------- */
/*                               FUNCIONES Extra                              */
/* -------------------------------------------------------------------------- */
function mostrarPosibleError(mensaje) {
  alert(`Hubo un error: ${mensaje}`)
}
})