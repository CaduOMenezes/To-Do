const inputEmail = document.getElementById("inputEmail");
const inputPassword = document.getElementById("inputPassword");
const regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const apiUrl = "https://ctd-todo-api.herokuapp.com/v1/users/login";


function entrar() {
  // normalizamos o campo de email, recebendo o que é digitado e armazenamos na variavel email.
  let email = inputEmail.value.toLowerCase();
  inputEmail.value = email;

  // o mesmo é feito para a variavel senha.
  let senha = inputPassword.value;

  // validamos com o regex test, e se passar no teste guardamos no storage.

  if (regexMail.test(email)) {
    localStorage.setItem("login", JSON.stringify({ email: email }));

    // criamos as variaveis auxiliar para usar no fetch referente a login
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
    

      // chamamos estas variaveis e entao efetuamos se a resposta for positiva, retornar o response.json
      // sempre passar primeiro a url, depois a configuracao de requisicao.
      fetch(apiUrl,configuracaoRequisicao).then(response => {
        if (response.status === 200){
            return response.json()
        }
    
      })
      .then(function(resposta){
        // efetuamos a chamada da funcao onde guarda este json em nosso localStorage, e redirecionamos o usuario a pagina de tarefas.
        console.log(resposta)
        alert("Login successful")
        // guardamos o token contendo a repsosta do login bem sucedido em nosso localstorage usando a funcao.
        loginSucesso(resposta.jwt)
      })
      .catch(err=> {
        console.log(err)
        alert("Login failed")
      })
    
  }else {

    //caso nao passe da validacao informamos que o formato do email está invalido.
    alert("Formato de email inválido")
  }


  // aqui criamos a funcao responsavel por guardar no storage a nossa resposta.
  function loginSucesso(jwtRecebido){
    console.log (jwtRecebido)

    localStorage.setItem("token", jwtRecebido)

    window.location.href = "tarefas.html"
  }
 

  
}
