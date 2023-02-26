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
1 - pila.Listar()</li>
<li class="has-line-data" data-line-start="32" data-line-end="33">Pendientes</li>
<li class="has-line-data" data-line-start="33" data-line-end="34">Aceptar</li>
<li class="has-line-data" data-line-start="34" data-line-end="35">Estudiantes del sistema</li>
<li class="has-line-data" data-line-start="35" data-line-end="36">Registrar</li>
<li class="has-line-data" data-line-start="36" data-line-end="37">Carga masiva</li>
<li class="has-line-data" data-line-start="37" data-line-end="39">Escribir Json</li>
</ul>
<h2 class="code-line" data-line-start=39 data-line-end=40 ><a id="Plugins_39"></a>Plugins</h2>
<p class="has-line-data" data-line-start="41" data-line-end="43">Dillinger is currently extended with the following plugins.<br>
Instructions on how to use them in your own application are linked below.</p>
<table class="table table-striped table-bordered">
<thead>
<tr>
<th>Plugin</th>
<th>README</th>
</tr>
</thead>
<tbody>
<tr>
<td>Dropbox</td>
<td><a href="https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md">plugins/dropbox/README.md</a></td>
</tr>
<tr>
<td>GitHub</td>
<td><a href="https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md">plugins/github/README.md</a></td>
</tr>
<tr>
<td>Google Drive</td>
<td><a href="https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md">plugins/googledrive/README.md</a></td>
</tr>
<tr>
<td>OneDrive</td>
<td><a href="https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md">plugins/onedrive/README.md</a></td>
</tr>
<tr>
<td>Medium</td>
<td><a href="https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md">plugins/medium/README.md</a></td>
</tr>
<tr>
<td>Google Analytics</td>
<td><a href="https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md">plugins/googleanalytics/README.md</a></td>
</tr>
</tbody>
</table>
<h2 class="code-line" data-line-start=53 data-line-end=54 ><a id="Development_53"></a>Development</h2>
<p class="has-line-data" data-line-start="55" data-line-end="56">Want to contribute? Great!</p>
<p class="has-line-data" data-line-start="57" data-line-end="59">Dillinger uses Gulp + Webpack for fast developing.<br>
Make a change in your file and instantaneously see your updates!</p>
<p class="has-line-data" data-line-start="60" data-line-end="61">Open your favorite Terminal and run these commands.</p>
<p class="has-line-data" data-line-start="62" data-line-end="63">First Tab:</p>
<pre><code class="has-line-data" data-line-start="65" data-line-end="67" class="language-sh">node app
</code></pre>
<p class="has-line-data" data-line-start="68" data-line-end="69">Second Tab:</p>
<pre><code class="has-line-data" data-line-start="71" data-line-end="73" class="language-sh">gulp watch
</code></pre>
<p class="has-line-data" data-line-start="74" data-line-end="75">(optional) Third:</p>
<pre><code class="has-line-data" data-line-start="77" data-line-end="79" class="language-sh">karma <span class="hljs-built_in">test</span>
</code></pre>
<h4 class="code-line" data-line-start=80 data-line-end=81 ><a id="Building_for_source_80"></a>Building for source</h4>
<p class="has-line-data" data-line-start="82" data-line-end="83">For production release:</p>
<pre><code class="has-line-data" data-line-start="85" data-line-end="87" class="language-sh">gulp build --prod
</code></pre>
<p class="has-line-data" data-line-start="88" data-line-end="89">Generating pre-built zip archives for distribution:</p>
<pre><code class="has-line-data" data-line-start="91" data-line-end="93" class="language-sh">gulp build dist --prod
</code></pre>
<h2 class="code-line" data-line-start=94 data-line-end=95 ><a id="Docker_94"></a>Docker</h2>
<p class="has-line-data" data-line-start="96" data-line-end="97">Dillinger is very easy to install and deploy in a Docker container.</p>
<p class="has-line-data" data-line-start="98" data-line-end="101">By default, the Docker will expose port 8080, so change this within the<br>
Dockerfile if necessary. When ready, simply use the Dockerfile to<br>
build the image.</p>
<pre><code class="has-line-data" data-line-start="103" data-line-end="106" class="language-sh"><span class="hljs-built_in">cd</span> dillinger
docker build -t &lt;youruser&gt;/dillinger:<span class="hljs-variable">${package.json.version}</span> .
</code></pre>
<p class="has-line-data" data-line-start="107" data-line-end="110">This will create the dillinger image and pull in the necessary dependencies.<br>
Be sure to swap out <code>${package.json.version}</code> with the actual<br>
version of Dillinger.</p>
<p class="has-line-data" data-line-start="111" data-line-end="114">Once done, run the Docker image and map the port to whatever you wish on<br>
your host. In this example, we simply map port 8000 of the host to<br>
port 8080 of the Docker (or whatever port was exposed in the Dockerfile):</p>
<pre><code class="has-line-data" data-line-start="116" data-line-end="118" class="language-sh">docker run <span class="hljs-operator">-d</span> -p <span class="hljs-number">8000</span>:<span class="hljs-number">8080</span> --restart=always --cap-add=SYS_ADMIN --name=dillinger &lt;youruser&gt;/dillinger:<span class="hljs-variable">${package.json.version}</span>
</code></pre>
<blockquote>
<p class="has-line-data" data-line-start="119" data-line-end="120">Note: <code>--capt-add=SYS-ADMIN</code> is required for PDF rendering.</p>
</blockquote>
<p class="has-line-data" data-line-start="121" data-line-end="123">Verify the deployment by navigating to your server address in<br>
your preferred browser.</p>
<pre><code class="has-line-data" data-line-start="125" data-line-end="127" class="language-sh"><span class="hljs-number">127.0</span>.<span class="hljs-number">0.1</span>:<span class="hljs-number">8000</span>
</code></pre>
<h2 class="code-line" data-line-start=128 data-line-end=129 ><a id="License_128"></a>License</h2>
<p class="has-line-data" data-line-start="130" data-line-end="131">MIT</p>
<p class="has-line-data" data-line-start="132" data-line-end="133"><strong>Free Software, Hell Yeah!</strong></p>