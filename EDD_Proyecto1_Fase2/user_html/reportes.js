//ESTRUCTURAS
//ESTUDIANTE -------------------------------------------------------------------
class Estudiante{
    constructor(nombre, carnet, password, carpeta){
        this.nombre = nombre;
        this.carnet = carnet;
        this.password = password;
        this.carpeta = carpeta;
    }
}
//NODOARBOL // ARBOL AVL CLASE ----------------------------------------------------------------
class nodoArbol {
    constructor(estudiante){
        this.izquierdo = null;
        this.derecho = null;
        this.estudiante = estudiante;
        this.altura = 1;
        this.factor_equilibrio = 0;
        this.permisos = null;
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
//ARBOL NARIO ARCHIVOS ESTUDIANTE --------------------------------------------------------------------------
class nodonArbol{
    constructor(valor, id){
        this.siguiente = null;
        this.valor = valor;
        this.primero = null;
        this.id = id;
    }
}

class ArbolNArio{
    constructor(){
        this.raiz = new nodonArbol("/", 0)
        this.nodo_creados = 1;
    }

    BuscarCarpeta(carpeta_nueva, lista_carpeta){
        //Si la nueva carpeta se creara en la raiz, se buscara si existe o no
        if(lista_carpeta[1] === "" && this.raiz.primero !== null){
            let aux = this.raiz.primero
            while(aux){
                if(aux.valor === carpeta_nueva){
                    return 1
                }
                aux = aux.siguiente
            }
            return 2
        }
        //Si la nueva carpeta se creara en la raiz pero no existe ninguna carpeta
        else if (lista_carpeta[1] === "" && this.raiz.primero === null){
            return 5
        }
        //Si la nueva carpeta se creara en algun directorio pero la raiz no posee ninguna carpeta
        else if(lista_carpeta[1] !== "" && this.raiz.primero === null){
            return 3
        }
        //Buscamos el directorio padre y revisar si en sus hijos existe la carpeta
        else if(lista_carpeta[1] !== "" && this.raiz.primero !== null){
            let aux = this.raiz.primero
            let nivel = lista_carpeta.length
            let posicion = 1; 
            for(var i = 1; i < nivel; i++){
                if(aux !== null){
                    while(aux){
                        if(posicion < lista_carpeta.length && lista_carpeta[posicion] === aux.valor){
                            posicion++
                            if(aux.primero !== null && posicion < lista_carpeta.length){
                                aux = aux.primero
                            }
                            break;
                        }else{
                            aux = aux.siguiente
                        }
                    }
                }else{
                    break;
                }
            }
            if(aux !== null){
                aux = aux.primero
                while(aux){
                    if(aux.valor === carpeta_nueva){
                        return 1
                    }
                    aux = aux.siguiente
                }
                return 2
            }else{
                return 4
            }

        }
    }
    //Funcion solo para ordenar la lista de hijos cuando el padre posee varios hijos
    insertarOrdenado(raiz, nuevoNodo){
        let piv = raiz.primero
        if(nuevoNodo.valor < raiz.primero.valor){
            nuevoNodo.siguiente = raiz.primero
            raiz.primero = nuevoNodo
            return raiz
        }else{
            while(piv.siguiente){
                if( nuevoNodo.valor > piv.valor && nuevoNodo.valor < piv.siguiente.valor){
                    nuevoNodo.siguiente = piv.siguiente
                    piv.siguiente = nuevoNodo
                    return raiz
                }else if(nuevoNodo.valor < piv.valor){
                    nuevoNodo.siguiente = piv
                    piv =  nuevoNodo
                    return raiz
                }else{
                    piv = piv.siguiente
                }
            }
            piv.siguiente = nuevoNodo
            return raiz
        }
    }
    // /usac/prueba -> prueba1 /usac/prueba(prueba1)
    insertarHijos(carpeta_nueva, lista_carpeta){
        /**
         * creamos el nuevo nodo y aumentamos la cantidad de nodos creados
         */
        const nuevoNodo = new nodonArbol(carpeta_nueva, this.nodo_creados)
        this.nodo_creados++
        //Corroboramos si la insercion es en la raiz y si la raiz no tiene ninguna carpeta
        if(lista_carpeta[1] === "" && this.raiz.primero === null){
            this.raiz.primero = nuevoNodo
        }
        //Corroboramos si la insercion es en la raiz y pero la raiz ya tiene carpetas
        else if(lista_carpeta[1] === "" && this.raiz.primero !== null){
            this.raiz = this.insertarOrdenado(this.raiz, nuevoNodo)
        }
        //Corroboramos si la insercion es en algun directorio que no es la raiz
        else if(lista_carpeta[1] !== "" && this.raiz.primero !== null){
            let aux = this.raiz.primero
            let nivel = lista_carpeta.length
            let posicion = 1; 
            //Recorremos hasta llegar a la profundidad maxima donde se quiere insertar la nueva carpeta
            for(var i = 1; i < nivel; i++){
                if(aux !== null){
                    while(aux){
                        //Comparamos si las posiciones de la lista de carpetas es igual a la del nodo actual sino seguimos buscando
                        if(posicion < lista_carpeta.length && lista_carpeta[posicion] === aux.valor){ 
                            posicion++
                            //Esta comparacion es para asegurarnos que nos quedaremos en el nodo padre
                            if(aux.primero !== null && posicion < lista_carpeta.length){
                                aux = aux.primero
                            }
                            break;
                        }else{
                            aux = aux.siguiente
                        }
                    }
                }else{
                    break;
                }
            }
            //Si la carpeta padre ya tiene carpetas se agrega en el primero sino se manda a insertar en el orden correcto
            if(aux.primero === null){
                aux.primero = nuevoNodo
            }else{
                aux = this.insertarOrdenado(aux, nuevoNodo)
            }
        }
    }
    /**
     * 1 - Carpeta ya existe
     * 2 - la carpeta no existe
     * 3 - El directorio no es correcto o no es valido
     * 4 - Directorio no valido
     * 5 - No existe ninguna carpeta en la raiz
     * 
     */
    insertarValor(ruta, carpeta_nueva){
        if(ruta.indexOf(".") == -1){
            let lista_carpeta = ruta.split('/')
            let existe_carpeta = this.BuscarCarpeta(carpeta_nueva, lista_carpeta)
            switch(existe_carpeta){
                case 1:
                    var cont = 1;
                    var carpeta =""
                    while(existe_carpeta == 1){
                        carpeta = carpeta_nueva + "(copia" + cont + ")";
                        existe_carpeta = this.BuscarCarpeta(carpeta, lista_carpeta);
                        cont++;
                    }
                    this.insertarHijos(carpeta, lista_carpeta)
                    alert("La carpeta ya existe")
                    break;
                case 2:
                    this.insertarHijos(carpeta_nueva, lista_carpeta)
                    break;
                case 3:
                    alert("La ruta actual no existe")
                    break;
                case 4:
                    alert("La ruta actual no es valida")
                    break;
                case 5:
                    this.insertarHijos(carpeta_nueva, lista_carpeta)
                    break;
            }
        }
        else{
            alert("Se eligio un archivo")
        }
    }

    grafica_arbol(){
        var cadena = "";
        if(!(this.raiz === null)){
            cadena = "digraph arbol{ ";
            cadena = cadena + this.retornarValoresArbol(this.raiz);
            cadena = cadena + "}";
        }else{
            cadena = "digraph G { arbol }";
        }
        return cadena;
    }

    /** le mando el parametro primero y solo recorre los siguientes*/
    retornarValoresArbol(raiz){
        var cadena = "node[shape=record] ";
        let nodo = 1;
        let nodo_padre = 0;
        cadena += "nodo" + nodo_padre + "[label=\"" + this.raiz.valor  + "\"] "
        cadena += this.valoresSiguietes(this.raiz.primero, nodo, nodo_padre)
        cadena += this.conexionRamas(this.raiz.primero, 0)
        return cadena;
    }


    valoresSiguietes(raiz, nodo, nodo_padre){
        let cadena = ""
        let aux = raiz
        let nodo_padre_aumento = nodo_padre
        if(aux !== null){
            while(aux){
                cadena += "nodo" + aux.id + "[label=\"" + aux.valor  + "\"] "
                aux = aux.siguiente
            }
            aux = raiz
            while(aux){
                nodo_padre_aumento++
                cadena += this.valoresSiguietes(aux.primero, this.nodo_creados, nodo_padre_aumento)
                aux = aux.siguiente
            }
        }
        return cadena
    }

    conexionRamas(raiz, padre){
        let cadena = ""
        let aux = raiz
        if(aux !== null){
            while(aux){
                cadena += "nodo" + padre + " -> nodo" + aux.id + " "
                aux = aux.siguiente
            }
            aux = raiz
            while(aux){
                cadena += this.conexionRamas(aux.primero, aux.id)
                aux = aux.siguiente
            }
        }
        return cadena
    }

    /** Modificacion 30/03/2023 */
    BuscarCarpetaV2(lista_carpeta){
        //Directorio Actual seria la Raiz
        if(lista_carpeta[1] === "" && this.raiz.primero !== null){
            return this.raiz
        }
        //Directorio Actual seria Raiz pero no contiene elementos
        else if (lista_carpeta[1] === "" && this.raiz.primero === null){
            return null
        }
        //Actual no es raiz pero tampoco hay elementos en raiz
        else if(lista_carpeta[1] !== "" && this.raiz.primero === null){
            return null
        }
        //Buscamos el directorio padre y revisar si en sus hijos existe la carpeta
        else if(lista_carpeta[1] !== "" && this.raiz.primero !== null){
            let aux = this.raiz.primero
            let nivel = lista_carpeta.length
            let posicion = 1; 
            for(var i = 1; i < nivel; i++){
                if(aux !== null){
                    while(aux){
                        if(posicion < lista_carpeta.length && lista_carpeta[posicion] === aux.valor){
                            posicion++
                            if(aux.primero !== null && posicion < lista_carpeta.length){
                                aux = aux.primero
                            }
                            break;
                        }else{
                            aux = aux.siguiente
                        }
                    }
                }else{
                    break;
                }
            }
            if(aux !== null){
                return aux
            }else{
                return null
            }

        }
    }

    mostrarCarpetasActuales(ruta){
        let lista_carpeta = ruta.split('/')
        let existe_carpeta = this.BuscarCarpetaV2(lista_carpeta)
        try{
            if(existe_carpeta !== null){
                let aux = existe_carpeta.primero
                while(aux){
                    console.log(aux.valor)
                    aux = aux.siguiente
                }
            }
        }catch(error){
            console.log("Hubo un error")
        }
    }
}
// MATRIZ DISPERSA CLASE -----------------------------------------------------------------
class nodoMatriz{
    constructor(posX, posY, nombre_archivo){
        this.siguiente = null;
        this.anterior = null;
        this.abajo = null;
        this.arriba = null;
        this.posX = posX;
        this.posY = posY;
        this.posicion = nombre_archivo;
    }
}

class Matriz{
    constructor(){
        this.principal = new nodoMatriz(-1,-1,"Raiz")
        this.coordenadaY = 0;
        this.coordenadaX = 0;
    }

    buscarF(nombre_archivo){
        let aux = this.principal
        while(aux){
            /**if(aux.posY === y) */
            if(aux.posicion === nombre_archivo){
                return aux;
            }else{
                aux = aux.abajo;
            }
        }
        return null;
    }

    buscarC(carnet){
        let aux = this.principal;
        while(aux){
            /**if(aux.posX === x) */
            if(aux.posicion === carnet){
                return aux;
            }else{
                aux = aux.siguiente
            }
        }
        return null;
    }

    insertarColumna(posicion,texto){
        const nuevoNodo = new nodoMatriz(posicion,-1,texto);
        let piv = this.principal;
        let pivA = this.principal;
        while(piv.siguiente){
            if(nuevoNodo.posX > piv.posX){
                pivA = piv;
                piv = piv.siguiente
            }else{
                nuevoNodo.siguiente = piv;
                nuevoNodo.anterior = pivA;
                pivA.siguiente = nuevoNodo;
                piv.anterior = nuevoNodo;
                return;
            }
        }
        nuevoNodo.anterior = piv;
        piv.siguiente = nuevoNodo;
    }

    insertarFila(posicion,texto){
        const nuevoNodo = new nodoMatriz(-1,posicion,texto);
        let piv = this.principal;
        let pivA = this.principal;
        while(piv.abajo){
            if(nuevoNodo.posY > piv.posY){
                pivA = piv;
                piv = piv.abajo;
            }else{
                nuevoNodo.abajo = piv;
                nuevoNodo.arriba = pivA;
                pivA.abajo = nuevoNodo;
                piv.arriba = nuevoNodo;
                return;
            }
        }
        nuevoNodo.arriba = piv;
        piv.abajo = nuevoNodo;
    }
    
    insertarNodo(x,y,texto){
        const nuevoNodo = new nodoMatriz(x,y,texto);
        let tempX = this.principal;
        let tempY = this.principal;
        //Agregar en Columna
        while(tempX.siguiente){
            if(tempX.posX === nuevoNodo.posX){
                break;
            }
            tempX = tempX.siguiente;
        }
        while(true){
            if(tempX.posY === nuevoNodo.posY){
                break;
            }else if(tempX.abajo !== null && tempX.abajo.posY > nuevoNodo.posY){
                nuevoNodo.abajo = tempX.abajo;
                nuevoNodo.arriba = tempX;
                tempX.abajo = nuevoNodo;
                break;
            }else if(tempX.abajo === null){
                nuevoNodo.arriba = tempX
                nuevoNodo.abajo = tempX.abajo
                tempX.abajo = nuevoNodo;
                break;
            }else{
                tempX = tempX.abajo;
            }
        }
        //Agregar en Fila
        while(tempY.abajo){
            if(tempY.posY === nuevoNodo.posY){
                break;
            }
            tempY = tempY.abajo;
        }
        while(true){
            if(tempY.posX === nuevoNodo.posX){
                break;
            }else if(tempY.siguiente !== null && tempY.siguiente.posX > nuevoNodo.posX){
                nuevoNodo.siguiente = tempY.siguiente;
                nuevoNodo.anterior = tempY;
                tempY.siguiente = nuevoNodo;
            }else if(tempY.siguiente === null){
                nuevoNodo.anterior = tempY;
                nuevoNodo.siguiente = tempY.siguiente;
                tempY.siguiente = nuevoNodo;
            }else{
                tempY = tempY.siguiente;
            }
        }
    }

    insertarElemento(x,y){
        let texto = x + "," + y;
        let nuevaFila = this.buscarF(y);
        let nuevaColumna = this.buscarC(x);
        /** Fila y Columna no existen */
        if(nuevaFila === null && nuevaColumna === null){
            this.insertarColumna(x, "C"+x);
            this.insertarFila(y, "F"+y);
            this.insertarNodo(x,y,texto);
        }else if(nuevaFila === null && nuevaColumna !== null){ /* Fila no existe, Columna si existe */
            this.insertarFila(y,"F"+y);
            this.insertarNodo(x,y,texto);
        }else if(nuevaFila !== null && nuevaColumna === null){/* Fila si existe, Columna no existe */
            this.insertarColumna(x, "C"+x);
            this.insertarNodo(x,y,texto);
        }else if(nuevaFila !== null && nuevaColumna !== null){/* Fila si existe, Columna si existe */
            this.insertarNodo(x,y,texto);
        }else{
            console.log("Me dio Ansiedad :(");
        }
    }

    insertarArchivo(texto){
        let nuevaFila = this.buscarF(texto)
        if(nuevaFila === null){
            this.insertarFila(this.coordenadaY,texto)
            this.coordenadaY++
        }
    }

    colocarPermiso(archivo, carnet, permisos){
        /** NOTA: Paso Previo Buscar en AVL si existe el carnet*/
        let nuevaColumna = this.buscarC(carnet)
        let nuevaFila = this.buscarF(archivo)
        if(nuevaColumna === null){
            this.insertarColumna(this.coordenadaX, carnet)
            this.coordenadaX++
            nuevaColumna = this.buscarC(carnet)
        }
        if(nuevaColumna !== null && nuevaFila !== null){
            this.insertarNodo(nuevaColumna.posX, nuevaFila.posY, permisos)
        }
    }

    reporte(){
        let cadena = "";
        let aux1 = this.principal;
        let aux2 = this.principal;
        let aux3 = this.principal;
        if(aux1 !== null){
            cadena = "digraph MatrizCapa{ node[shape=box]  rankdir=UD;  {rank=min; ";
            /** Creacion de los nodos actuales */
            while(aux1){
                cadena += "nodo" + (aux1.posX+1) + (aux1.posY+1) + "[label=\"" + aux1.posicion + "\" ,rankdir=LR,group=" + (aux1.posX+1) + "]; ";
                aux1 = aux1.siguiente;
            }
            cadena += "}"
            while(aux2){
                aux1 = aux2;
                cadena += "{rank=same; ";
                while(aux1){
                    cadena += "nodo" + (aux1.posX+1) + (aux1.posY+1) + "[label=\"" + aux1.posicion + "\" ,group=" + (aux1.posX+1) + "]; ";
                    aux1 = aux1.siguiente;
                }
                cadena += "}";
                aux2 = aux2.abajo;
            }
            /** Conexiones entre los nodos de la matriz */
            aux2 = aux3;
            while(aux2){
                aux1 = aux2;
                while(aux1.siguiente){
                    cadena += "nodo" + (aux1.posX+1) + (aux1.posY+1) + " -> " + "nodo" + (aux1.siguiente.posX+1) + (aux1.siguiente.posY+1) + " [dir=both];"
                    aux1 = aux1.siguiente
                }
                aux2 = aux2.abajo;
            }
            aux2 = aux3;
            while(aux2){
                aux1 = aux2;
                while(aux1.abajo){
                    cadena += "nodo" + (aux1.posX+1) + (aux1.posY+1) + " -> " + "nodo" + (aux1.abajo.posX+1) + (aux1.abajo.posY+1) + " [dir=both];"
                    aux1 = aux1.abajo
                }
                aux2 = aux2.siguiente;
            }
            cadena +=  "}";
        }else{
            cadena = "No hay elementos en la matriz"
        }
        return cadena;
    }    
    reporteJson(principal){
        var strjson = "";
        if(principal === null){
            return "null";
        }
        else{
            strjson += "{"
            strjson += "\"siguiente\":" + this.reporteJson(principal.siguiente) + ",";
            strjson += "\"abajo\":" + this.reporteJson(principal.abajo) + ",";
            strjson += "\"posX\":" + principal.posX + ",";
            strjson += "\"posY\":" + principal.posY + ",";
            strjson += "\"posicion\":\"" + principal.posicion + "\""
            strjson += "}"
            return strjson;
        }
    }
}

//LOCALSTORAGE
const arbolE = JSON.parse(localStorage.getItem("avl_estudiantes"));
var AvlArbol = new ArbolAVL();
AvlArbol.raiz = arbolE.raiz;
localStorage.setItem("avl_estudiantes", JSON.stringify(AvlArbol));
var log = localStorage.getItem("login");
localStorage.setItem("login", log);
const user = localStorage.getItem("user");
localStorage.setItem("user",user);


//NODO ESTUDIANTE
var nodoEstudiante = buscar_carne(AvlArbol.raiz, JSON.parse(user).carnet);
var arbol_archivos = new ArbolNArio()
var matriz_permisos = new Matriz()
if(nodoEstudiante.archivos == null){
    nodoEstudiante.archivos = arbol_archivos;
}
else{
    arbol_archivos.raiz = nodoEstudiante.archivos.raiz
}
if(nodoEstudiante.permisos == null){
    nodoEstudiante.permisos = matriz_permisos;
}
else{
    matriz_permisos.principal = nodoEstudiante.permisos.principal
    matriz_permisos.coordenadaX = nodoEstudiante.permisos.coordenadaX
    matriz_permisos.coordenadaY = nodoEstudiante.permisos.coordenadaY
}

var nombre = user;
var carnet = ""
if(user != "admin"){
    var estudiante = JSON.parse(user);
    nombre = estudiante.nombre;
    carnet = estudiante.carnet;    
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
function biblioteca(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = arbol_archivos.grafica_arbol();
    document.getElementById("image").setAttribute("src",url+body);
}
function permisos(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = matriz_permisos.reporte();
    document.getElementById("image").setAttribute("src",url+body);
}
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