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
