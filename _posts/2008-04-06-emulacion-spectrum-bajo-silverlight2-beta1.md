---
layout: page
title: Emulación de Spectrum bajo Silverlight 2 Beta 1
image:
  thumb: 07-11/2008-04-06-specnix.png

---

Hace algún tiempo escrib&iacute; un emulador de [Zx Spectrum](http://es.wikipedia.org/wiki/Sinclair_ZX_Spectrum) enfocado a la reproducci&oacute;n de archivos RZX, los cuales contienen el programa de un juego y la grabaci&oacute;n de las pulsaciones de teclado y joystick de alguien jugando a ese juego.

Dichos archivos se utilizan principalmente para la grabación de partidas de juegos de Spectrum, y al reproducirles se puede ver la partida tal y como se jug&oacute; originalmente. Se puede encontrar una buena colecci&oacute;n de archivos RZX en ''<a href="http://www.rzxarchive.co.uk/" target="_blank">The RZX Archive</a>''.

El proyecto se llama SpecNix y est&aacute; hospedado en <a href="http://www.codeplex.com/specnix" target="_blank">CodePlex</a>. Contiene alg&uacute;n bug y no reproduce correctamente todos los archivos RZX pero un buen pu&ntilde;ado de ellos si que son reproducidos correctamente.

Con la aparici&oacute;n de los bits de la Beta 1 de Silverlight 2 decid&iacute; portar el proyecto a dicho entorno, habi&eacute;ndose requerido algunas peque&ntilde;as modificaciones principalmente en la librer&iacute;a <a href="http://www.icsharpcode.net/OpenSource/SharpZipLib/">SharpZipLib</a> utilizada para descomprimir una parte de los archivos RZX.

Tambi&eacute;n fue necesario adaptar la parte dedicada a la representaci&oacute;n gr&aacute;fica de la salida de v&iacute;deo del Spectrum.

El resultado se puede ver a continuaci&oacute;n. Debido principalmente a los dos archivos RZX incluidos en el ensamblado, la aplicaci&oacute;n ocupa en torno a 1MB.

<iframe width="600" scrolling="no" height="400" frameborder="0" src="{{ site.baseurl }}/sites/silverlight/SilverlightSpecNix/App.html"></iframe>


Al pulsar en cualquiera de los dos botones comenzar&aacute; ejecuci&oacute;n del juego en cuesti&oacute;n y la reproducci&oacute;n del archivo RZX.

Los propietarios de todos los archivos binarios incluidos en el emulador han permitido su distribuci&oacute;n como se puede leer en las p&aacute;ginas enlazadas a trav&eacute;s de los bloques de texto con los nombres de las compa&ntilde;&iacute;as (en rojo), as&iacute; como en el inferior (en amarillo).

Aunque seguro que el c&oacute;digo tiene muchos puntos posibles de optimizaci&oacute;n, el mayor problema de rendimiento parece ser debido a que Silverlight no proporciona una forma de crear y manipular mapas de bits, por lo que se tienen que simular utilizando un Canvas con rect&aacute;ngulos distribuidos a lo largo de su superficie a modo de pixels.

No obstante, debido a que la resoluci&oacute;n nativa del Spectrum es relativamente baja (256x192) y solo permite un n&uacute;mero muy limitado de colores, en este caso, se consigue un rendimiento m&aacute;s que aceptable modificando solo los pixels (relleno de los rect&aacute;ngulos) que han cambiado de un frame a otro.

Se puede descargar el c&oacute;digo fuente <a href="http://www.codeplex.com/specnix" target="_blank">aqu&iacute;</a>.