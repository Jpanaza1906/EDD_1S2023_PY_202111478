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
        this.matrizpermisos = null
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
                        carpeta = "(copia" + cont + ")" + carpeta_nueva;
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
            return this.raiz
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
        let rutaarray = ruta.split("");
        let cadena = "";
        if(ruta != "" && rutaarray[0] === "/"){
            let lista_carpeta = ruta.split('/')
            let existe_carpeta = this.BuscarCarpetaV2(lista_carpeta)
            
            try{
                if(existe_carpeta !== null){                
                    let aux = existe_carpeta.primero
                    while(aux){
                        cadena += "<tr>\n";
                        if(aux.valor.indexOf(".jpg") != -1 || aux.valor.indexOf(".jpeg") != -1 || aux.valor.indexOf(".png") != -1 || aux.valor.indexOf(".gif") != -1){
                            cadena += "<td><ion-icon name=\"image-outline\"></ion-icon></td>\n";
                            cadena += "<td>" + aux.valor + "</td>\n";
                            cadena += "<td> IMAGEN </td>\n"
                        }
                        else if(aux.valor.indexOf(".pdf") != -1){
                            cadena += "<td><ion-icon name=\"document-outline\"></ion-icon></td>\n";
                            cadena += "<td>" + aux.valor + "</td>\n";
                            cadena += "<td> PDF </td>\n"
                        }
                        else if(aux.valor.indexOf(".txt") != -1){
                            cadena += "<td><ion-icon name=\"document-text-outline\"></ion-icon></td>\n";
                            cadena += "<td>" + aux.valor + "</td>\n";
                            cadena += "<td> TEXTO </td>\n"
                        }
                        else{
                            cadena += "<td><ion-icon name=\"folder-outline\"></ion-icon></td>\n";
                            cadena += "<td>" + aux.valor + "</td>\n";
                            cadena += "<td> CARPETA </td>\n"
                        }   
                        cadena += "<td>"
                        if(aux.valor.indexOf(".") != -1){
                            cadena += "<input id=\"btn-permisos\" type=\"button\" value=\"Permisos\" onclick=\"permisos('"+ aux.valor +"')\">\n"
                        }                 
                        cadena +="<input id=\"btn-eliminar\" type=\"button\" value=\"Eliminar\" onclick=\"eliminar('"+ aux.valor +"')\"></td>\n"
                        cadena +="</tr>\n"
                        aux = aux.siguiente
                    }
                    if(aux === null){
                        cadena += "<tr>\n"
                        cadena += "<td><ion-icon name=\"folder-outline\"></ion-icon></td>\n";
                        cadena += "<td><input id=\"nuevaC\" type=\"text\"></td>\n"
                        cadena += "<td> CARPETA </td>\n"
                        cadena += "<td><input id=\"btn-crear\" type=\"button\" value=\"Crear\" onclick=\"crearC()\"></td>\n"
                        cadena += "</tr>\n"
                    }
                    localStorage.setItem("avl_estudiantes", JSON.stringify(AvlArbol));
                    return cadena;
                }
                else{
                    cadena = "<tr><td colspan=\"4\">No existe la ruta</td></tr>"                
                    return cadena
                }
            }catch(error){
                cadena = "<tr><td colspan=\"4\">Error al buscar ruta</td></tr>"
                return cadena
            }
        }
        cadena = "<tr><td colspan=\"4\">No existe la ruta</td></tr>"                
        return cadena
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
    constructor(title){
        this.principal = new nodoMatriz(-1,-1,title)
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
            console.log("");
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
//LISTA CIRCULAR BITACORA
class nodoBitacora{
    constructor(accion){
        this.accion = accion;
        this.siguiente = null;
    }
}
class ListaCircular{
    constructor(){
        this.primero = null;
        this.ultimo = null;
    }
    estaVacia(){
        if(this.primero == null){
            return true;
        }
        else{
            return false;
        }
    }
    agregar_inicio(accion){
        let nodob = new nodoBitacora(accion);
        if(this.estaVacia()){
            this.primero = this.ultimo = nodob
        }
        else{
            let temp = nodob;
            temp.siguiente = this.primero;
            this.primero = temp;
        }
        this.unir_nodos()
    }
    unir_nodos(){
        if(this.primero != null){
            this.ultimo.siguiente = this.primero;
        }
    }
    reporteJson(primero){
        var strjson = "";
        if(primero === null){
            return "null";
        }
        else if(primero === this.ultimo){
            strjson += "{"
            strjson += "\"accion\":\"" + primero.accion + "\",";
            strjson += "\"siguiente\":" + "null";
            strjson += "}"
            return strjson;
        }
        else{
            strjson += "{"
            strjson += "\"accion\":\"" + primero.accion + "\",";
            strjson += "\"siguiente\":" + this.reporteJson(primero.siguiente);
            strjson += "}"
            return strjson;
        }
    }
}
//FUNCION PARA CONCEDER PERMISOS
function permisos(id){
    var tipo = prompt("Ingrese el tipo de permiso R - W - RW para el archivo: " + id, "")
    var tipovalido = false;
    switch(tipo.toLowerCase()){
        case "r":
            tipovalido = true;
            break;
        case "w":
            tipovalido = true;
            break;
        case "rw":
            tipovalido = true;
            break;
        default:
            tipovalido = false;
            break;
    }
    
    if(tipovalido){
        var carnet = prompt("Ingrese el carnet para otogar permisos","");
        try{
            var carnetV = buscar_carne(AvlArbol.raiz, parseInt(carnet));
            if(carnetV){
                //OBTENER NODO DEE CARPETA
                var ruta = document.getElementById("rutatx").value;
                let lista_carpeta = ruta.split('/')
                let existe_carpeta = arbol_archivos.BuscarCarpetaV2(lista_carpeta)                
                var matriz_permisos = new Matriz(existe_carpeta.valor);
                if(existe_carpeta.matrizpermisos != null){
                    matriz_permisos.principal = existe_carpeta.matrizpermisos.principal
                    matriz_permisos.coordenadaX = existe_carpeta.matrizpermisos.coordenadaX
                    matriz_permisos.coordenadaY = existe_carpeta.matrizpermisos.coordenadaY
                    //-------
                    matriz_permisos.insertarArchivo(id)
                    matriz_permisos.colocarPermiso(id,carnet,tipo.toUpperCase())
                    existe_carpeta.matrizpermisos = matriz_permisos
                }else{
                    matriz_permisos.insertarArchivo(id)
                    matriz_permisos.colocarPermiso(id,carnet,tipo.toUpperCase())
                    existe_carpeta.matrizpermisos = matriz_permisos
                }
                
                var fecha = String(new Date().toLocaleString().replace(",","").replace(/:.. /," "))
                var accion = "Se colocó permisos "+ tipo.toUpperCase() +" al archivo \'" + String(id) + "\' para el carnet: " + carnet + " el "+ fecha;
                bitacora.agregar_inicio(accion);
                alert(accion)
                let md = "{\"principal\":" + matriz_permisos.reporteJson(matriz_permisos.principal) + ","
                md += "\"coordenadaY\":" + matriz_permisos.coordenadaY + ",";
                md+= "\"coordenadaX\":"+ matriz_permisos.coordenadaX + "}" ;
                let md2 = "{ \"primero\":" + bitacora.reporteJson(bitacora.primero) + ","
                md2 += "\"ultimo\":" + bitacora.reporteJson(bitacora.ultimo) + "}";
                nodoEstudiante.bitacora = JSON.parse(md2);
                existe_carpeta.matrizpermisos = JSON.parse(md);
                nodoEstudiante.archivos = arbol_archivos;
                localStorage.setItem("avl_estudiantes", JSON.stringify(AvlArbol));
            }
            else{
                alert("El carnet no es valido.")
            }
        }
        catch(e){

        }
    }
    else{
        alert("El tipo de permiso no es valido.")
    }

}
//FUNCION PARA ELEMINAR CARPETA O ARCHIVO
function eliminar(id){
    toperaciones++;
    document.getElementById("operacionesn").innerHTML = String(toperaciones);
    if(id.indexOf(".") == -1){
        tcarpetas--;
        document.getElementById("carpetasn").innerHTML = String(tcarpetas);
    }
    var ruta = document.getElementById("rutatx").value;
    let lista_carpeta = ruta.split('/')
    let existe_carpeta = arbol_archivos.BuscarCarpetaV2(lista_carpeta)
    try{
        if(existe_carpeta !== null){  
            let aux = existe_carpeta.primero
            if(aux.valor == id){
                existe_carpeta.primero = aux.siguiente;
            }
            else{
                while(aux){
                    if(aux.siguiente.valor == id && aux.siguiente.siguiente === null){
                        aux.siguiente = null;
                        break;
                    }
                    else if(aux.siguiente.valor == id){
                        aux.siguiente = aux.siguiente.siguiente;
                        break;
                    }
                    aux = aux.siguiente
                }
            }          
        }
        //Bitacora
        var fecha = String(new Date().toLocaleString().replace(",","").replace(/:.. /," "))
        var accion = "Se eliminó carpeta \'" + String(id) + "\' el " + fecha;
        bitacora.agregar_inicio(accion);
        alert(accion)
        let md2 = "{ \"primero\":" + bitacora.reporteJson(bitacora.primero) + ","
        md2 += "\"ultimo\":" + bitacora.reporteJson(bitacora.ultimo) + "}";
        nodoEstudiante.bitacora = JSON.parse(md2);
        //
        nodoEstudiante.archivos = arbol_archivos;
        var tablaCarp = arbol_archivos.mostrarCarpetasActuales(ruta);
        document.getElementById("archivo").innerHTML = tablaCarp;
        localStorage.setItem("avl_estudiantes", JSON.stringify(AvlArbol));

    }catch(error){
    }
}
//FUNCION PARA CREAR CARPETA
function crearC(){
    toperaciones++;
    document.getElementById("operacionesn").innerHTML = String(toperaciones);
    var tx = document.getElementById("nuevaC").value;
    if(tx != ""){
        if(tx.indexOf(".") == -1){
            tcarpetas++;
            document.getElementById("carpetasn").innerHTML = String(tcarpetas);
        }
        //Bitacora
        var fecha = String(new Date().toLocaleString().replace(",","").replace(/:.. /," "))
        var accion = "Se creó carpeta \'" + String(tx) + "\' el " + fecha;
        bitacora.agregar_inicio(accion);
        alert(accion)
        let md2 = "{ \"primero\":" + bitacora.reporteJson(bitacora.primero) + ","
        md2 += "\"ultimo\":" + bitacora.reporteJson(bitacora.ultimo) + "}";
        nodoEstudiante.bitacora = JSON.parse(md2);
        //Insertar valores
        var ruta = document.getElementById("rutatx").value;
        arbol_archivos.insertarValor(String(ruta),String(tx));        
        nodoEstudiante.archivos = arbol_archivos;
        var tablaCarp = arbol_archivos.mostrarCarpetasActuales(ruta);
        document.getElementById("archivo").innerHTML = tablaCarp;
    }
}
//LOCALSTORAGE
var tcarpetas = 0;
var toperaciones = 0;
const arbolE = JSON.parse(localStorage.getItem("avl_estudiantes"));
var AvlArbol = new ArbolAVL();
AvlArbol.raiz = arbolE.raiz;
var log = localStorage.getItem("login");
localStorage.setItem("login", log);
const user = localStorage.getItem("user");
localStorage.setItem("user",user);

//NODO ESTUDIANTE
var nodoEstudiante = buscar_carne(AvlArbol.raiz, JSON.parse(user).carnet);
var arbol_archivos = new ArbolNArio();
//igualar matriz inicial
var bitacora = new ListaCircular();
if(nodoEstudiante.archivos == null){
    nodoEstudiante.archivos = arbol_archivos;
}
else{
    arbol_archivos.raiz = nodoEstudiante.archivos.raiz;
    arbol_archivos.nodo_creados = nodoEstudiante.archivos.nodo_creados;
}


if(nodoEstudiante.bitacora == null){
    nodoEstudiante.bitacora = bitacora;
}
else{
    bitacora.primero = nodoEstudiante.bitacora.primero;
    bitacora.ultimo = nodoEstudiante.bitacora.ultimo;
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