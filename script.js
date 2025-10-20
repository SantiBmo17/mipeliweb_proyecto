//const btn = document.getElementById("btn");
const containter = document.querySelector(".container");
const btnSingIn = document.getElementById("btn-sing-in")
const btnSingUp = document.getElementById("btn-sing-up")

btnSingIn.addEventListener("click", ()=>{
    containter.classList.remove("toggle");
  });
btnSingUp.addEventListener("click", ()=>{
    containter.classList.add("toggle");
  });