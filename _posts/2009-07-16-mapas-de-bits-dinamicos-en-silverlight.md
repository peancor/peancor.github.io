---
layout: page
title: Mapas de bits dinámicos en Silverlight
image:
  thumb: 07-11/2009-07-16-metaballs.jpg
---

Una de las novedades introducidas en la versión 3 de Silverlight es la clase <em>WriteableBitmap</em> que nos permite la generación dinámica de mapas de bits o bitmaps.

Su funcionamiento es muy sencillo, basta con pasar en el constructor el número de pixels de ancho y de alto que queremos que tenga la imagen para generarla y una vez generada podemos acceder a su contenido a través de la propiedad <em>Pixels</em>.

En el siguiente fragmento de código se construye un bitmap de 320x200 pixels y se establece el pixel en la posición (x, y) al color (r,g,b). Una vez modificado el bitmap se debe llamar a la función <em>Invalidate</em> para actualizar su contenido.
<div id="codeSnippetWrapper" style="text-align: left; line-height: 12pt; background-color: #f4f4f4; margin: 20px 0px 10px; width: 97.5%; font-family: 'Courier New', courier, monospace; direction: ltr; max-height: 200px; font-size: 8pt; overflow: auto; cursor: text; border: silver 1px solid; padding: 4px;">
<div id="codeSnippet" style="text-align: left; line-height: 12pt; background-color: #f4f4f4; width: 100%; font-family: 'Courier New', courier, monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible; border-style: none; padding: 0px;">
<pre style="text-align: left; line-height: 12pt; background-color: white; margin: 0em; width: 100%; font-family: 'Courier New', courier, monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible; border-style: none; padding: 0px;"><span id="lnum1" style="color: #606060;"> 1:</span> var bitmap = <span style="color: #0000ff;">new</span> WriteableBitmap(320,200);</pre>
<pre style="text-align: left; line-height: 12pt; background-color: #f4f4f4; margin: 0em; width: 100%; font-family: 'Courier New', courier, monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible; border-style: none; padding: 0px;"><span id="lnum2" style="color: #606060;"> 2:</span> var pixelColor = BitConverter.ToInt32(<span style="color: #0000ff;">new</span> <span style="color: #0000ff;">byte</span>[] { (<span style="color: #0000ff;">byte</span>)b, (<span style="color: #0000ff;">byte</span>)g, (<span style="color: #0000ff;">byte</span>)r, 255 }, 0)</pre>
<pre style="text-align: left; line-height: 12pt; background-color: white; margin: 0em; width: 100%; font-family: 'Courier New', courier, monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible; border-style: none; padding: 0px;"><span id="lnum3" style="color: #606060;"> 3:</span> bitmap.Pixels[x + y * bitmap.PixelWidth] = pixelColor;</pre>
<pre style="text-align: left; line-height: 12pt; background-color: #f4f4f4; margin: 0em; width: 100%; font-family: 'Courier New', courier, monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible; border-style: none; padding: 0px;"><span id="lnum4" style="color: #606060;"> 4:</span> bitmap.Invalidate();</pre>
</div>
</div>
Por supuesto es necesario asignar el bitmap a la propiedad <em>Source</em> de un control <em>Image</em> para representarle en pantalla.

Una funcionalidad interesante añadida es el método <em>Render</em> que permite representar en el bitmap un control gráfico descendiente de <em>UIElement</em> después de aplicarle una transformación (rotación,escala,posición) lo que abre la puerta a la generación de interesantes efectos.

La siguiente ilustración muestra la generación dinámica de <em>bitmaps. Si posa el cursor sobre la imagen podrá ver una representación de </em><a href="http://es.wikipedia.org/wiki/Metaball" target="_blank"><em>metaballs</em></a><em> construida sobre un WriteableBitmap.</em>

<object width="500" height="300"
    data="data:application/x-silverlight-2," 
    type="application/x-silverlight-2" >
    <param name="source" value="{{ site.baseurl }}/files/2009-07-metaballs.xap"/>
</object>