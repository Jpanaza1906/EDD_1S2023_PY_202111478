export class Estudiante{
    constructor(nombre, carnet, password, carpeta){
        this.nombre = nombre;
        this.carnet = carnet;
        this.password = password;
        this.carpeta = carpeta;
    }
}
export class nodoArbol {
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
export class ArbolAVL {
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