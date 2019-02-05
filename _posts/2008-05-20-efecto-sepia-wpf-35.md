---
layout: page
title: Efecto Sepia con WPF 3.5 SP1
image:
 thumb: 07-11/2008-05-demo-efecto-sepia.jpg
---

Una de las novedades introducidas en el service pack 1 de la versión 3.5 de Windows Presentation Foundation es la posibilidad de utilizar ‘<a href="http://es.wikipedia.org/wiki/Pixel_Shader">Pixel shaders</a>’ personalizados como efectos para cualquier componente visual.
<p class="MsoNormal">En los comienzos de la fotografía, se aplicaba el tonado sepia a las fotografías en blanco y negro, debido a que dicho proceso hacía más duraderas a las fotografía, y es por ello que muchas de las fotografías antiguas tienen ese característico aspecto basado en tonos marrones.</p>
<p class="MsoNormal">El siguiente fragmento de código define un 'pixel shader', el cual al aplicarle como efecto a cualquier elemento Visual de una aplicación WPF, le dará esa característica tonalidad sepia.</p>
<p class="MsoNormal"><img src="{{ site.baseurl}}/images/07-11/2008-05-codigo-shader-sepia.png" alt="pixel shader para el efecto sepia" width="382" height="471" /></p>
<p class="MsoNormal">La variable lumaCoeffs es un vector cuyo producto escalar con el vector que define los valores RGB en una pixel de la imagen, nos da el valor de <a href="http://es.wikipedia.org/wiki/Luminancia">luminancia </a>que corresponde a ese punto. El valor de luminancia se utiliza para posteriormente obtener el color en tono sepia correspondiente a ese valor utilizando la función lerp, que se utiliza para hacer una interpolación lineal entre los dos colores que definen los 'extremos' de la gama de tonalidades sepia.</p>
<p class="MsoNormal">Por el momento, no podemos utilizar el efecto directamente desde Visual Studio y se necesita compilarle primero utilizando la utilidad fxc del SDK de DirectX. Si hemos guardado el código de la figura anterior en un fichero con el nombre sepia.fx podemos compilarle a un archivo sepia.ps que se podrá utilizar directamente desde WPF de la siguiente manera:</p>

<ul>
	<li><span style="font-size: 11pt; line-height: 115%; font-family: 'Calibri','sans-serif';" lang="EN-US">fxc<span>  </span>/T ps_2_0 /E main /Fosepia.ps sepia.fx</span></li>
</ul>
Una vez compilado el efecto podemos utilizarlo derivando una clase de ShaderEffect llamada, por ejemplo, SepiaEffect, y asignado el archivo sepia.ps a su propiedad PixelShader. Dicho archivo, habrá tenido que ser incluido previamente en el proyecto de Visual Studio y se deberá haber establecido su ‘build action’ como resource.
<p class="MsoNormal">Para más detalles consultar el código fuente que acompaña a este artículo, que utiliza el efecto tal y como se muestra en la siguiente figura.</p>
<img src="{{ site.baseurl}}/images/07-11/2008-05-demo-efecto-sepia.jpg" alt="Demo del efecto sepia" width="425" height="463" />

Referencia: <span class="entry-author-name"><a href="http://blogs.msdn.com/greg_schechter/archive/2008/05/12/a-series-on-gpu-based-effects-for-wpf.aspx">Blog de Greg Schechter</a>
</span>