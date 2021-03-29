// Your code here

// Vamos a recuperar el nombre de usuario introducido en el formulario

let form = document.querySelector('form')
console.dir(form)
form.onsubmit = (event) => {
    // Evita que se haga una petición GET al mismo dominio. Dicho de otro modo, "previene" de que el evento submit dispare el comportamiento habitual del navegador
    event.preventDefault()

    // En la propiedad 'target' tenemos los campos del formulario que ha disparado el evento 'submit'. En la posición 0 de dicho objeto, tenemos el input con el nombre del usuario
    const username = event.target[0].value
    fetchUser(username)
}

// Forma alternativa de asociar el evento 'submit' al formulario

// form.addEventListener('submit', (event)=> {
//     event.preventDefault()
//     console.log(event)
// })

function fetchUser(username) {
    // Petición a la API con la parte variable 'username'
    const fetchUserUrl = 'https://api.github.com/users/'
    fetch(`${fetchUserUrl}${username}`).
    then((response) => {
        return response.json()
    }).
    then((responseJson) => {
        console.log(responseJson)
        injectInfo(responseJson)
    })

    // Capturar si se produce algún tipo de error
}


// En el formulario, ponemos en nombre de usuario de Gitub
// Al hacer click en "Buscar"; debemos hacer una llamada a la API de GitHub para traernos información de dicho usuario

// Necesitamos un mecanismo/función para insertar una nueva fila en la tabla con la información del usuario recuperado: username, su avatar, bio, y la URL a su perfil de usuario

function injectInfo(responseJson) {

    var table = document.getElementById('myTable');
    var row = table.insertRow(1);
  
    //This for cycle inserts a new cell in the row created above
    //I dynamically created the ID property for each cell
    for (var c = 0; c < 4; c++) {
  
      var cell = row.insertCell(c);
      cell.id = `${responseJson.login}_${c}`;
  
    }
  
    //Here I created a new ID for each new cell that was dynamically generated
    document.querySelector(`#${responseJson.login}_0`).innerHTML = responseJson.login;
    //document.querySelector(`#${responseJson.login}_1`).innerHTML = responseJson.avatar_url;
    document.querySelector(`#${responseJson.login}_2`).innerHTML = responseJson.bio;
  
    //Here I appended the img to the avatar variable, in order to show the avatar picture
    var avatar = document.createElement('img');
    var src = document.querySelector(`#${responseJson.login}_1`);
    avatar.src = responseJson.avatar_url;
    src.appendChild(avatar);
  
    //Here I appended the a element to the url variable, in order to resend people to the github page
    document.querySelector(`#${responseJson.login}_3`).innerHTML = responseJson.html_url;
    var url = document.createElement('a');
    var href = document.querySelector(`#${responseJson.login}_3`);
    url.href = responseJson.html_url;
    var target = document.querySelector(`#${responseJson.login}_3`);
    url.target = '_blank';
    href.appendChild(url);
    target.appendChild(url);
  
  }
  

