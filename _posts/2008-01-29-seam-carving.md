---
layout: page
title: Seam Carving .NET
image:
  thumb: 07-11/2008-01-29-300x210-palacio-magdalena-seamonster.jpg
---

<p>Shai Avidan y Ariel Shamir presentaron en la conferencia SIGGRAPH 2007 una nueva t&eacute;cnica para el redimensionado de im&aacute;genes en la cual se tiene en cuenta el contenido de dichas im&aacute;genes.</p>
<p>En el siguiente v&iacute;deo se puede ver una demostraci&oacute;n de la t&eacute;cnica:</p>

<div class="flex-video">
  <iframe id="ytplayer" type="text/html" width="640" height="360"
    src="https://www.youtube.com/embed/vIFCV2spKtg"
    frameborder="0"></iframe>
</div>

<p>Se puede descargar la publicaci&oacute;n original <a href="http://www.seamcarving.com/arik/imret.pdf" target="_blank">aqu&iacute;</a>.</p>

<p>Mike Swanson ha <a href="http://blogs.msdn.com/mswanson/archive/2008/01/28/seamonster-loosed-to-codeplex.aspx" target="_blank">publicado</a> una implementaci&oacute;n de dicha dicha t&eacute;cnica en <a href="http://www.codeplex.com/" target="_blank">CodePlex</a> escrita en C# bajo el nombre de <a href="http://www.codeplex.com/seamonster" target="_blank">SEAMonster</a>.</p>

<p>Utilizamos la siguiente imagen para probar la aplicaci&oacute;n de ejemplo:</p>

<p><img width="425" height="283" border="0" style="border-width: 0px;" alt="425px-palacio_magdalena" src="{{ site.baseurl }}/images/07-11/2008-01-29-425px-palacio-magdalena.jpg" /></p>

<p>A continuaci&oacute;n se muestra la imagen redimensionada de forma cl&aacute;sica:</p>

<p><img width="300" height="200" border="0" style="border-width: 0px;" alt="300px-palaciomagdalena" src="{{ site.baseurl }}/images/07-11/2008-01-29-300px-palaciomagdalena.jpg" /></p>

<p>Mientras que la siguiente imagen ha sido generada redimensionando la imagen original mediante la t&eacute;cnica de 'Seam Carving':</p>

<p><img width="300" height="210" border="0" style="border-width: 0px;" alt="300x210-palacio_magdalena_seamonster" src="{{ site.baseurl }}/images/07-11/2008-01-29-300x210-palacio-magdalena-seamonster.jpg" /></p>