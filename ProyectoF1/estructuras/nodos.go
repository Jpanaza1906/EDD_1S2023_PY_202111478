package estructuras

type Nodo struct {
	Estudiante *Estudiante
	Anterior   *Nodo
	Siguiente  *Nodo
}

type Nodos struct {
	Estudiante *Estudiante
	Siguiente  *Nodos
}

type Nodob struct {
	Log       string
	Siguiente *Nodob
}

type Nodopilas struct {
	Estudiante *Estudiante
	Npila      *Pila
	Siguiente  *Nodopilas
}
