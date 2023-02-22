package estructuras

type Lista struct {
	Inicio   *Nodopilas
	Longitud int
}

func (l *Lista) estaVacia() bool {
	if l.Longitud == 0 {
		return true
	} else {
		return false
	}
}

func (l *Lista) Agregarpila(pila *Pila) {
	if l.estaVacia() {
		nuevoNodo := &Nodopilas{Npila: pila, Siguiente: nil}
		l.Inicio = nuevoNodo
		l.Longitud++
	} else {
		nuevoNodo := &Nodopilas{Npila: pila, Siguiente: nil}
		aux := l.Inicio
		for aux.Siguiente != nil {
			aux = aux.Siguiente
		}
		aux.Siguiente = nuevoNodo
		l.Longitud++
	}
}
