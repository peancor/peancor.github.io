---
layout: page
title: Specnix - emulador de zx spectrum para Silverlight 2
image:
  thumb: 07-11/2008-10-game-over.png
---

He actualizado un viejo proyecto, el emulador de ZX Spectrum [SpecNix](http://www.codeplex.com/specnix), enfocado previamente en la reproducción de archivos rzx, para hacerlo jugable.

![]({{ site.baseurl }}/images/07-11/2008-10-specnix-game-menu.png)

El menú principal muestra un listado de todos los programas de spectrum que hayamos previamente subido al almacen privado de la aplicación (Isolated Storage). En la parte inferior, los botones permiten ejecutar los siguientes comandos:

<ul><li>Load: cargara y ejecutará la rom original del spectrum</li><li>Upload: permite subir un archivo de juego ''z80'' o un archivo de partida grabada ''rzx'' al almacen privado de la aplicación (Isolated Storage) desde donde podrá posteriormente ser reproducido</li><li>Run: reproduce el juego seleccionado.</li><li>Delete: borra el juego seleccionado.</li></ul>

![]({{ site.baseurl }}/images/07-11/2008-10-game-over.png) 

Podemos salir del programa que estemos reproduciendo al menú principal pulsando la tecla ''escape''.

<iframe height="400" frameborder="0" width="600" scrolling="no" src="{{ site.baseurl }}/sites/silverlight/SilverlightSpecNixPlayable/SpecNix.html"></iframe>

Puede descargar el código fuente aquí:

<a href="http://www.codeplex.com/specnix">www.codeplex.com/specnix</a>'