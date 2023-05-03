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
    constructor(carnet, usuario, password){
        this.carnet = carnet
        this.usuario = usuario
        this.password = password
    }
}

class TablaHash{
    constructor(){
        this.tabla = new Array(7)
        this.capacidad = 7
        this.utilizacion = 0
    }

    insertar(carnet, usuario, password){
        let indice = this.calculoIndice(carnet)
        const nuevoNodo = new nodoHash(carnet, usuario, password)
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
            this.insertar(alumno.carnet, alumno.usuario, alumno.password)
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

    busquedaUsuario(carnet){
        let indice = this.calculoIndice(carnet)
        if(indice < this.capacidad){
            try{
                if(this.tabla[indice] == null){
                    alert("Bienvenido " + this.tabla[indice].usuario)
                }else if(this.tabla[indice] != null && this.tabla[indice].carnet == carnet){
                    alert("Bienvenido " + this.tabla[indice].usuario)
                }else{
                    let contador = 1
                    indice = this.RecalculoIndice(carnet,contador)
                    while(this.tabla[indice] != null){
                        contador++
                        indice = this.RecalculoIndice(carnet, contador)
                        if(this.tabla[indice].carnet == carnet){
                            alert("Bienvenido " + this.tabla[indice].usuario)
                            return
                        }
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

}

const clave = 'clave-secreta'
const buffer = new ArrayBuffer(16)
const view = new Uint8Array(buffer)
for(let i = 0; i < clave.length; i++){
    view[i] = clave.charCodeAt(i)
}

const iv = crypto.getRandomValues(new Uint8Array(16))
const algoritmo = {name: 'AES-GCM', iv: iv}

async function encriptacion(mensaje){    
    const enconder = new TextEncoder()
    const data = enconder.encode(mensaje)

    const claveCrypto = await crypto.subtle.importKey('raw', view, 'AES-GCM', true, ['encrypt'])

    const mensajeCifrado = await crypto.subtle.encrypt(algoritmo, claveCrypto, data)

    const cifradoBase64 = btoa(String.fromCharCode.apply(null, new Uint8Array(mensajeCifrado)))
    
    return cifradoBase64;
}

async function desencriptacion(mensaje){
    const mensajeCifrado = new Uint8Array(atob(mensaje).split('').map(char => char.charCodeAt(0)))

    const claveCrypto = await crypto.subtle.importKey('raw', view, 'AES-GCM', true, ['decrypt'])

    const mensajeDescifrado = await crypto.subtle.decrypt(algoritmo, claveCrypto, mensajeCifrado)

    const decoder = new TextDecoder()
    const mensajeOriginal = decoder.decode(mensajeDescifrado)

    return mensajeOriginal
}
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
function recorridoInorderHash(raiz, tabla){
    cadena = ""
    if(raiz !== null){
        if(raiz.izquierdo !== null){
            recorridoInorderHash(raiz.izquierdo,tabla);          
        }
        let alum = raiz.estudiante;
        tabla.insertar(alum.carnet,alum.nombre,alum.password)
        if(raiz.derecho !== null){
            recorridoInorderHash(raiz.derecho,tabla);
        }
    }
}
async function encripContra(tabla, contra){
    let contraencrip = await encriptacion(contra)
    tabla.password = contraencrip
}
      
var Narbol = new ArbolAVL();
Narbol.raiz = arbolE.raiz;

const thash = JSON.parse(localStorage.getItem("tabla_estudiantes"));
var tablaHash = new TablaHash()
if(thash != null){
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
        recorridoInorderHash(Narbol.raiz, tablaHash)
        for(var i = 0; i < tablaHash.capacidad; i++){
            if(tablaHash.tabla[i] != null){
                let contra = tablaHash.tabla[i].password
                encripContra(tablaHash.tabla[i],contra)
            }
        }
    }
    else{
        alert("no tiene nada")
    }
}
function tabla(){
    localStorage.setItem("tabla_estudiantes", JSON.stringify(tablaHash));
    tablaHash.genera_tabla()
}
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
}
function tpermisos(){
    let datos = recorridoInorderPermisos(Narbol.raiz);
    document.getElementById("permisost").innerHTML = datos;
}