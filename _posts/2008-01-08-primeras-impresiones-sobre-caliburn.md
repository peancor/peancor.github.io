---
layout: page
title: Primeras impresiones sobre Caliburn
---

<p>Llevo un tiempo buscando una alternativa a <a href="http://msdn2.microsoft.com/en-us/library/aa480450.aspx" target="_blank">CompositeUI</a>, un buen <a href="http://es.wikipedia.org/wiki/Framework" target="_blank">Framework</a> que me ha facilitado escribir unas cuantas aplicaciones.</p> <p>En .NET Framework 3.0, Microsoft introdujo un&nbsp; nuevo sistema de representación (WPF), junto con un nuevo modelo para la construcción de aplicaciones en donde la parte visual de los componentes de la interfaz de usuario típicamente se define utilizando un lenguaje de marcado denominado <a href="http://es.wikipedia.org/wiki/XAML" target="_blank">xaml</a>, al estilo de html. Mediante dicho lenguaje, además, se pueden utilizar las avanzadas capacidades de enlazado a datos (Data Binding) que proporciona el framework.</p> <p>Sin embargo, CompositeUI es previo a la introducción de las WPF y aunque se han realizado esfuerzos por <a href="http://www.codeplex.com/wpfcab" target="_blank">compaginar</a> ambos entornos, es difícil realizar una buena utilización de lo mejor de cada entorno a la hora de construir una aplicación.</p> <p>El <a href="http://devlicio.us/blogs/rob_eisenberg/archive/2008/01/07/introducing-caliburn-an-mvc-mvp-wpf-framework.aspx" target="_blank">post de Rob Eisenberg</a> sobre Caliburn (<a href="http://es.wikipedia.org/wiki/Excalibur" target="_blank">Excalibur</a>) despertó mi interés, así que he estado estudiando un poco su código y la sensación que me ha producido es realmente buena.</p> <p></p> <p>El funcionamiento es sencillo, tal como se ve en la aplicación de ejemplo que viene con el código fuente.&nbsp; El primer paso a realizar es inicializar el sistema, por ejemplo, en el constructor de la aplicación.</p><pre class="code"><span style="color: blue">public </span>App()
{
    <span style="color: #2b91af">ShellApplication</span>.Start(
        <span style="color: blue">new </span><span style="color: #2b91af">CustomConfiguration</span>()
        );
}</pre>
<p><a href="http://11011.net/software/vspaste"></a></p>
<p>El objeto suministrado construye una nueva instancia del contenedor a utilizar, en este caso, <em>WindsorContainer</em>, y configura el sistema registrando diversos servicios o componentes.</p>
<p>Entre dichos componentes se encuentra la clase <em>ApplicationPresenter</em> que define el presentador que utilizará la ventana principal de la aplicación (<em>MainWindow</em>) que queda registrado de la siguiente manera.</p><pre class="code">container.AddComponent(<span style="color: #a31515">"ApplicationPresenter"</span>,
    <span style="color: blue">typeof</span>(<span style="color: #2b91af">ApplicationPresenter</span>), <span style="color: blue">typeof</span>(<span style="color: #2b91af">ApplicationPresenter</span>));</pre>
<p><a href="http://11011.net/software/vspaste"></a></p>
<p>A partir del momento que registramos un objeto en el contenedor podemos aprovechar todas las ventajas de la inyección de dependencias, también conocida como inversión de control (<em>IoC</em>).</p>
<p>De forma resumida, bajo inyección de dependencias, las clases de objetos definen que tipo de objetos o interfaces necesitan (dependencias), así como que eventos publican y a cuales desean suscribirse, siendo el contenedor el encargado de proveer a las instancias de los objetos con dichas dependencias. Estos sistemas presentan importantes ventajas desde el punto de vista de flexibilidad, escalabilidad y fiabilidad.</p>
<p>Caliburn provee de dos atributos para la gestión de eventos. Podemos publicar un evento del tipo <em>Action&lt;T&gt;</em> marcándole con el atributo <em>Publish</em> tal y como se ve en el ejemplo siguiente.</p><pre class="code">[<span style="color: #2b91af">Publish</span>(<span style="color: #a31515">"event://NombreDelEvento"</span>)]
<span style="color: blue">public event </span><span style="color: #2b91af">Action</span>&lt;<span style="color: blue">object</span>&gt; Evento;</pre>
<p><a href="http://11011.net/software/vspaste"></a></p>
<p>Y podemos recibir dicho evento en los objetos que nos interese simplemente definiendo un método que encaje con el delegado del evento, en este caso <em>Action&lt;object&gt;</em> y marcándole con el atributo <em>Subscribe</em>.</p><pre class="code">[<span style="color: #2b91af">Subscribe</span>(<span style="color: #a31515">"event://NombreDelEvento"</span>)]
<span style="color: blue">public void </span>GestorDelEvento(<span style="color: blue">object </span>parametro)
{
    <span style="color: green">//Acciones a realizar cuando se produzca el evento
</span>}</pre>
<p>Cada vez que solicitemos un objeto al contenedor, este se encargará de realizar las gestiones necesarias para 'cablear' automáticamente los eventos.</p>
<p>Por último mencionar que podemos obtener objetos del contenedor utilizando el método estático <em>Resolve</em>. Por ejemplo, para obtener un objeto del tipo <em>ApplicationPresenter</em> previamente registrado utilizaríamos el siguiente código.</p><pre class="code"><span style="color: #2b91af">ApplicationPresenter </span>presenter = 
    (<span style="color: #2b91af">ApplicationPresenter</span>)<span style="color: #2b91af">Shell</span>.Container
    .Resolve(<span style="color: blue">typeof</span>(<span style="color: #2b91af">ApplicationPresenter</span>));</pre>
<p>Caliburn también nos proporciona algunas extensiones de marcado para utilizar en <em>xaml</em> que nos permiten obtener una instancia de un presentador directamente desde una vista asignándole a la propiedad <em>DataContext</em> de la vista así como enlazar directamente ciertos componentes de la interfaz de usuario (botones y objetos de menú) a métodos públicos definidos en el presentador.</p>