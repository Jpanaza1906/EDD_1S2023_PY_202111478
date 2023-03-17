package estructuras

type EstudianteJ struct {
	Nombre string `json:"nombre"`
	Carne  int    `json:"carnet"`
	Contra string `json:"password"`
	Raiz   string `json:"Carpeta_raiz"`
}

type Alumnos struct {
	AlumnosAcep []EstudianteJ `json:"alumnos"`
}
