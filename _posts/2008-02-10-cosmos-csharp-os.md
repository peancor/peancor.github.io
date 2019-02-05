---
layout: page
title: "Cosmos: un sistema operativo escrito en C#"
image:
  thumb: 07-11/2008-02-10-cosmos-build.png
---

<p><a target="_blank" href="http://www.gocosmos.org/">Cosmos</a>, acr&oacute;nimo de sistema operativo administrado open source en C# (C# Open Source Managed Operating System) nos permite generar un sistema operativo a medida.</p>

<p>El <a target="_blank" href="http://www.codeplex.com/Cosmos">kit de usuario</a> incluye una plantilla para Visual Studio que automatiza el proceso de construcci&oacute;n de la imagen del sistema operativo adem&aacute;s de proporcionar herramientas que facilitan la depuraci&oacute;n.</p>  

<pre class="code"><span style="color: green;">// Main entry point of the kernel<br /></span><span style="color: blue;">public static void </span>Init()
{
    Cosmos.Kernel.<span style="color: rgb(43, 145, 175);">CPU</span>.Init();
    <span style="color: rgb(43, 145, 175);">Console</span>.WriteLine(<span style="color: rgb(163, 21, 21);">&quot;Done booting&quot;</span>);
    <span style="color: rgb(43, 145, 175);">Console</span>.ForegroundColor = <span style="color: rgb(43, 145, 175);">ConsoleColor</span>.Red;
    <span style="color: rgb(43, 145, 175);">Console</span>.WriteLine(<span style="color: rgb(163, 21, 21);">&quot;Hola Cosmos!!!&quot;</span>);
    <span style="color: blue;">while </span>(<span style="color: blue;">true</span>)
        ;
}</pre>  

<p>Al arrancar Cosmos se llamar&aacute; al m&eacute;todo est&aacute;tico Init donde podremos ejecutar nuestro c&oacute;digo. Si comenzamos el proceso de depuraci&oacute;n (F5) se nos presentar&aacute;n varias opciones, entre ellas la construcci&oacute;n de una imagen ISO desde donde podremos arrancar nuestro sistema operativo.</p>  

<p><img width="394" height="349" border="0" src="{{ site.baseurl }}/images/07-11/2008-02-10-cosmos-build.png" alt="cosmos build" style="border-width: 0px;" /></p>  

<p>En nuestro caso seleccionamos la opci&oacute;n 3 con lo cual se utilizar&aacute; el emulador <a target="_blank" href="http://es.wikipedia.org/wiki/QEMU">QEMU</a> para ejecutar el sistema operativo obteniendo el siguiente resultado.</p>  

<p><img width="402" height="442" border="0" src="{{ site.baseurl }}/images/07-11/2008-02-10-cosmos-qemu.png" alt="qemu" style="border-width: 0px;" /></p>