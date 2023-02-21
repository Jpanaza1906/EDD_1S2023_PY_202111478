package estructuras

type Nodo struct {
	Estudiante *Estudiante
	anterior   *Nodo
	siguiente  *Nodo
}

type Nodos struct {
	Estudiante *Estudiante
	siguiente  *Nodos
}

type Nodob struct {
	Log       string
	siguiente *Nodob
}

type Nodopilas struct {
	Npila     *Pila
	siguiente *Nodopilas
}
