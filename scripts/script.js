/* Variáveis globais ao escopo do JS */
//Captura as entradas de dados e ações do usuário na página de cadastro
const nome = document.getElementById("inputNomeCadastro");
const sobrenome = document.getElementById("inputSobrenomeCadastro");
const email = document.getElementById("inputEmailCadastro");
const senha = document.getElementById("inputSenhaCadastro");
const repetirSenha = document.getElementById("inputRepetirSenhaCadastro");
const botaoCriarConta = document.getElementById("botaoCriarContaCadastro");


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


botaoCriarConta.addEventListener('click', (evento) => {
  evento.preventDefault();

  // mostrarSpinner();

  if (nome.value != "" && sobrenome.value != "" &&
    email.value != "" && senha.value != "" &&
    repetirSenha.value != "") {
      const apiURL = "https://ctd-fe2-todo-v2.herokuapp.com/v1/users"

      const data = {
        firstName: nome.value,
        lastName: sobrenome.value,
        email: email.value,
        password: senha.value
      }
      
    const configuracaoRequisicao = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data)
    };
    fetch(apiURL, configuracaoRequisicao)
      .then((response) => {

        if (response.status == 201) {
          console.log(response)
          return response.json()
          
        }
      }).then(function (resposta) {
        
        localStorage.setItem(
          "user", 
          JSON.stringify(data)
          );
          console.log(resposta);
          // ocultarSpinner();
          location.href = "../index.html";
          alert("Usuário cadastrado com sucesso")
        
       // cadastroSucesso(nome.value, sobrenome.value, email.value, resposta.jwtRecebido)
      })
      .catch(error => {
        cadastroErro(error)
        // ocultarSpinner();
      });
  } else {
    alert("Todos os campos devem ser preenchidos para que possa prosseguir")
    // ocultarSpinner();
  }
});

// function cadastroSucesso(nome, sobrenome, email, jwtRecebido) {


 
// }

function cadastroErro(statusRecebido) {
  alert("Erro ao cadastrar");
  console.log(statusRecebido);
}