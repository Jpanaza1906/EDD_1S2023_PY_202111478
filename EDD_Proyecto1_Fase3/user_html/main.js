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
var tcarpetas = 0;
var toperaciones = 0;
var log = localStorage.getItem("login");
localStorage.setItem("login", log);
var user = localStorage.getItem("user");
localStorage.setItem("user",user);

const thash = JSON.parse(localStorage.getItem("tabla_estudiantes"));
var tablaHash = new TablaHash()
if(thash.utilizacion != 0){
    tablaHash.tabla = thash.tabla
    tablaHash.capacidad = thash.capacidad
    tablaHash.utilizacion = thash.utilizacion
}
localStorage.setItem("tabla_estudiantes", JSON.stringify(tablaHash));
var Grafo = new grafoDirigido()


var nombre = user;
var carnet = ""
if(user != "admin"){
    var estudiante = JSON.parse(user);
    nombre = estudiante.usuario    
    carnet = estudiante.carnet; 
    Grafo.principal = estudiante.grafoarchivos.principal 
    refrescarGrafo()

}
function refrescarGrafo(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = Grafo.grafica()
    document.getElementById("image").setAttribute("src",url+body);
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
         
    }
    else{
        alert("No tiene creedenciales");
        document.getElementById("logout").click();
    }
}

//seleccionar de archivos
document.getElementById("carne").innerHTML = carnet;
document.getElementById("nombre").innerHTML = nombre
//DEVUELVE EL NODO RAIZ
function buscar_carne(raiz, carnet){
    if(raiz === null){
        return false;
    }
    else if(raiz.estudiante.carnet > carnet){
        return buscar_carne(raiz.izquierdo,carnet);
    }
    else if(raiz.estudiante.carnet < carnet){
        return buscar_carne(raiz.derecho, carnet);
    }
    else if(raiz.estudiante.carnet === carnet){
        return raiz
    }
    else{
        return false;
    }
}
//SELECCIONADOR DE ARCHIVOS-----------------------------------
const dropArea = document.querySelector(".main").querySelector(".details").querySelector(".recentAlumnos").querySelector(".drag-area");
const dragText = dropArea.querySelector("h2");
const button = dropArea.querySelector("button");
const input = dropArea.querySelector("#input-file");
const cajatext = document.querySelector(".main").querySelector(".details").querySelector(".recentOp").querySelector(".cardHeader").querySelector(".search").querySelector("input");
/*
IMAGEN: <ion-icon name="image-outline"></ion-icon>
PDF: <ion-icon name="document-outline"></ion-icon>
TEXTO: <ion-icon name="document-text-outline"></ion-icon>
CARPETA: <ion-icon name="folder-outline"></ion-icon>
*/
cajatext.addEventListener("keyup", (e) =>{
    var texto = cajatext.value;
    var tablaCarp = arbol_archivos.mostrarCarpetasActuales(texto);
    document.getElementById("archivo").innerHTML = tablaCarp;
    
});


button.addEventListener('click', e =>{
    input.click();
});
input.addEventListener("change", (e) => {
    files = input.files;
    dropArea.classList.add("active");
    showFiles(files)
    dropArea.classList.remove("active");
});

dropArea.addEventListener("dragover", (e) =>{
    e.preventDefault();
    dropArea.classList.add("active");
    dragText.textContent = "Suelta para subir los archivos";
});
dropArea.addEventListener("dragleave", (e) =>{
    e.preventDefault();
    dropArea.classList.remove("active");
    dragText.textContent = "Arrastra y suelta imagenes";
    
});
dropArea.addEventListener("drop", (e) =>{
    e.preventDefault();
    files = e.dataTransfer.files;
    showFiles(files)
    dropArea.classList.remove("active");
    dragText.textContent = "Arrastra y suelta imagenes";
});

function showFiles(files){
    if(files.length === undefined){
        processFile(files);
    }else{
        for(const file of files){
            processFile(file);
        }
    }
}
function processFile(file){
    const docType = file.type;
    const validExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif','application/pdf','text/plain'];
    if(validExtensions.includes(docType)){
        //archivo valido        
    toperaciones++;
    document.getElementById("operacionesn").innerHTML = String(toperaciones);
        const fileReader = new FileReader();
        fileReader.addEventListener('load', e =>{
            var ruta = document.getElementById("rutatx").value;
            arbol_archivos.insertarValor(String(ruta),String(file.name));
            //Bitacora
            var fecha = String(new Date().toLocaleString().replace(",","").replace(/:.. /," "))
            var accion = "Se subió archivo \'" + String(file.name) + "\' el " + fecha;
            bitacora.agregar_inicio(accion);
            alert(accion)
            let md2 = "{ \"primero\":" + bitacora.reporteJson(bitacora.primero) + ","
            md2 += "\"ultimo\":" + bitacora.reporteJson(bitacora.ultimo) + "}";            
            nodoEstudiante.bitacora = JSON.parse(md2);
            nodoEstudiante.archivos = arbol_archivos;
            //BASE 64
            //fileReader.onload = onReaderLoad
            var tablaCarp = arbol_archivos.mostrarCarpetasActuales(ruta);
            document.getElementById("archivo").innerHTML = tablaCarp;
        });
        fileReader.readAsDataURL(file);
    }else{
        //no es un archivo valido
        alert("No es un archivo valido.");
    }
}

function permisosrep(){
    var ruta = document.getElementById("rutatx").value;
    let lista_carpeta = ruta.split('/')
    let existe_carpeta = arbol_archivos.BuscarCarpetaV2(lista_carpeta)
    var matriz_permisos = new Matriz(existe_carpeta.valor);
    matriz_permisos.principal = existe_carpeta.matrizpermisos.principal
    matriz_permisos.coordenadaX = existe_carpeta.matrizpermisos.coordenadaX
    matriz_permisos.coordenadaY = existe_carpeta.matrizpermisos.coordenadaY

    let url = 'https://quickchart.io/graphviz?graph=';
    let body = matriz_permisos.reporte();
    let loca = url + body
    window.open(loca, '_blank');
}