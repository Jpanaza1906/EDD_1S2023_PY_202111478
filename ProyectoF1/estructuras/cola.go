package estructuras

import (
	"fmt"
	"strconv"
)

type Cola struct {
	Primero  *Nodos
	Longitud int
}

func (c *Cola) estaVacia() bool {
	if c.Longitud == 0 {
		return true
	} else {
		return false
	}
}

func (c *Cola) Encolar(nestudiante *Estudiante) {
	if c.estaVacia() {
		nuevoNodo := &Nodos{Estudiante: nestudiante, Siguiente: nil}
		c.Primero = nuevoNodo
		c.Longitud++
	} else {
		nuevoNodo := &Nodos{Estudiante: nestudiante, Siguiente: nil}
		aux := c.Primero
		for aux.Siguiente != nil {
			aux = aux.Siguiente
		}
		aux.Siguiente = nuevoNodo
		c.Longitud++
	}
}

func (c *Cola) Descolar() {
	if c.estaVacia() {
		fmt.Println("La cola no tiene estudiantes.")
	} else {
		c.Primero = c.Primero.Siguiente
		c.Longitud--
	}
}

func (c *Cola) MostrarPrimero() {
	if c.Primero != nil {
		carne := strconv.Itoa(c.Primero.Estudiante.Carne)
		fmt.Println("- " + carne + " _ " + c.Primero.Estudiante.Nombre + " " + c.Primero.Estudiante.Apellido)
	} else {
		fmt.Println("- no hay estudiantes pendientes -")
	}
}

func (c *Cola) Graficar() {
	nombre_archivo := "./colaespera.dot"
	nombre_imagen := "colaespera.png"
	texto := "digraph cola{\n"
	texto += "rankdir=LR;\n"
	texto += "node[shape = record];\n"
	texto += "nodonull2[label=\"null\"];\n"
	aux := c.Primero
	contador := 0
	for i := 0; i < c.Longitud; i++ {
		carnes := strconv.Itoa(aux.Estudiante.Carne)
		texto = texto + "nodo" + strconv.Itoa(i) + "[label=\"{" + carnes + "\\n" + aux.Estudiante.Nombre + " " + aux.Estudiante.Apellido + "|}\"];\n"
		aux = aux.Siguiente
	}
	for i := 0; i < c.Longitud-1; i++ {
		c := i + 1
		texto += "nodo" + strconv.Itoa(i) + "->nodo" + strconv.Itoa(c) + ";\n"
		contador = c
	}
	texto += "nodo" + strconv.Itoa(contador) + "->nodonull2;\n"
	texto += "}"
	crearArchivo(nombre_archivo)
	escribirArchivoDot(texto, nombre_archivo)
	ejecutar(nombre_imagen, nombre_archivo)
}
