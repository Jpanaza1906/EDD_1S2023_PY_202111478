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
		nuevoNodo := &Nodopilas{Npila: pila, siguiente: nil}
		l.Inicio = nuevoNodo
		l.Longitud++
	} else {
		nuevoNodo := &Nodopilas{Npila: pila, siguiente: nil}
		aux := l.Inicio
		for aux.siguiente != nil {
			aux = aux.siguiente
		}
		aux.siguiente = nuevoNodo
		l.Longitud++
	}
}
