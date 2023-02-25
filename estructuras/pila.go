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

func (p *Pila) Listar() {
	aux := p.Primero
	for aux != nil {
		fmt.Println(aux.Log)
		aux = aux.Siguiente
	}
}

func (p *Pila) GraficarAdmin() {
	nombre_archivo := "./pilaadmin.dot"
	nombre_imagen := "pilaadmin.jpg"
	texto := "digraph pila{\n"
	texto += "rankdir=LR;\n"
	texto += "node[shape = record]"
	aux := p.Primero
	texto += "nodo0 [label=\"PILA ADMIN"
	for i := 0; i < p.Longitud; i++ {
		texto = texto + "|(" + aux.Log + ")"
		aux = aux.Siguiente
	}
	texto += "\"]; \n}"
	crearArchivo(nombre_archivo)
	escribirArchivoDot(texto, nombre_archivo)
	ejecutar(nombre_imagen, nombre_archivo)
}
func (p *Pila) Graficar() string {
	aux := p.Primero
	texto := "[fontsize = 8 shape = record fillcolor=white label = \"{pila"
	for i := 0; i < p.Longitud; i++ {
		texto += "|(" + aux.Log + ")"
		aux = aux.Siguiente
	}
	texto += "}\"]\n"
	return texto
}
