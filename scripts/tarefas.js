// selecionamos a tag onde contem o Nome Usuario para exibirmos ao usuario quando acessar.

const nomeUsuario = document.getElementById('nomeUsuario');
const listaPendente = document.querySelector('#tarefasPendentes');
const listaTerminadas = document.querySelector('#tarefasTerminadas');
const inputTarefa = document.querySelector('#novaTarefa');
const btnBotaoCriar = document.querySelector('#btnCriarTarefa');
const btnLogOff = document.querySelector('#closeApp');

//utilizamos o metodo onload para efetuar a funcao de inserir o nome quando a pagina for carregada.
window.onload = function () {

  receberUsuario()

  listarTarefas()

  btnBotaoCriar.addEventListener("click", (event) => {
    event.preventDefault();
    this.criarTarefa();

  })

  
  
};
function encerrarSessao(){
  window.location.href="./login.js";
  localStorage.clear()
}
function receberUsuario() {
  
  const apiURL = 'https://ctd-todo-api.herokuapp.com/v1/users/getMe';
  
  const jwt = localStorage.getItem("token");
  
  
  const configuracaoRequisicao = {
    
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "Authorization": jwt
      
    }
  }
  
  
  fetch(apiURL, configuracaoRequisicao)
  
  .then((response) => response.json())
  
  
  .then(function (data) {
    
    const dados = `${data.firstName} ${data.lastName}`
    
    nomeUsuario.innerHTML = dados;
    
    
    
  })
  
  .catch((err) => {
    console.log(err)
    
  })
}

//PASSO 2


// UTILIZAR ENDPOINT /TASKS E LISTAR NO CONSOLE.
// TAMBEM ACRESCENTAR A FUNCAO QUE LISTA AS TAREFAS EM NOSSO WINDOW.ONLOAD
//no segundo then do fetch:
//Utilizem template string, para através do JS inserir novamente no HTML o corpo das tarefas

// `<li class="tarefa">
//         <div class="not-done"></div>
//         <div class="descricao">
//           <p class="nome">${data.description}</p>
//           <p class="timestamp"> "Criada em:" ${data.createdAt}</p>
//         </div>
//       </li>`

function renderizarTarefas(tasks) {
  
  listaPendente.innerHTML = "";
  listaTerminadas.innerHTML = "";
  
  setTimeout(() => {
    
    
    for (let task of tasks) {
      const dataFormatada = new Date(task.createdAt).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }
        )
        
        if (task.completed) {
          listaTerminadas.innerHTML +=
          `<li class="tarefa">
          <div class="not-done"
          onclick="RemoverTarefa(${task.id})></div>
          <div class="descricao">
          <p class="nome">${task.description}</p>
          <p class="timestamp"> "Criada em:" ${dataFormatada}</p>
          </div>
          </li>`
        } else {
          listaPendente.innerHTML +=
          `<li class="tarefa">
          <div class="not-done" onclick="atualizarTarefa(${task.id},true)"></div>
          <div class="descricao">
          <p class="nome">${task.description}</p>
          <p class="timestamp"> Criada em: ${dataFormatada}</p>
          </div>
          </li>`
        }
      }
      
      
    }, 2000)
    
  }
  
  function listarTarefas() {
    
    const urlListar = "https://ctd-todo-api.herokuapp.com/v1/tasks"
    
    const configuracaoListar = {
      method: "GET",
      headers: {
        
        "Content-type": "application/json",
        "Authorization": localStorage.getItem("token")
        
      }
    }
    
    fetch(urlListar, configuracaoListar)
    .then((response) => response.json())
    .then((tasks) => {
      console.log(tasks);
      
      renderizarTarefas(tasks)
      
    })
    
    
    
  }
  
  //PASSO 3:
//utilizar endpoint  /tasks para criar uma tarefa
// utilizar o botão + para efetuar o fetch desse endpoint
//Utilizando o evento de clicar.
//inserir usando innerHTML e template string, a nova tarefa criada ao
//clicar no botão.
//criar uma variavel onde utilize o metodo new Date
//const dataFormata = newDate(data.createdAt).toLocaleDateString(
  // 'pt-BR',
  // {
//     day: '2-digit',
//     month: '2-digit',
//     year: 'numeric'
// }
//)
// `<li class="tarefa">
//         <div class="not-done"></div>
//         <div class="descricao">
//           <p class="nome">${data.description}</p>
//           <p class="timestamp"> "Criada em:" ${dataFormatada}</p>
//         </div>
//       </li>`

function criarTarefa() {
  
  const urlCriar = 'https://ctd-todo-api.herokuapp.com/v1/tasks'


  const configuracaoCriar = {
    method: "POST",
    body: "",
    headers: {
      "Content-type": "application/json",
      "Authorization": localStorage.getItem("token")
    },



  }
  configuracaoCriar.body = JSON.stringify({
    description: inputTarefa.value,
    completed: false,
  })
  inputTarefa.value = "";
  
  fetch(urlCriar, configuracaoCriar)
    .then((response) => response.json()
    .then((data) => {
      
      console.log(data.description, data.completed);
      
      const dataFormat = new Date(data.createdAt).toLocaleDateString(
        
        'pt-BR',
        {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        })
        
        listaPendente.innerHTML +=
        `<li class="tarefa">
        <div class="not-done" onclick="atualizarTarefa(${data.id},true)"></div>
        <div class="descricao">
        <p class="nome">${data.description}</p>
        <p class="timestamp"> Criada em: ${dataFormat}</p>
        </div>
        </li>`
        
      })
      
      )
      
      
    }
    
    
    
    btnLogOff.addEventListener("click", encerrarSessao())
    
    //aula 22
// PASSO 2 : FUNCAO DE REMOVER STATUS:
//devemos utilizar uma funcao, com dois parametros id e completed, pois é através do id que iremos atualizar o dado da mesma, e o completed para que ela
//seja listada no campo correspondente a listaPendente ou listaTerminadas.

// inserir na funcao de listar Tarefa a chamada da funcao de atualizarTarefa passando dinamicamente com template string o id correspondente a task.

//passar o body vazio, para que possa utilizar JSON.stringfy no completed obtido da task.

// body:""


// funcaoRenderizar.body = JSON.stringify({completed})

// efetuar o fetch, passando a url /tasks, junto do id obtido utilizando template string

//'https://ctd-todo-api.herokuapp.com/v1/tasks/${id}'

// e entao no segundo then listamos a tarefas novamente, para que o usuario veja a mesma sendo renderizada no seu lovo local.

// function atualizarTarefa(id,completed) {

// }


//PASSO 2 : FUNCAO DE REMOVER STATUS:


// seguindo a mesma ideia da funcao de atualizarTarefa, deve criar uma funcao de apagar tarefa tendo como parametro o id.
//  efetuar o usando o metodo, e no headder o token de autenticacao.
//   listar novamente as tarefas para que a mesma desapareça da exibição na listaTerminadas.
// localStorage.clear()
// e redirecione o usuario de volta para a tela de login.html. utilizando window.location.href