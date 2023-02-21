package estructuras

import "fmt"

type Pila struct {
	Primero    *Nodob
	Estudiante *Estudiante
	Longitud   int
}

func (p *Pila) estaVacia() bool {
	if p.Longitud == 0 {
		return true
	} else {
		return false
	}
}

func (p *Pila) Push(log string) {
	if p.estaVacia() {
		nuevoNodo := &Nodob{Log: log, siguiente: nil}
		p.Primero = nuevoNodo
		p.Longitud++
	} else {
		nuevoNodo := &Nodob{Log: log, siguiente: p.Primero}
		p.Primero = nuevoNodo
		p.Longitud++
	}
}

func (p *Pila) Pop() {
	if p.estaVacia() {
		fmt.Println("La pila no tiene elementos")
	} else {
		p.Primero = p.Primero.siguiente
		p.Longitud--
	}
}

func (p *Pila) Peek() {
	if p.estaVacia() {
		fmt.Println("La pila no tiene elementos")
	} else {
		fmt.Println(p.Primero.Log)
	}
}
