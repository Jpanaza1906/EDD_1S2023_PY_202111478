package estructuras

import "fmt"

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
		nuevoNodo := &Nodo{Estudiante: nestudiante, siguiente: nil, anterior: nil}
		l.Inicio = nuevoNodo
		l.Final = nuevoNodo
		l.Longitud++
	} else {
		nuevoNodo := &Nodo{Estudiante: nestudiante, siguiente: nil, anterior: nil}
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
			aux = aux.siguiente
		}
		if repe != true {
			if aux.Estudiante.Carne == l.Inicio.Estudiante.Carne {
				aux.anterior = nuevoNodo
				nuevoNodo.siguiente = aux
				l.Inicio = nuevoNodo
			} else {
				if aux == nil {
					aux.anterior.siguiente = nuevoNodo
					nuevoNodo.anterior = aux.anterior
					l.Final = nuevoNodo
				} else {
					aux.anterior.siguiente = nuevoNodo
					aux.siguiente.anterior = nuevoNodo
					nuevoNodo.anterior = aux.anterior
					nuevoNodo.siguiente = aux.siguiente
				}
			}

		} else {
			fmt.Println("El numero de carnet se encuentra repetido.")
		}

	}
}

func (l *ListaDoble) MostrarLista() {
	aux := l.Inicio
	for aux != nil {
		fmt.Printf("- %d _ %s %s ", aux.Estudiante.Carne, aux.Estudiante.Nombre, aux.Estudiante.Apellido)
		aux = aux.siguiente
	}
}
