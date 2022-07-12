const inputEmail = document.getElementById("inputEmail");
const inputPassword = document.getElementById("inputPassword");
const regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const apiUrl = "https://ctd-fe2-todo-v2.herokuapp.com/v1/users/login";


function entrar() {
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
        alert("Login successful")
      })
      .catch(err=> {
        console.log(err)
        alert("Login failed")
      })
    
  }else {

    alert("Formato de email inválido")
  }


  function loginSucesso(jwtRecebido){
    console.log (jwtRecebido)

    localStorage.setItem("token", jwtRecebido)

    window.location.href = "../html/tarefas.html"
  }
 

  
}
