/* Variáveis globais ao escopo do JS */

//Captura as entradas de dados e ações do usuário na página de cadastro
const nome = document.getElementById("inputNomeCadastro");
const sobrenome = document.getElementById("inputSobrenomeCadastro");
const email = document.getElementById("inputEmailCadastro");
const senha = document.getElementById("inputSenhaCadastro");
const repetirSenha = document.getElementById("inputRepetirSenhaCadastro");
const botaoCriarConta = document.getElementById("botaoCriarContaCadastro");

botaoCriarConta.addEventListener('click', (evento) => {
  evento.preventDefault();

  if (nome.value != "" && sobrenome.value != "" &&
    email.value != "" && senha.value != "" &&
    repetirSenha.value != "") {
      const apiURL = "https://ctd-todo-api.herokuapp.com/v1/users"

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

          return response.json()
        }
      }).then(function (resposta) {
        cadastroSucesso(nome.value, sobrenome.value, email.value, resposta.jwt)
        console.log(resposta)
      })
      .catch(error => {
        cadastroErro(error)
      });
  } else {
    alert("Todos os campos devem ser preenchidos para que possa prosseguir")
  }
});

function cadastroSucesso(nome, sobrenome, email, jwtRecebido) {

  localStorage.setItem("user", JSON.stringify({ nome: nome, sobrenome: sobrenome, email: email, token: jwtRecebido }));
  alert("Usuário cadastrado com sucesso")

 
}

function cadastroErro(statusRecebido) {
  console.log("Erro ao cadastrar");
  console.log(statusRecebido);
}