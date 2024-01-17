//importer les valeurs html
const form = document.querySelector("form");
const email = document.getElementById("email");
const password = document.getElementById("password");

fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: user,
  })

  
// recuperation email et password input
//ecouteur event?



// recuperer reponse base de donnee

// catch error