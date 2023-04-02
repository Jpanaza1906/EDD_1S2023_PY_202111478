//side nav
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");
toggle.onclick = function(){
    navigation.classList.toggle("active");
    main.classList.toggle("active");
}

const arbolE = JSON.parse(localStorage.getItem("avl_estudiantes"));
localStorage.setItem("avl_estudiantes", JSON.stringify(arbolE));
inorder();
function inorder(){
    let datos = recorridoInorder(arbolE.raiz);   
    document.getElementById("tipo").innerHTML = "InOrder"; 
    document.getElementById("estud").innerHTML = datos;
}
function preorder(){
    let datos = recorridoPreorder(arbolE.raiz);
    document.getElementById("tipo").innerHTML = "PreOrder";
    document.getElementById("estud").innerHTML = datos;
}
function posorder(){
    let datos = recorridoPosorder(arbolE.raiz);
    document.getElementById("tipo").innerHTML = "PosOrder";
    document.getElementById("estud").innerHTML = datos;
}
function recorridoInorder(raiz){
    var cadena = "";
    if(raiz !== null){
        if(raiz.izquierdo !== null){
            cadena += recorridoInorder(raiz.izquierdo);          
        }
        let alum = raiz.estudiante;
        cadena += "<tr><td>" + alum.nombre + "</td><td>" + alum.carnet + "</td><td>" + alum.password + "</td><td>" + String(alum.carpeta) + "</td></tr>\n";
        //cadena += raiz.valor
        if(raiz.derecho !== null){
            cadena += recorridoInorder(raiz.derecho);
        }
    }
    return cadena;
}
function recorridoPreorder(raiz){
    var cadena = "";
    if(raiz !== null){        
        let alum = raiz.estudiante;
        cadena += "<tr><td>" + alum.nombre + "</td><td>" + alum.carnet + "</td><td>" + alum.password + "</td><td>" + String(alum.carpeta) + "</td></tr>\n";
        if(raiz.izquierdo !== null){
            cadena = cadena + recorridoPreorder(raiz.izquierdo);
        }
        if(raiz.derecho !== null){
            cadena = cadena + recorridoPreorder(raiz.derecho);
        }
    }
    return cadena;
}
function recorridoPosorder(raiz){
    var cadena = "";
    if(raiz !== null){        
        let alum = raiz.estudiante;
        if(raiz.izquierdo !== null){
            cadena += recorridoPosorder(raiz.izquierdo);
        }
        if(raiz.derecho !== null){
            cadena += recorridoPosorder(raiz.derecho);
        }
        cadena += "<tr><td>" + alum.nombre + "</td><td>" + alum.carnet + "</td><td>" + alum.password + "</td><td>" + String(alum.carpeta) + "</td></tr>\n";
    }
    return cadena;
}