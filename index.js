//Clases Creadas creadas

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

    busquedaUsuario(carnet, pass_en){
        let indice = this.calculoIndice(carnet)
        if(indice < this.capacidad){
            try{
                if(this.tabla[indice] == null){
                    alert("No se encontro el alumno")
                }else if(this.tabla[indice] != null && this.tabla[indice].carnet == carnet){
                    if(this.tabla[indice].password == pass_en){
                        return this.tabla[indice]
                    }else{
                        return false
                    }
                }else{
                    let contador = 1
                    indice = this.RecalculoIndice(carnet,contador)
                    while(this.tabla[indice] != null){
                        if(this.tabla[indice].carnet == carnet){
                            if(this.tabla[indice].password == pass_en){
                                return this.tabla[indice]
                            }else{
                                return false
                            }
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


var url_str = String(window.location.href);
var url = new URL(url_str);
var c = url.searchParams.get("l")
const tablaHash = new TablaHash();
if (c === null){
    localStorage.clear()
}
else{    
    var numAlum = 0
    const TablaE = JSON.parse(localStorage.getItem("tabla_estudiantes"))
    if(TablaE.utilizacion != 0){
        tablaHash.tabla = TablaE.tabla
        tablaHash.capacidad = TablaE.capacidad
        tablaHash.utilizacion = TablaE.utilizacion
    }
}




//Funcion para el login
async function login(){
    localStorage.setItem("login",false);
    localStorage.setItem("tabla_estudiantes", JSON.stringify(tablaHash))
    var user = document.getElementById("myinput").value;
    var password = document.getElementById("myinput2").value;
    if(user === "admin" && password === "admin"){
        localStorage.setItem("login", true); 
        localStorage.setItem("user", "admin")       
        window.location.replace("EDD_Proyecto1_Fase3/admin_html/mainadmin.html");
    }
    else if(user != "" && password != ""){
        try{        
            var student
            student = await busqueda(user,password)
            console.log(student)
            if(student != false){
                localStorage.setItem("user", JSON.stringify(student));
                localStorage.setItem("login", true);
                window.location.replace("EDD_Proyecto1_Fase3/user_html/main.html");
                
            }
            else{
                alert("Datos de inicio de sesion incorrectos.");
            }

        } catch (error) {
            console.log(error)
        }
    }
}

async function busqueda(user, password){
    let pass_en = await tablaHash.sha256(password)
    return tablaHash.busquedaUsuario(user, pass_en)
}