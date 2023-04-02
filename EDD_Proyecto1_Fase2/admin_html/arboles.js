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
function reportar(){
    window.print()
}
function inorder(){
    let datos = "digraph tabla{node[shape=none fontname=Helvetica]n1[label=<<table><tr><td colspan=\"4\">InOrder</td></tr><tr><td>Nombre</td><td>Carnet</td><td>Contraseña</td><td>Carpeta</td></tr>";
    datos += recorridoInorder(arbolE.raiz);
    datos += "</table>>]}";
    console.log(datos);
    let url = 'https://quickchart.io/graphviz?graph=';
    document.getElementById("image").setAttribute("src",url+datos)
}
function preorder(){
    let datos = "digraph tabla{node[shape=none fontname=Helvetica]n1[label=<<table><tr><td colspan=\"4\">PreOrder</td></tr><tr><td>Nombre</td><td>Carnet</td><td>Contraseña</td><td>Carpeta</td></tr>";
    datos += recorridoPreorder(arbolE.raiz);
    datos += "</table>>]}";
    console.log(datos);
    let url = 'https://quickchart.io/graphviz?graph=';
    document.getElementById("image").setAttribute("src",url+datos)
}
function posorder(){
    let datos = "digraph tabla{node[shape=none fontname=Helvetica]n1[label=<<table><tr><td colspan=\"4\">PosOrder</td></tr><tr><td>Nombre</td><td>Carnet</td><td>Contraseña</td><td>Carpeta</td></tr>";
    datos += recorridoPosorder(arbolE.raiz);
    datos += "</table>>]}";
    console.log(datos);
    let url = 'https://quickchart.io/graphviz?graph=';
    document.getElementById("image").setAttribute("src",url+datos)
}
function recorridoInorder(raiz){
    var cadena = "";
    if(raiz !== null){
        if(raiz.izquierdo !== null){
            cadena += recorridoInorder(raiz.izquierdo);          
        }
        let alum = raiz.estudiante;
        cadena += "<tr><td>" + alum.nombre + "</td><td>" + alum.carnet + "</td><td>" + alum.password + "</td><td>" + String(alum.carpeta) + "</td></tr>";
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
        cadena += "<tr><td>" + alum.nombre + "</td><td>" + alum.carnet + "</td><td>" + alum.password + "</td><td>" + String(alum.carpeta) + "</td></tr>";
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
        cadena += "<tr><td>" + alum.nombre + "</td><td>" + alum.carnet + "</td><td>" + alum.password + "</td><td>" + String(alum.carpeta) + "</td></tr>";
    }
    return cadena;
}