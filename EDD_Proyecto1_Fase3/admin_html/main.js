
//LOCALSTORAGE
const arbolE = JSON.parse(localStorage.getItem("avl_estudiantes"));
localStorage.setItem("avl_estudiantes", JSON.stringify(arbolE));
var log = localStorage.getItem("login");
const user = localStorage.getItem("user");

var alumnos = 0;
inorder();

var nombre = user;
if(user != "admin"){
    var estudiante = JSON.parse(user);
    nombre = estudiante.nombre;
}
logt();
function logt(){
    if(log === "true"){
        let toggle = document.querySelector(".toggle");
        let navigation = document.querySelector(".navigation");
        let main = document.querySelector(".main");
        toggle.onclick = function(){
            navigation.classList.toggle("active");
            main.classList.toggle("active");
        }
        document.getElementById("num_alum").innerHTML = String(alumnos);        
        
        
    }
    else{
        alert("No tiene creedenciales");
        document.getElementById("logout").click();
    }
}
function inorder(){
    let datos = recorridoInorder(arbolE.raiz);   
}
function recorridoInorder(raiz){
    cadena = ""
    if(raiz !== null){
        if(raiz.izquierdo !== null){
            cadena += recorridoInorder(raiz.izquierdo);          
        }
        alumnos++;
        //cadena += raiz.valor
        if(raiz.derecho !== null){
            cadena += recorridoInorder(raiz.derecho);
        }
    }
    return cadena;
}
