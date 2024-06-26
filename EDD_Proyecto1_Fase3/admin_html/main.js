//Clases Creadas
class Estudiante{
    constructor(nombre, carnet, password, carpeta){
        this.nombre = nombre;
        this.carnet = carnet;
        this.password = password;
        this.carpeta = carpeta;
    }
}
class nodoArbol {
    constructor(estudiante){
        this.izquierdo = null;
        this.derecho = null;
        this.estudiante = estudiante;
        this.altura = 1;
        this.factor_equilibrio = 0;
        this.archivos = null;
        this.bitacora = null;
    }
}

class ArbolAVL {
    constructor(){
        this.raiz = null;
    }

    Altura(raiz){
        return raiz === null ? 0: raiz.altura
    }

    Equilibrio(raiz){
        return raiz === null ? 0: (this.Altura(raiz.derecho)-this.Altura(raiz.izquierdo))
    }

    RotacionI(raiz){ // 2
        let raiz_derecho = raiz.derecho // 4
        let hijo_izquierdo = raiz_derecho.izquierdo // 3
        raiz_derecho.izquierdo = raiz // 2
        raiz.derecho = hijo_izquierdo // 3
        raiz.altura = 1 + Math.max(this.Altura(raiz.izquierdo),this.Altura(raiz.derecho))
        raiz_derecho.altura = 1 + Math.max(this.Altura(raiz_derecho.izquierdo),this.Altura(raiz_derecho.derecho))
        raiz.factor_equilibrio = this.Equilibrio(raiz)
        raiz_derecho.factor_equilibrio = this.Equilibrio(raiz_derecho)
        return raiz_derecho
    }
    //this.raiz = 2
    RotacionD(raiz){
        let raiz_izquierdo = raiz.izquierdo
        let hijo_derecho = raiz_izquierdo.derecho
        raiz_izquierdo.derecho = raiz
        raiz.izquierdo = hijo_derecho
        raiz.altura = 1 + Math.max(this.Altura(raiz.izquierdo),this.Altura(raiz.derecho))
        raiz_izquierdo.altura = 1 + Math.max(this.Altura(raiz_izquierdo.izquierdo),this.Altura(raiz_izquierdo.derecho))
        raiz.factor_equilibrio =  this.Equilibrio(raiz)
        raiz_izquierdo.factor_equilibrio = this.Equilibrio(raiz_izquierdo)
        return raiz_izquierdo
    }

    insertarEstudianteHijo(nodo, raiz){
        if (raiz === null){
            raiz = nodo
        }else{
            if (raiz.estudiante.carnet === nodo.estudiante.carnet){
                raiz.estudiante = nodo.estudiante
            }else if (raiz.estudiante.carnet < nodo.estudiante.carnet) {
                raiz.derecho = this.insertarEstudianteHijo(nodo, raiz.derecho);
            }else{
                raiz.izquierdo = this.insertarEstudianteHijo(nodo, raiz.izquierdo);
            }
        }
        raiz.altura = 1 + Math.max(this.Altura(raiz.izquierdo),this.Altura(raiz.derecho))
        let balanceo = this.Equilibrio(raiz) //(-2)
        raiz.factor_equilibrio = balanceo
        //Rotacion Simple a la Izquierda
        if(balanceo > 1 && nodo.estudiante.carnet > raiz.derecho.estudiante.carnet){
            return this.RotacionI(raiz)
        }
        //Rotacion Simple a la Derecha
        if(balanceo < -1 && nodo.estudiante.carnet < raiz.izquierdo.estudiante.carnet){
            return this.RotacionD(raiz)
        }
        //Rotacion Doble a la Izquierda
        if(balanceo > 1 && nodo.estudiante.carnet < raiz.derecho.estudiante.carnet){
            raiz.derecho = this.RotacionD(raiz.derecho)
            return this.RotacionI(raiz)
        }
        //Rotacion Doble a la Derecha
        if(balanceo < -1 && nodo.estudiante.carnet > raiz.izquierdo.estudiante.carnet){
            raiz.izquierdo = this.RotacionI(raiz.izquierdo)
            return this.RotacionD(raiz)
        }
        return raiz
    }


    insertaEstudiante(estudiante){
        const nuevoNodo = new nodoArbol(estudiante);
        this.raiz = this.insertarEstudianteHijo(nuevoNodo,this.raiz);
    }

    grafica_arbol(){
        var cadena = "";
        if(!(this.raiz === null)){
            cadena = "digraph arbol{ ";
            cadena = cadena + this.retornarValoresArbol(this.raiz, 0);
            cadena = cadena + "}";
        }else{
            cadena = "No hay valores en el arbol";
        }
        return cadena;
    }

    retornarValoresArbol(raiz, id){
        var cadena = "";
        var numero = id + 1;
        if(!(raiz === null)){
            cadena += "\"";
            cadena += raiz.estudiante.carnet;
            cadena += "\" ;";
            if(!(raiz.izquierdo === null) && !(raiz.derecho === null)){
                cadena += " x" + numero + " [label=\"\",width=.1,style=invis];"
                cadena += "\"";
                cadena += raiz.estudiante.carnet;
                cadena += "\" -> ";
                cadena += this.retornarValoresArbol(raiz.izquierdo, numero)
                cadena += "\"";
                cadena += raiz.estudiante.carnet;
                cadena += "\" -> ";
                cadena += this.retornarValoresArbol(raiz.derecho, numero)
                cadena += "{rank=same" + "\"" + raiz.izquierdo.estudiante.carnet + "\"" + " -> " + "\"" + raiz.derecho.estudiante.carnet + "\""  + " [style=invis]}; "
            }else if(!(raiz.izquierdo === null) && (raiz.derecho === null)){
                cadena += " x" + numero + " [label=\"\",width=.1,style=invis];"
                cadena += "\"";
                cadena += raiz.estudiante.carnet;
                cadena += "\" -> ";
                cadena += this.retornarValoresArbol(raiz.izquierdo, numero)
                cadena += "\"";
                cadena += raiz.estudiante.carnet;
                cadena += "\" -> ";
                cadena += "x" + numero + "[style=invis]";
                cadena += "{rank=same" + "\"" + raiz.izquierdo.estudiante.carnet + "\"" + " -> " + "x" + numero + " [style=invis]}; "
            }else if((raiz.izquierdo === null) && !(raiz.derecho === null)){
                cadena += " x" + numero + " [label=\"\",width=.1,style=invis];"
                cadena += "\"";
                cadena += raiz.estudiante.carnet;
                cadena += "\" -> ";
                cadena += "x" + numero + "[style=invis]";
                cadena += "; \"";
                cadena += raiz.estudiante.carnet;
                cadena += "\" -> ";
                cadena += this.retornarValoresArbol(raiz.derecho, numero)
                cadena += "{rank=same" + " x" + numero + " -> \"" + raiz.derecho.estudiante.carnet + "\"" +  " [style=invis]}; "
            }
        }
        return cadena;
    }

    eliminarTodo(){
        this.raiz = null;
    }

}

class nodoHash{
    constructor(carnet, usuario, password, grafo){
        this.carnet = carnet
        this.usuario = usuario
        this.password = password
        this.grafoarchivos = grafo
    }
}

class TablaHash{
    constructor(){
        this.tabla = new Array(7)
        this.capacidad = 7
        this.utilizacion = 0
    }

    insertar(carnet, usuario, password, grafo){
        let indice = this.calculoIndice(carnet)
        const nuevoNodo = new nodoHash(carnet, usuario, password, grafo)
        if(indice < this.capacidad){
            try{
                if(this.tabla[indice] == null){
                    console.log("Entre")
                    this.tabla[indice] = nuevoNodo
                    this.utilizacion++
                    this.capacidad_tabla()
                }else{
                    let contador = 1
                    indice = this.RecalculoIndice(carnet,contador)
                    while(this.tabla[indice] != null){
                        contador++
                        indice = this.RecalculoIndice(carnet, contador)
                    }
                    this.tabla[indice] = nuevoNodo
                    this.utilizacion++
                    this.capacidad_tabla()
                }
            }catch(err){
                console.log("Hubo un error en insercion")
            }
        }
    }

    calculoIndice(carnet){ 
        let carnet_cadena = carnet.toString()
        let divisor = 0
        for(let i = 0; i < carnet_cadena.length; i++){
            divisor = divisor + carnet_cadena.charCodeAt(i)
        }
        let indice_final = divisor % this.capacidad
        return indice_final
    }

    capacidad_tabla(){
        let aux_utilizacion = this.capacidad*0.75
        if(this.utilizacion > aux_utilizacion){
            this.capacidad = this.nueva_capacidad()
            this.utilizacion = 0
            this.ReInsertar()
        } 
    }

    nueva_capacidad(){ //Sustituir por un algoritmo del siguiente numero primo
        let numero = this.capacidad + 1;
        while (!this.isPrime(numero)) {
            numero++;
        }
        return numero;
    }

    ReInsertar(){
        const auxiliar_tabla = this.tabla
        this.tabla = new Array(this.capacidad)
        auxiliar_tabla.forEach((alumno) => {
            this.insertar(alumno.carnet, alumno.usuario, alumno.password, alumno.grafoarchivos)
        })
    }

    RecalculoIndice(carnet, intento){
        let nuevo_indice = this.calculoIndice(carnet) + intento*intento
        let nuevo = this.nuevo_Indice(nuevo_indice)
        return nuevo
    }

    nuevo_Indice(numero){
        let nueva_posicion = 0
        if(numero < this.capacidad){
            nueva_posicion = numero
        }else{
            nueva_posicion = numero - this.capacidad
            nueva_posicion = this.nuevo_Indice(nueva_posicion)
        }
        return nueva_posicion
    }

    busquedaUsuario(carnet, pass_en){
        let indice = this.calculoIndice(carnet)
        if(indice < this.capacidad){
            try{
                if(this.tabla[indice] == null){
                    alert("No se encontro el alumno")
                }else if(this.tabla[indice] != null && this.tabla[indice].carnet == carnet){
                    if(this.tabla[indice].password == pass_en){
                        alert("Bienvenido " + this.tabla[indice].usuario)
                    }else{
                        alert("Contraseña incorrecta")
                    }
                }else{
                    let contador = 1
                    indice = this.RecalculoIndice(carnet,contador)
                    while(this.tabla[indice] != null){
                        if(this.tabla[indice].carnet == carnet){
                            if(this.tabla[indice].password == pass_en){
                                alert("Bienvenido " + this.tabla[indice].usuario)
                            }else{
                                alert("Contraseña incorrecta")
                            }
                            return
                        }
                        contador++
                        indice = this.RecalculoIndice(carnet, contador)
                    }
                }
            }catch(err){
                console.log("Hubo un error en busqueda")
            }
        }
    }

    /**
     * Este codigo es un extra para generar una tabla 
     */

    genera_tabla() {
        // Obtener la referencia del elemento body
        var tabla = document.getElementById("tablahash");
      
        // Crea un elemento <table> y un elemento <tbody>
        var tblBody = document.createElement("tbody");
        var salto_html = document.createElement("br")
        //carnet
        var encabezado = document.createElement("tr")
        var celda_encabezado = document.createElement("td");
        var encabezado_contenido = document.createTextNode("Carnet")
        celda_encabezado.appendChild(encabezado_contenido);
        encabezado.appendChild(celda_encabezado)
        tblBody.appendChild(encabezado)
        //Nombre
        celda_encabezado = document.createElement("td");
        encabezado_contenido = document.createTextNode("Nombre")
        celda_encabezado.appendChild(encabezado_contenido);
        encabezado.appendChild(celda_encabezado)
        tblBody.appendChild(encabezado)
        //Password
        celda_encabezado = document.createElement("td");
        encabezado_contenido = document.createTextNode("Password")
        celda_encabezado.appendChild(encabezado_contenido);
        encabezado.appendChild(celda_encabezado)
        tblBody.appendChild(encabezado)

        for(var i = 0; i < this.capacidad; i++){
            if(this.tabla[i] != null){
                var hilera = document.createElement("tr");
                var arreglo = new Array(3)
                arreglo[0] = this.tabla[i].carnet
                arreglo[1] = this.tabla[i].usuario
                arreglo[2] = this.tabla[i].password
                for(var j = 0; j < 3; j++){
                    var celda = document.createElement("td");
                    var textoCelda = document.createTextNode(arreglo[j]);
                    celda.appendChild(textoCelda);
                    hilera.appendChild(celda);
                }
                tblBody.appendChild(hilera);
            }
        }

        
        tabla.appendChild(tblBody);
        // appends <table> into <body>
        tabla.appendChild(salto_html);
    }

    isPrime(numero) {
        if (numero <= 1) {return false}
        if (numero === 2) {return true}
        if (numero % 2 === 0) {return false}
        for (let i = 3; i <= Math.sqrt(numero); i += 2) {
            if (numero % i === 0) {return false};
        }
        return true;
    }

    async sha256(mensaje){
        let cadenaFinal
        const enconder =  new TextEncoder();
        const mensajeCodificado = enconder.encode(mensaje)
        await crypto.subtle.digest("SHA-256", mensajeCodificado)
        .then(result => { // 100 -> 6a 
            const hashArray =  Array.from(new Uint8Array(result))
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
            cadenaFinal = hashHex
        })
        .catch(error => console.log(error))
        return cadenaFinal
    }

}
class nodoMatrizAdyacencia{
    constructor(valor){
        this.siguiente = null
        this.abajo = null
        this.valor = valor
        this.matrizpermisos = null
    }
}

class grafoDirigido{
    constructor(){
        this.principal = null
    }

    insertarF(texto){
        const nuevoNodo = new nodoMatrizAdyacencia(texto)
        if(this.principal === null){
            this.principal = nuevoNodo
        }else{
            let aux = this.principal
            while(aux.abajo){
                if(aux.valor === nuevoNodo.valor){
                    return
                }
                aux = aux.abajo
            }
            aux.abajo = nuevoNodo
        }
    }

    insertarC(padre, hijo){
        const nuevoNodo = new nodoMatrizAdyacencia(hijo)
        if(this.principal !== null && this.principal.valor === padre){
            let aux = this.principal
            while(aux.siguiente){
                aux = aux.siguiente
            }
            aux.siguiente = nuevoNodo
        }else{
            this.insertarF(padre)
            let aux = this.principal
            while(aux){
                if(aux.valor === padre){
                    break;
                }
                aux = aux.abajo
            }
            if(aux !== null){
                while(aux.siguiente){
                    aux = aux.siguiente
                }
                aux.siguiente = nuevoNodo
            }
        }
    }

    insertarValores(padre, hijos){
        let cadena = hijos.split(',')
        for(let i = 0; i < cadena.length; i++){
            this.insertarC(padre,cadena[i])
        }
    }

    //Reporte modificado para trabajar con carpetas
    grafica(){
        let cadena = "graph grafoDirigido{ rankdir=LR; node [shape=box]; \"/\"; node [shape = ellipse] ; layout=neato; "
        let auxPadre = this.principal
        let auxHijo = this.principal
        let peso = 0
        while(auxPadre){
            auxHijo = auxPadre.siguiente
            let profundidad = auxPadre.valor.split('/')
            let padre = ""
            if(profundidad.length == 2 && profundidad[1] == ""){ peso = 1}
            else if(profundidad.length == 2 && profundidad[1] != ""){ peso = 2 }
            else { peso = profundidad.length }
            if(auxPadre.valor != "/"){ padre = profundidad[profundidad.length-1] }
            else { padre = "/" }
            while(auxHijo){
                cadena += "\"" + padre + "\"" + " -- " + "\"" + auxHijo.valor + "\"" + " [label=\"" + peso + "\"] "
                auxHijo = auxHijo.siguiente
            }
            auxPadre = auxPadre.abajo
        }
        cadena += "}"
        return cadena
    }
}





//LOCALSTORAGE
const arbolE = JSON.parse(localStorage.getItem("avl_estudiantes"));
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
function recorridoInorderHash(raiz){
    cadena = ""
    if(raiz !== null){
        if(raiz.izquierdo !== null){
            recorridoInorderHash(raiz.izquierdo);          
        }
        // convertir archivos a grafo        
        var grafoarch = null
        if(raiz.archivos != null){            
            grafoarch =  new grafoDirigido()            
            convertirgrafo(raiz.archivos.raiz.valor,raiz.archivos.raiz.primero, grafoarch)     
            convertirmatrices(raiz.archivos.raiz, grafoarch)
        }
        //encriptar password
        convertirpass(raiz.estudiante, grafoarch)
        if(raiz.derecho !== null){
            recorridoInorderHash(raiz.derecho);
        }
    }
}
function convertirgrafo(raizval, primero ,grafo){    
    while(primero != null){        
        grafo.insertarValores(raizval,primero.valor)
        if(primero.valor.indexOf(".") == -1){
            if(raizval != "/"){
                var rutacom = raizval + "/" +primero.valor
            }            
            else{
                var rutacom = raizval + primero.valor
            }
            
            if(primero.primero != null){
                convertirgrafo(rutacom, primero.primero,grafo)
            }
        }
        primero = primero.siguiente
    }
}
function convertirmatrices(raiz, grafo){
    if(raiz.matrizpermisos != null){
        grafo.principal.matrizpermisos = raiz.matrizpermisos
    }
    let auxPadre = grafo.principal
    let auxHijo = grafo.principal
    while(auxPadre){
        auxHijo = auxPadre.siguiente
        while(auxHijo){
            if(auxHijo.valor.indexOf(".") == -1){
                buscarpermisos(raiz.primero, auxHijo)
            }
            auxHijo = auxHijo.siguiente

        }
        auxPadre = auxPadre.abajo
    }
}
function buscarpermisos(primero, auxHijo){
    while(primero != null){  
        if(primero.valor == auxHijo.valor){
            auxHijo.matrizpermisos = primero.matrizpermisos
            break
        }          
        if(primero.primero != null){
            buscarpermisos(primero.primero, auxHijo)
        }
        primero = primero.siguiente
    }
}
async function convertirpass(estud,grafoarchivos){
    let pass_en = await tablaHash.sha256(estud.password)
    tablaHash.insertar(estud.carnet, estud.nombre, pass_en, grafoarchivos)    
}

var Narbol = new ArbolAVL();
Narbol.raiz = arbolE.raiz;

const thash = JSON.parse(localStorage.getItem("tabla_estudiantes"));
var tablaHash = new TablaHash()
if(thash.utilizacion != 0){
    tablaHash.tabla = thash.tabla
    tablaHash.capacidad = thash.capacidad
    tablaHash.utilizacion = thash.utilizacion
    tabla()
}
if(Narbol.raiz != null){
    tpermisos()
}
function hash(){
    if(arbolE.raiz != null){  
        recorridoInorderHash(Narbol.raiz)
    }
    else{
        alert("no tiene nada")
    }
}

function tabla(){
    localStorage.setItem("tabla_estudiantes", JSON.stringify(tablaHash));
    tablaHash.genera_tabla()
    tpermisos()
}
/*
function recorridoInorderPermisos(raiz){
    var cadena = "";
    if(raiz !== null){
        if(raiz.izquierdo !== null){
            cadena += recorridoInorderPermisos(raiz.izquierdo);          
        }
        if(raiz.archivos != null){            
            var rutaarch = "/"
            var arch = raiz.archivos.raiz
            let tempraiz = arch
            while(tempraiz != null){ 
                tempsig = tempraiz
                while(tempsig != null){    
                    if(tempsig.matrizpermisos != null){                          
                        if(tempsig.valor != "/"){
                            rutaarch += "/" + tempsig.valor 
                        }
                        var permiso = tempsig.matrizpermisos.principal
                        let temppermiso = permiso.abajo
                        var tempfila = permiso
                        while(temppermiso != null){
                            var tempcolumna = temppermiso
                            while(tempcolumna != null){                            
                                tempfila = tempfila.siguiente
                                cadena += "<tr><td>" + raiz.estudiante.carnet + "</td><td>" + tempfila.posicion + "</td><td>" + rutaarch + "</td><td>" + temppermiso.posicion + "</td><td>" + tempfila.abajo.posicion + "</td></tr>\n";                                
                                if(tempcolumna.siguiente.siguiente != null){
                                    tempcolumna = tempcolumna.siguiente
                                }else{
                                    tempcolumna = tempcolumna.siguiente.siguiente
                                }
                            }
                            temppermiso = temppermiso.abajo
                        }
                    }
                    tempsig = tempsig.siguiente
                }
                tempraiz = tempraiz.primero
            }
        }
        //let alum = raiz.estudiante;
        //cadena += "<tr><td>" + alum.nombre + "</td><td>" + alum.carnet + "</td><td>" + alum.password + "</td><td>" + String(alum.carpeta) + "</td></tr>\n";
        //cadena += raiz.valor
        if(raiz.derecho !== null){
            cadena += recorridoInorderPermisos(raiz.derecho);
        }
    }
    return cadena;
}*/
function mostrarpermisos(tablaHash){
    var tabla = tablaHash.tabla
    var cadena = ""
    for(var i = 0; i < tablaHash.capacidad; i++){
        if(tabla[i] != null){
            grafo = tabla[i].grafoarchivos
            var rutaarch="/"
            if(grafo != null){
                if(grafo.principal.matrizpermisos != null){
                    var permiso = grafo.principal.matrizpermisos.principal
                    let temppermiso = permiso.abajo
                    while(temppermiso != null){
                        var tempcolumna = temppermiso.siguiente
                        while(tempcolumna != null){                          
                            cadena += "<tr><td>" + tabla[i].carnet + "</td><td>" + tempcolumna.arriba + "</td><td>" + permiso.posicion + "</td><td>" + temppermiso.posicion + "</td><td>" + tempcolumna.posicion + "</td></tr>\n";                                
                            tempcolumna = tempcolumna.siguiente
                        }
                        temppermiso = temppermiso.abajo
                    }
                }
                
                let auxPadre = grafo.principal
                let auxHijo = grafo.principal
                while(auxPadre){
                    auxHijo = auxPadre.siguiente
                    while(auxHijo){
                        if(auxHijo.valor.indexOf(".") == -1){
                            if(auxHijo.matrizpermisos != null){
                                var permiso = auxHijo.matrizpermisos.principal
                                let temppermiso = permiso.abajo
                                while(temppermiso != null){
                                    var tempcolumna = temppermiso.siguiente
                                    while(tempcolumna != null){                          
                                        cadena += "<tr><td>" + tabla[i].carnet + "</td><td>" + tempcolumna.arriba + "</td><td>" + permiso.posicion + "</td><td>" + temppermiso.posicion + "</td><td>" + tempcolumna.posicion + "</td></tr>\n";                                
                                        tempcolumna = tempcolumna.siguiente
                                    }
                                    temppermiso = temppermiso.abajo
                                }
                            }
                        }
                        auxHijo = auxHijo.siguiente
            
                    }
                    auxPadre = auxPadre.abajo
                }
            }
        }
    }
    return cadena
}
function tpermisos(){
    let datos = mostrarpermisos(tablaHash);
    document.getElementById("permisost").innerHTML = datos;
}