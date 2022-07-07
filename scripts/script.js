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

  //Faz as normalizações e validações

  //Verifica se todos os campos estão preenchidos
  if (nome.value != "" && sobrenome.value != "" &&
    email.value != "" && senha.value != "" &&
    repetirSenha.value != "") {

      const data = {
        firstName: nome.value,
        lastName: sobrenome.value,
        email: email.value,
        password: senha.value
      }

    // configuracao da API, encontrada na tarefa de criar Usuario.
    const configuracaoRequisicao = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data)
    };
    const apiURL = "https://ctd-todo-api.herokuapp.com/v1/users"
    // efetuamos entao o fetch, chamando a URL com o endpoint correspondente a login, e a configuracao de nossa requisicao
    fetch(apiURL, configuracaoRequisicao)
      // obtemos a resposta que é uma promessa contendo nossa resposta da requisição, onde efetuamos o parseamento do texto em JSON
      .then((response) => {

         // temos uma rapida validacao de se temos o status 200 obtido de nossa API, para então retornar a nossa resposta em JSON.
        if (response.status == 200) {
          
          return response.json()
        }
        // atraves do nosso dado recebido da resposta, guardamos em nosso Storage utilizando nossa funcao cadastroSucesso
        //colocamos .jwt para armazenar a propreidade jwt dentro do objeto da resposta.
      }).then(function (resposta) {
        cadastroSucesso(nome.value, sobrenome.value, email.value, resposta.jwt)
        console.log(resposta)
      })
      // uma vez obtido um codigo diferente de 200, o usuario receberá a resposta no console do erro enfrentado.
      .catch(error => {
        cadastroErro(error)
      });
  } else {
    alert("Todos os campos devem ser preenchidos para que possa prosseguir")
  }
});

// a funcao cadastroSucesso esta encarregada de obter os dados e armazena-los em nosso localStorage.
function cadastroSucesso(nome, sobrenome, email, jwtRecebido) {

  // aqui guarda no storage, fazendo a conversão para JSON para armazenar todos os dados.
  localStorage.setItem("user", JSON.stringify({ nome: nome, sobrenome: sobrenome, email: email, token: jwtRecebido }));
  alert("Usuário cadastrado com sucesso")

 
}

// esta funcao se encarrega apenas em exibir o erro recebido.
function cadastroErro(statusRecebido) {
  console.log("Erro ao cadastrar");
  console.log(statusRecebido);
}