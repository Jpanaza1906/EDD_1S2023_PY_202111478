package estructuras

import "fmt"

type Pila struct {
	Primero  *Nodob
	Longitud int
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
		nuevoNodo := &Nodob{Log: log, Siguiente: nil}
		p.Primero = nuevoNodo
		p.Longitud++
	} else {
		nuevoNodo := &Nodob{Log: log, Siguiente: p.Primero}
		p.Primero = nuevoNodo
		p.Longitud++
	}
}

//
//func (p *Pila) Pop() {
//	if p.estaVacia() {
//		fmt.Println("La pila no tiene elementos")
//	} else {
//		p.Primero = p.Primero.Siguiente
//		p.Longitud--
//	}
//}

func (p *Pila) Listar() {
	aux := p.Primero
	for aux != nil {
		fmt.Println(aux.Log)
		aux = aux.Siguiente
	}
}
