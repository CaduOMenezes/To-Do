
const inputEmail = document.getElementById("inputEmail");
const inputPassword = document.getElementById("inputPassword");
const regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const apiUrl = "https://ctd-fe2-todo-v2.herokuapp.com/v1/users/login";


// function mostrarSpinner() {
//   // Selecionamos o corpo. Isso nos ajudará a incorporar nosso spinner
//   // dentro de nosso HTML.
//   const body = document.querySelector("body");
  
//   // Selecionamos o formulário de registro para poder ocultá-lo durante o carregamento
//   const form = document.querySelector("form");
  
//   // Criamos nosso spinner
//   const spinnerContainer = document.createElement("div");
//   const spinner = document.createElement("div");
  
//   // Atribuímos os IDs a cada novo elemento, para poder manipular
//   // seus estilos
//   spinnerContainer.setAttribute("id", "container-load");
//   spinner.setAttribute("id", "load");
  
//   // Ocultamos o formulário de registro
//   form.classList.add("hidden");
  
//   // Adicionamos o Spinner ao nosso HTML.
//   spinnerContainer.appendChild(spinner);
//   body.appendChild(spinnerContainer);
  
//   return;
//  }


 
// function ocultarSpinner() {
//   // Selecionamos o corpo para poder remover o spinner do HTML.
//   const body = document.querySelector("body");
  
//   // Selecionamos o formulário de registro para poder mostrar-lo novamente
//   const form = document.querySelector("form");
  
//   // Selecionamos o spinner
//   const spinnerContainer = document.querySelector("#conteiner-load");
  
//   // Removemos o spinner do HTML
//   body.removeChild(spinnerContainer);
  
//   // Removemos a classe que oculta o formulário
//   form.classList.remove("hidden");
//   return;
//  }

function entrar() {

  // mostrarSpinner();
  let email = inputEmail.value.toLowerCase();
  inputEmail.value = email;

  let senha = inputPassword.value;

  if (regexMail.test(email)) {
    localStorage.setItem("login", JSON.stringify({ email: email }));

    const data = {
        email: email,
        password: senha,
      };
    
      console.log(data);
    
      const configuracaoRequisicao = {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      };
    

      fetch(apiUrl,configuracaoRequisicao)
      .then(response => {
        if (response.status === 201){
          return response.json()
        }
        
      })
      .then(function(resposta){
        
        loginSucesso(resposta.jwt)
        // ocultarSpinner();
        alert("Login successful")
      })
      .catch(err=> {
        console.log(err)
        // ocultarSpinner();
        alert("Login failed")
      })
    
  }else {
    // ocultarSpinner();
    alert("Formato de email inválido")
  }


  function loginSucesso(jwtRecebido){
    console.log (jwtRecebido)

    localStorage.setItem("token", jwtRecebido)

    window.location.href = "../html/tarefas.html"
  }
}
