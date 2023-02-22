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
