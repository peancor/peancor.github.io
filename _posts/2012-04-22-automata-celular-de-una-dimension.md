---
layout: post
title: Autómata celular de una dimensión
image:
  thumb: 12/rule-45.png
  homepage: 12/rule-45.png
---

En general, los sistemas pueden presentar uno de los siguientes tipos de comportamiento:
<ul>
	<li>estabilidad</li>
	<li>periodicidad</li>
	<li>caos</li>
	<li>complejidad</li>
</ul>
Los autómatas celulares en una dimensión fueron explorados ampliamente en el libro 'a new kind of science' de Stephen Wolfram.

El estado de dichos autómatas consiste en un vector de valores binarios. En cada cambio de estado del autómata, cada valor cambia en función de su estado actual y de sus 'vecinos'. Existen 256 variantes de estos autómatas que se definen cada una por una regla.

Estos autómatas presentan variantes con los cuatro tipos de comportamiento mencionados anteriormente.

###### Estabilidad
<a href="{{ site.baseurl }}/images/12/rule-251.png"><img class="size-full wp-image-410" title="rule 251" alt="" src="{{ site.baseurl }}/images/12/rule-251.png" width="441" height="287" /></a>

###### Periodicidad
<a href="{{ site.baseurl }}/images/12/rule-1.png"><img class="size-full wp-image-411" title="rule 1" alt="" src="{{ site.baseurl }}/images/12/rule-1.png" width="432" height="292" /></a>

###### Caos
<a href="{{ site.baseurl }}/images/12/rule-45.png"><img class="size-full wp-image-413" title="rule 45" alt="" src="{{ site.baseurl }}/images/12/rule-45.png" width="406" height="260" /></a>

###### complejidad
<a href="{{ site.baseurl }}/images/12/rule-110.png"><img class="size-full wp-image-414" title="rule 110" alt="" src="{{ site.baseurl }}/images/12/rule-110.png" width="428" height="285" /></a>

<h2>Programa para representar automatas celulares 1D:</h2>
En el programa siguiente puede seleccionar la regla del autómata a representar utilizando el slider. Es necesario javascript y un navegador moderno.

<iframe src="{{ site.baseurl }}/sites/processing/ca1d.html" width="500px" height="400px"></iframe>