package main

import (
	"ProyectoF1/estructuras"
	"fmt"
	"strconv"
)

// MAIN
var cola_estudiante = &estructuras.Cola{}
var listad_aceptados = &estructuras.ListaDoble{}

func main() {
	cola_estudiante = &estructuras.Cola{Primero: nil, Longitud: 0}
	listad_aceptados = &estructuras.ListaDoble{Inicio: nil, Final: nil, Longitud: 0}
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
		opcion := 0
		salir := false
		for !salir {
			fmt.Println("--------------ADMIN GODRIVE------------")
			fmt.Println("-    1. Ver Estudiantes Pendientes    -")
			fmt.Println("-    2. Ver Estudiantes del Sistema   -")
			fmt.Println("-    3. Registrar Nuevo Estudiante    -")
			fmt.Println("-    4. Carga Masiva de Estudiantes   -")
			fmt.Println("-    5. Cerrar Sesion                 -")
			fmt.Println("---------------------------------------")
			fmt.Print("Elige una opcion:")
			fmt.Scanln(&opcion)
			switch opcion {
			case 1:
				pendientes()
			case 2:
				esistema()
			case 3:
				registrar()
			case 4:
				cargam()
			case 5:
				salir = true
			}
		}
	} else {
		carne, err := strconv.Atoi(usuario)
		if err != nil {
			fmt.Println("Error during conversion")
			return
		}
		aux := listad_aceptados.Inicio
		sesion := false
		for aux != nil {
			if carne == aux.Estudiante.Carne {
				if contra == aux.Estudiante.Contra {
					sesion = true
					break
				}
			}
		}
		if sesion {
			opcion := 0
			salir := false
			for !salir {
				fmt.Println("--------------" + usuario + " GODRIVE------------")
				fmt.Println("-    1. Ver Datos                     -")
				fmt.Println("-    2. Bitacora                      -")
				fmt.Println("-    3. Cerrar Sesion                 -")
				fmt.Println("---------------------------------------")
				fmt.Print("Elige una opcion:")
				fmt.Scanln(&opcion)
				switch opcion {
				case 1:
					data()
				case 2:
					bitacora()
				case 3:
					salir = true
				}
			}
		} else {
			fmt.Println("Datos incorrectos")
		}
	}

}
func data() {

}
func bitacora() {

}
func pendientes() {
	if cola_estudiante.Primero != nil {
		opcion := 0
		salir := false
		for !salir {
			fmt.Println("--------------ADMIN GODRIVE------------")
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
				cola_estudiante.Descolar()
			case 2:
				cola_estudiante.Descolar()
			case 3:
				salir = true
			}
		}
	} else {
		fmt.Println("No hay estudiantes en la cola")
	}
}
func aceptar(nestudiante *estructuras.Estudiante) {
	listad_aceptados.AgregarEstudiante(nestudiante)
	fmt.Println("Se agrego " + nestudiante.Nombre + " " + nestudiante.Apellido + " al sistema")
}
func esistema() {
	listad_aceptados.MostrarLista()
}
func registrar() {
	nombre := ""
	apellido := ""
	carne := 0
	contra := ""
	fmt.Println("--------------ADMIN GODRIVE------------")
	fmt.Println("----------------REGISTRO-----=---------")
	fmt.Print("Ingresa tu nombre: ")
	fmt.Scanln(&nombre)
	fmt.Print("Ingresa tu apellido: ")
	fmt.Scanln(&apellido)
	fmt.Print("Ingresa tu carne: ")
	fmt.Scanln("%d", &carne)
	fmt.Print("Ingresa tu contraseña: ")
	fmt.Scanln(&contra)

	nuevoE := &estructuras.Estudiante{Carne: carne, Nombre: nombre, Apellido: apellido, Contra: contra}

	cola_estudiante.Encolar(nuevoE)
}
func cargam() {

}
