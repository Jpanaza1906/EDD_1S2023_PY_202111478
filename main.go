package main

import (
	"ProyectoF1/estructuras"
	"encoding/csv"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"strconv"
	"strings"
	"time"

	"golang.org/x/text/encoding/charmap"
)

// MAIN
var cola_estudiante = &estructuras.Cola{}
var listad_aceptados = &estructuras.ListaDoble{}
var pila_admin = &estructuras.Pila{}

func main() {
	cola_estudiante = &estructuras.Cola{Primero: nil, Longitud: 0}
	listad_aceptados = &estructuras.ListaDoble{Inicio: nil, Final: nil, Longitud: 0}
	pila_admin = &estructuras.Pila{Primero: nil, Longitud: 0}
	opcion := 0
	salir := false

	for !salir {
		fmt.Println("-----------GO DRIVE------------")
		fmt.Println("-     1. Iniciar Sesion       -")
		fmt.Println("-    2. Salir del Sistema     -")
		fmt.Println("-------------------------------")
		fmt.Print("Elige una opcion:")
		fmt.Scanln(&opcion)
		switch opcion {
		case 1:
			iniciar_sesion()
		case 2:
			salir = true
		}
	}
}

func iniciar_sesion() {
	usuario := ""
	contra := ""

	fmt.Print("Ingresa tu usuario: ")
	fmt.Scanln(&usuario)
	fmt.Print("Ingresa tu contraseña: ")
	fmt.Scanln(&contra)

	if usuario == "admin" && contra == "admin" {
		t := time.Now()
		t2 := t.Format("2006-01-02 15:04:05")
		pila_admin.Push("- Inicio de sesion: " + t2)
		opcion := 0
		salir := false
		fmt.Println(" SESION INICIADA DEL ADMIN")
		for !salir {
			fmt.Println("\n--------------ADMIN GODRIVE------------")
			fmt.Println("-    1. Ver Estudiantes Pendientes    -")
			fmt.Println("-    2. Ver Estudiantes del Sistema   -")
			fmt.Println("-    3. Registrar Nuevo Estudiante    -")
			fmt.Println("-    4. Ver bitacora admin            -")
			fmt.Println("-    5. Carga Masiva de Estudiantes   -")
			fmt.Println("-    6. Cerrar Sesion                 -")
			fmt.Println("---------------------------------------")
			fmt.Print("Elige una opcion:")
			fmt.Scanln(&opcion)
			switch opcion {
			case 1:
				t := time.Now()
				t2 := t.Format("2006-01-02 15:04:05")
				pila_admin.Push("- Ver estudiantes pendientes: " + t2)
				pendientes()
			case 2:
				t := time.Now()
				t2 := t.Format("2006-01-02 15:04:05")
				pila_admin.Push("- Ver estudiantes del sistema: " + t2)
				esistema()
			case 3:
				t := time.Now()
				t2 := t.Format("2006-01-02 15:04:05")
				pila_admin.Push("- Registrar nuevo estudiante: " + t2)
				registrar()
			case 4:
				t := time.Now()
				t2 := t.Format("2006-01-02 15:04:05")
				pila_admin.Push("- Ver bitacora admin: " + t2)
				bitacora(pila_admin)
			case 5:
				t := time.Now()
				t2 := t.Format("2006-01-02 15:04:05")
				pila_admin.Push("- Carga masiva: " + t2)
				cargam()
			case 6:
				t := time.Now()
				t2 := t.Format("2006-01-02 15:04:05")
				pila_admin.Push("- Cerrar sesion : " + t2)
				salir = true
			}
		}
	} else {
		carne, err := strconv.Atoi(usuario)
		if err != nil {
			fmt.Println("Carne no valido")
			return
		} else {
			aux := listad_aceptados.Inicio
			sesion := false
			for aux != nil {
				if carne == aux.Estudiante.Carne {
					if contra == aux.Estudiante.Contra {
						sesion = true
						break
					}
				}
				aux = aux.Siguiente
			}
			if sesion {
				fmt.Println(" SESION INCIADA " + usuario)
				t := time.Now()
				t2 := t.Format("2006-01-02 15:04:05")
				aux.Estudiante.Pilae.Push("- Inicio de sesion: " + t2)
				opcion := 0
				salir := false
				for !salir {
					fmt.Println("\n-------" + usuario + " GODRIVE---------")
					fmt.Println("-    1. Ver Datos                     -")
					fmt.Println("-    2. Bitacora                      -")
					fmt.Println("-    3. Cerrar Sesion                 -")
					fmt.Println("---------------------------------------")
					fmt.Print("Elige una opcion:")
					fmt.Scanln(&opcion)
					switch opcion {
					case 1:
						t := time.Now()
						t2 := t.Format("2006-01-02 15:04:05")
						aux.Estudiante.Pilae.Push("- Ver datos: " + t2)
						fmt.Println("- Carne: " + usuario + "\n- Nombre: " + aux.Estudiante.Nombre + "\n-Apellido: " + aux.Estudiante.Apellido + "\n-Contraseña: " + aux.Estudiante.Contra)
					case 2:
						t := time.Now()
						t2 := t.Format("2006-01-02 15:04:05")
						aux.Estudiante.Pilae.Push("- Ver bitacora: " + t2)
						bitacora(aux.Estudiante.Pilae)
					case 3:
						t := time.Now()
						t2 := t.Format("2006-01-02 15:04:05")
						aux.Estudiante.Pilae.Push("- Cerrar sesion: " + t2)
						salir = true
					}
				}
			} else {
				fmt.Println("Datos incorrectos")
			}
		}
	}

}
func bitacora(pila *estructuras.Pila) {
	pila.Listar()
}
func pendientes() {
	if cola_estudiante.Longitud > 0 {
		opcion := 0
		salir := false
		for !salir && cola_estudiante.Longitud != 0 {
			fmt.Println("\n--------------ADMIN GODRIVE------------")
			fmt.Println("---------------Pendientes--------------")
			cola_estudiante.MostrarPrimero()
			fmt.Println("-    1. Aceptar al Estudiante         -")
			fmt.Println("-    2. Rechazar al Estudiante        -")
			fmt.Println("-    3. Volver al menu                -")
			fmt.Println("---------------------------------------")
			fmt.Print("Elige una opcion:")
			fmt.Scanln(&opcion)
			switch opcion {
			case 1:
				aceptar(cola_estudiante.Primero.Estudiante)
				writejson()
				cola_estudiante.Descolar()

			case 2:
				fmt.Println("\nSe rechazo " + cola_estudiante.Primero.Estudiante.Nombre + " " + cola_estudiante.Primero.Estudiante.Apellido + " del sistema.\n")
				cola_estudiante.Descolar()

			case 3:
				salir = true
			}
		}
	} else {
		fmt.Println("\n No hay estudiantes pendientes")
	}
}
func aceptar(nestudiante *estructuras.Estudiante) {
	listad_aceptados.AgregarEstudiante(nestudiante)
	fmt.Println("\nSe agrego " + nestudiante.Nombre + " " + nestudiante.Apellido + " al sistema")
}
func esistema() {
	listad_aceptados.MostrarLista()
}
func registrar() {
	nombre := ""
	apellido := ""
	carne := 0
	contra := ""
	fmt.Println("\n--------------ADMIN GODRIVE------------")
	fmt.Println("----------------REGISTRO-----=---------")
	fmt.Print("Ingresa tu nombre: ")
	fmt.Scanln(&nombre)
	fmt.Print("Ingresa tu apellido: ")
	fmt.Scanln(&apellido)
	fmt.Print("Ingresa tu carne: ")
	fmt.Scanln(&carne)
	fmt.Print("Ingresa tu contraseña: ")
	fmt.Scanln(&contra)
	npila := &estructuras.Pila{Primero: nil, Longitud: 0}
	nuevoE := &estructuras.Estudiante{Carne: carne, Nombre: nombre, Apellido: apellido, Contra: contra, Pilae: npila}

	cola_estudiante.Encolar(nuevoE)
}
func cargam() {
	file, err := os.Open("Estudiante.csv")
	if err != nil {
		panic(err)
	}
	defer file.Close()
	reader := csv.NewReader(charmap.ISO8859_15.NewDecoder().Reader(file))
	cont := 0
	for {
		record, e := reader.Read()
		if e != nil {
			break
		}
		if cont > 0 {
			carne, err := strconv.Atoi(record[0])
			if err != nil {
				fmt.Println("Error con el numero de carné, se pasara al siguiente")
			} else {
				nombreyape := strings.SplitAfter(record[1], " ")
				contra := record[2]
				npila := &estructuras.Pila{Primero: nil, Longitud: 0}
				newEstudiante := &estructuras.Estudiante{Carne: carne, Nombre: nombreyape[0], Apellido: nombreyape[1], Contra: contra, Pilae: npila}
				cola_estudiante.Encolar(newEstudiante)
			}
		}
		cont++
	}
}

func writejson() {
	arr := make([]estructuras.EstudianteJ, 0, listad_aceptados.Longitud)
	aux := listad_aceptados.Inicio

	for aux != nil {
		nestudiantej := &estructuras.EstudianteJ{Nombre: aux.Estudiante.Nombre + " " + aux.Estudiante.Apellido, Carne: aux.Estudiante.Carne, Contra: aux.Estudiante.Contra, Raiz: "/"}
		arr = append(arr, *nestudiantej)
		aux = aux.Siguiente
	}
	arreglo := &estructuras.Alumnos{AlumnosAcep: arr}

	file, _ := json.MarshalIndent(arreglo, "", " ")
	_ = ioutil.WriteFile("test.json", file, 0644)
}
