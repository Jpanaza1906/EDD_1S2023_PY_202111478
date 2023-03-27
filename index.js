class Estudiante{
    constructor(nombre, carnet, password){
        this.nombre = nombre;
        this.carnet = carnet;
        this.password = password;
    }
}
const estudiantes = []
fetch("ProyectoF1/test.json")
    .then(response => response.json())
    .then(data => {
        let alumno = data.alumnos;
        for (let i = 0; i < data.alumnos.length; i++){
            var student = new Estudiante(alumno[i].nombre,alumno[i].carnet,alumno[i].password);
            estudiantes.push(student);
            console.log(alumno[i].nombre);
        }
    })
function login(){
    var user = document.getElementById("myinput").value;
    var password = document.getElementById("myinput2").value;
    if(user === "admin" && password === "admin"){
        alert("Es el admin");
        window.location.replace("EDD_Proyecto1_Fase2/main.html");
    }
}