package estructuras

type Estudiante struct {
	Nombre   string `json:"nombre"`
	Carne    int    `json:"carnet"`
	Apellido string
	Contra   string `json:"password"`
	Pilae    *Pila  `json:"-"`
}
