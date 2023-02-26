<h1 class="code-line" data-line-start=0 data-line-end=1 ><a id="ESTRUCTURA_DE_DATOS_0"></a>ESTRUCTURA DE DATOS</h1>
<h2 class="code-line" data-line-start=1 data-line-end=2 ><a id="_Manual_Tcnico__1"></a><em>Manual Técnico</em></h2>
<h2 class="code-line" data-line-start=2 data-line-end=3 ><a id="_Jos_David_Panaza_Batres__2"></a><em>José David Panaza Batres</em></h2>
<p class="has-line-data" data-line-start="5" data-line-end="6">Este programa fue desarrollado enteramente en GO aplicando el paradigma de programación orientada a objetos (POO). Esto se debe a que se tenía en mente realizar una aplicación de escritorio, que fuese intuitiva y fácil de usar a cualquier usuario. Todo esto con el fin de crear las bases de un sistema interconectado entre estudiantes y administrador.</p>
<h2 class="code-line" data-line-start=7 data-line-end=8 ><a id="Patrn_de_diseo_7"></a>Patrón de diseño</h2>
<p class="has-line-data" data-line-start="9" data-line-end="10">Debido a la simplicidad de las funciones, se decidió utilizar un patrón de diseño orientado a lo creacional. Especificando de mejor manera, se utilizó un patrón Singleton. Este se refiere a un diseño que restringe la creación de instancias de una clase a un único objeto. Debido a que se crearon varias clases para manejar los nodos, pilas, colas y listas del programa.</p>
<h2 class="code-line" data-line-start=14 data-line-end=15 ><a id="Clases_14"></a>Clases</h2>
<p class="has-line-data" data-line-start="16" data-line-end="17">Estructuras</p>
<ul>
<li class="has-line-data" data-line-start="17" data-line-end="18">Cola</li>
<li class="has-line-data" data-line-start="18" data-line-end="19">Estudiante</li>
<li class="has-line-data" data-line-start="19" data-line-end="20">Lista</li>
<li class="has-line-data" data-line-start="20" data-line-end="21">Lista Doble</li>
<li class="has-line-data" data-line-start="21" data-line-end="22">Nodos</li>
<li class="has-line-data" data-line-start="22" data-line-end="23">Pila</li>
<li class="has-line-data" data-line-start="23" data-line-end="24">Reportes de Gráfica</li>
</ul>
<h2 class="code-line" data-line-start=26 data-line-end=27 ><a id="Metodos_principales_26"></a>Metodos principales</h2>
<p class="has-line-data" data-line-start="27" data-line-end="28">Main</p>
<ul>
<li class="has-line-data" data-line-start="28" data-line-end="30">Iniciar_Sesion:<br>
1 - Ver Estudiantes Pendientes: pendientes()</li>
<li class="has-line-data" data-line-start="30" data-line-end="32">Bitacora:<br>
1 - pila.Listar(): Se lista la pila con su método</li>
<li class="has-line-data" data-line-start="32" data-line-end="33">Pendientes: Aqui se muestra el estudiante de la Cola que le toca y se acepta o rechaza según el administrador. Cuando se acepta, se agrega a la Lista Doble y descolar de la cola de estudiantes pendientes. Cuando se rechaza solo se descola.</li>
<li class="has-line-data" data-line-start="33" data-line-end="34">Aceptar: Se agrega el estudiante a la lista doble</li>
<li class="has-line-data" data-line-start="34" data-line-end="35">Estudiantes del sistema: Se recorre la lista doble y se imprime cada estudiante.</li>
<li class="has-line-data" data-line-start="35" data-line-end="36">Registrar: Se preguntan los datos, se crea el objeto estudiante y se encola a la cola de estudiantes pendientes.</li>
<li class="has-line-data" data-line-start="36" data-line-end="37">Carga masiva: Se lee el archivo CSV, se obtienen los datos y se van creando los estudiantes y agregandolos a la lista de pendientes hasta que termine la lectura del archivo.</li>
<li class="has-line-data" data-line-start="37" data-line-end="39">Escribir Json: Se crea un archivo json donde se guarda la información de cada estudiante en el sistema de la lista doble.</li>
</ul>
<h2 class="code-line" data-line-start=39 data-line-end=40 ><a id="Interfaces_39"></a>Interfaces</h2>
<ul>
<li class="has-line-data" data-line-start="40" data-line-end="41">Menú de Inicio de Sesión</li>
<li class="has-line-data" data-line-start="41" data-line-end="48">Menu del administrador<br>
1- Ver estudiantes pendientes<br>
2- Ver estudiantes del sistema<br>
3- Registrar nuevo estudiante<br>
4- Ver bitacora admin<br>
5-Carga Masiva de Estudiantes<br>
6- Cerrar Sesion</li>
<li class="has-line-data" data-line-start="48" data-line-end="52">Menu de usuario<br>
1-Ver datos<br>
2-Bitacora<br>
3-Cerrar sesion</li>
<li class="has-line-data" data-line-start="52" data-line-end="56">Menu ADMIN estudiantes pendientes<br>
1-Aceptar al Estudiante<br>
2-Rechazar al Estudiante<br>
3- Volver al menu</li>
<li class="has-line-data" data-line-start="56" data-line-end="57">Registro estudiantes ADMIN</li>
</ul>
<h2 class="code-line" data-line-start=59 data-line-end=60 ><a id="Planificacion_59"></a>Planificacion</h2>
<table class="table table-striped table-bordered">
<thead>
<tr>
<th>Actividad</th>
<th>Tiempo</th>
</tr>
</thead>
<tbody>
<tr>
<td>Hacer estructuras</td>
<td>6 horas</td>
</tr>
<tr>
<td>Main</td>
<td>2 dias</td>
</tr>
</tbody>
</table>