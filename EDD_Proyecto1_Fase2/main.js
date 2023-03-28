const arbolE = JSON.parse(localStorage.getItem("avl_estudiantes"));
const log = localStorage.getItem("login");
const user = localStorage.getItem("user");
var nombre = user;
if(user != "admin"){
    var estudiante = JSON.parse(user);
    nombre = estudiante.nombre;
}

if(log === "true"){
    alert("Bienvenido " + nombre);
}
else{
    alert("No tiene creedenciales");
    window.location.replace("../index.html");
}