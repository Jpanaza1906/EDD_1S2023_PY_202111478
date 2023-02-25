package estructuras

import (
	"fmt"
	"strconv"
)

type ListaDoble struct {
	Inicio   *Nodo
	Final    *Nodo
	Longitud int
}

func (l *ListaDoble) estaVacia() bool {
	if l.Longitud == 0 {
		return true
	} else {
		return false
	}
}

func (l *ListaDoble) AgregarEstudiante(nestudiante *Estudiante) {
	if l.estaVacia() {
		nuevoNodo := &Nodo{Estudiante: nestudiante, Siguiente: nil, Anterior: nil}
		l.Inicio = nuevoNodo
		l.Final = nuevoNodo
		l.Longitud++
	} else {
		nuevoNodo := &Nodo{Estudiante: nestudiante, Siguiente: nil, Anterior: nil}
		aux := l.Inicio
		repe := false
		for aux != nil {
			if aux.Estudiante.Carne > nestudiante.Carne {
				break
			} else {
				if aux.Estudiante.Carne == nestudiante.Carne {
					repe = true
					break
				}
			}
			aux = aux.Siguiente
		}
		if repe != true {
			if aux == nil {
				l.Final.Siguiente = nuevoNodo
				nuevoNodo.Anterior = l.Final
				l.Final = nuevoNodo
			} else if aux.Estudiante.Carne == l.Inicio.Estudiante.Carne {
				aux.Anterior = nuevoNodo
				nuevoNodo.Siguiente = aux
				l.Inicio = nuevoNodo
			} else {
				nuevoNodo.Anterior = aux.Anterior
				nuevoNodo.Siguiente = aux
				aux.Anterior.Siguiente = nuevoNodo
				aux.Anterior = nuevoNodo
			}
			l.Longitud++

		} else {
			fmt.Println("El numero de carnet se encuentra repetido.")
		}

	}
}

func (l *ListaDoble) MostrarLista() {
	aux := l.Inicio
	if aux != nil {
		fmt.Println("                                            ")
		fmt.Println("-       Estudiantes del sistema            -")
		for aux != nil {
			fmt.Printf("- %d _ %s %s \n", aux.Estudiante.Carne, aux.Estudiante.Nombre, aux.Estudiante.Apellido)
			aux = aux.Siguiente
		}
	} else {
		fmt.Println("No hay estudiantes en el sistema")
	}
}

func (l *ListaDoble) Graficar() {
	nombre_archivo := "./listadoble.dot"
	nombre_imagen := "listadoble.png"
	texto := "digraph listadoble{\n"
	texto += "rankdir=LR;\n"
	texto += "node[shape = box];\n"
	texto += "nodonull2[label=\"null\"];\n"
	texto += "nodonull1[label=\"null\"];\n"
	aux := l.Inicio
	for aux != nil {
		if aux == l.Inicio {
			texto += "x" + strconv.Itoa(aux.Estudiante.Carne) + "[dir=both label=\"Carne =" + strconv.Itoa(aux.Estudiante.Carne) + "\\nNombre = " + aux.Estudiante.Nombre + " " + aux.Estudiante.Apellido + "\"]"
			texto += "x" + strconv.Itoa(aux.Estudiante.Carne) + "-> x" + strconv.Itoa(aux.Siguiente.Estudiante.Carne) + "\n"
			texto += "x" + strconv.Itoa(aux.Estudiante.Carne) + "-> nodonull2" + "\n"
		} else if aux == l.Final {
			texto += "x" + strconv.Itoa(aux.Estudiante.Carne) + "[dir=both label=\"Carne =" + strconv.Itoa(aux.Estudiante.Carne) + "\\nNombre = " + aux.Estudiante.Nombre + " " + aux.Estudiante.Apellido + "\"]"
			texto += "x" + strconv.Itoa(aux.Estudiante.Carne) + "-> nodonull1" + "\n"
			texto += "x" + strconv.Itoa(aux.Estudiante.Carne) + "-> x" + strconv.Itoa(aux.Anterior.Estudiante.Carne) + "\n"
		} else {
			texto += "x" + strconv.Itoa(aux.Estudiante.Carne) + "[dir=both label=\"Carne =" + strconv.Itoa(aux.Estudiante.Carne) + "\\nNombre = " + aux.Estudiante.Nombre + " " + aux.Estudiante.Apellido + "\"]"
			texto += "x" + strconv.Itoa(aux.Estudiante.Carne) + "-> x" + strconv.Itoa(aux.Siguiente.Estudiante.Carne) + "\n"
			texto += "x" + strconv.Itoa(aux.Estudiante.Carne) + "-> x" + strconv.Itoa(aux.Anterior.Estudiante.Carne) + "\n"
		}
		aux = aux.Siguiente
	}
	texto += "}"
	crearArchivo(nombre_archivo)
	escribirArchivoDot(texto, nombre_archivo)
	ejecutar(nombre_imagen, nombre_archivo)
}

func (l *ListaDoble) GraficarF() {
	nombre_archivo := "./listadoble.dot"
	nombre_imagen := "listadoble.png"
	texto := "digraph listadoble{\n"
	texto += "node[shape = box fillcolor = \"white\" style = filled];\n"
	texto += "subgraph cluster_l{ \n"
	texto += "label = \"Lista de Estudiantes\" \n"
	texto += "edge[dir = \"both\" minlen = 2] \n"
	texto += "nodon1[width=1.2 label = \"null\" fillcolor=white] \n"
	texto += "nodon2[width=1.2 label = \"null\" fillcolor=white] \n"
	aux := l.Inicio
	for i := 0; i < l.Longitud; i++ {
		texto += "nodo" + strconv.Itoa(i) + "[width=1.2 label=\"" + strconv.Itoa(aux.Estudiante.Carne) + " " + aux.Estudiante.Nombre + " " + aux.Estudiante.Apellido + "\" fillcolor = \"white\" group = " + strconv.Itoa(i) + "]\n"
		aux = aux.Siguiente
	}
	for i := 0; i < l.Longitud-1; i++ {
		if i == 0 {
			texto += "nodon1" + " -> nodo" + strconv.Itoa(i) + "\n"
		}
		texto += "nodo" + strconv.Itoa(i) + " -> nodo" + strconv.Itoa(i+1) + "\n"
		if (i + 1) == l.Longitud-1 {
			texto += "nodo" + strconv.Itoa(i+1) + " -> nodon2" + "\n"
		}
	}
	texto += "{rank = same;nodon1;nodon2"
	for i := 0; i < l.Longitud; i++ {
		texto += ";nodo" + strconv.Itoa(i)
	}
	texto += "}\n"
	aux = l.Inicio
	for i := 0; i < l.Longitud; i++ {
		if !aux.Estudiante.Pilae.estaVacia() {
			texto += "pila" + strconv.Itoa(i) + aux.Estudiante.Pilae.Graficar()
			texto += "nodo" + strconv.Itoa(i) + " -> " + "pila" + strconv.Itoa(i) + "\n"
		}
		aux = aux.Siguiente
	}
	texto += "}\n"
	texto += "}"
	crearArchivo(nombre_archivo)
	escribirArchivoDot(texto, nombre_archivo)
	ejecutar(nombre_imagen, nombre_archivo)
}
