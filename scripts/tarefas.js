// selecionamos a tag onde contem o Nome Usuario para exibirmos ao usuario quando acessar.

const jwt = localStorage.getItem("token"); //Lê o token que foi gerado na criação e no login do usuário
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

//--------------Função que recebe o usuário no canto superior direito da tela------------------------------------
function receberUsuario() {

  const apiURL = 'https://ctd-fe2-todo-v2.herokuapp.com/v1/users/getMe';//API que recebe os dados do usuário


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

      const nomeUsuario = document.getElementById('nomeUsuario');
      const dados = `${data.firstName} ${data.lastName}`

      nomeUsuario.innerHTML = dados;



    })

    .catch((err) => {
      console.log(err)

    })
}
//----------------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------------------
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
          <div class="not-done" id="completed" onclick="atualizarTarefa(${task.id},false)"></div>
          <div class="descricao">
          <p class="nome">${task.description}</p>
          <p class="timestamp"> "Criada em:" ${dataFormatada}</p>
          <div class="iconsTask">
          <img src="../assets/lixeira.png" alt="lixeira" class="lixeira" onclick="removerTarefa(${task.id})"/>
          <img src="../assets/writing.png" alt="editar" class="edit" onclick="editarTarefa(${task.id})"/>
          </div>
          </div>
          </li>`
      } else {
        listaPendente.innerHTML +=
          `<li class="tarefa">
          <div class="not-done" onclick="atualizarTarefa(${task.id},true)"></div>
          <div class="descricao">
          <p class="nome">${task.description}</p>
          <p class="timestamp"> Criada em: ${dataFormatada}</p>
          <div class="iconsTask">
          <img src="../assets/lixeira.png" alt="lixeira" class="lixeira" onclick="removerTarefa(${task.id})"/>
          <img src="../assets/writing.png" alt="editar" class="edit" onclick="editarTarefa(${task.id})"/>
          </div>
          </div>
          </li>`
      }

    }


  }, 2000)

}
//-----------------------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------------------
function listarTarefas() {

  const urlListar = "https://ctd-fe2-todo-v2.herokuapp.com/v1/tasks"//API que puxa através do JWT as tarefas criadas pelo user

  const configuracaoListar = {
    method: "GET",
    headers: {

      "Content-type": "application/json",
      "Authorization": jwt

    }
  }

  fetch(urlListar, configuracaoListar)
    .then((response) => response.json())
    .then((tasks) => {
      console.log(tasks);

      renderizarTarefas(tasks)

    })



}

function criarTarefa() {

  const urlCriar = 'https://ctd-fe2-todo-v2.herokuapp.com/v1/tasks'


  const configuracaoCriar = {
    method: "POST",
    body: "",
    headers: {
      "Content-type": "application/json",
      "Authorization": jwt
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

        //console.log("Descrição:", data.description, "Status:",data.completed,"ID",data.id);

        const dataFormat = new Date(data.createdAt).toLocaleDateString(

          'pt-BR',
          {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          })

        listaPendente.innerHTML +=
          `<li class="tarefa">
        <div class="not-done" id="notDone${data.id}" onclick="atualizarTarefa(${data.id}, true)"></div>
        <div class="descricao">
        <p class="nome">${data.description}</p>
        <p class="timestamp"> Criada em: ${dataFormat}</p>
        <div class="iconsTask">
          <img src="../assets/lixeira.png" alt="lixeira" class="lixeira" onclick="removerTarefa(${data.id})"/>
          <img src="../assets/writing.png" alt="editar" class="edit" onclick="editarTarefa(${data.id})"/>
        </div>
        </div>
        </li>`

      })

      
      )
      listarTarefas();
}

function atualizarTarefa(id, completed) {

  const urlAtualizar = `https://ctd-fe2-todo-v2.herokuapp.com/v1/tasks/${id}`
  const configAtualizar = {
    method: "PUT",
    body: "",
    headers: {
      "Content-type": "application/json",
      "Authorization": jwt
    },

  }

  configAtualizar.body = JSON.stringify({ completed })

  fetch(urlAtualizar, configAtualizar)
    .then((res) => res.json()
      .then(() => {

        listarTarefas()

      }))

    .catch((err) => {
      console.log(err);
    });
}


function removerTarefa(id) {
  const urlDelete = `https://ctd-fe2-todo-v2.herokuapp.com/v1/tasks/${id}`
  const configuracaoRequisicao = {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      "Authorization": jwt,
    },

  };

  fetch(urlDelete, configuracaoRequisicao)
    .then((response) => response.json()

      .then(() => {

        listarTarefas()
      }))

    .catch((err) => {
      console.log(err);
    });


}

btnLogOff.addEventListener("click", () => {

  localStorage.clear()
  window.location.href = "../index.html";

});

