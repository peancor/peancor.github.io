---
layout: page
title: Pinceladas de evolución
image:
  thumb: 07-11/2008-12-chromosome.jpg
---

Los algoritmos genéticos están inspirados en la teoría de la evolución de Darwin y forman parte de la computación evolutiva, área de rápido crecimiento dentro del campo de la inteligencia artificial.

Los seres vivos están compuestos por células. En cada una de la células de un organismo se encuentra el mismo conjunto de cromosomas. Los cromosomas son cadenas de ADN y sirven como modelo para el organismo, es decir, el organismo se construirá o desarrollará en base a las instrucciones codificadas en su cromosomas.

<img title="Representación de un cromosoma" src="{{ site.baseurl }}/images/07-11/2008-12-chromosome.jpg" alt="Representación de un cromosoma" />

Un cromosoma está compuesto por genes, bloques de ADN. Cada gen codifica una proteína particular. Se podría decir que cada gen codifica un rasgo, como por ejemplo el color de los ojos. Los diferentes rasgos son llamados alelos (ojos azules, ojos marrones). Cada gen tiene su propia posición dentro del cromosoma.

El conjunto completo de material genético (todos los cromosomas) es llamado genoma. Un conjunto particular de genes del genoma se llama genotipo. El genotipo es la base para el fenotipo, las características físicas y mentales que presentara el organismo al desarrollarse.

Durante la reproducción, el material genético de cada uno de los padres se recombina al formarse los gametos, células cuyo material genético se fusionará en la fecundación. Existe un complicado conjunto de sistemas encargados de asegurar la integridad de la molécula de ADN con el fin de preservar la información hereditaria y reparar la mayor parte de las alteraciones que pueda experimentar, sin embargo, aproximadamente uno de cada mil errores no es corregido por lo que la información se ve alterada de una generación a la siguiente apareciendo lo que se denomina <strong>mutación</strong>, que hace referencia a cualquier cambio permanente en el material génico no debido a la segregación independiente de los cromosomas o a la recombinación que ocurre durante el proceso de meiosis.

Las mutaciones se producen al azar y son generalmente perjudiciales, aunque en ocasiones también ocurren mutaciones beneficiosas que confieren alguna ventaja a las células en las que aparecen.

Tanto las recombinaciones como las mutaciones beneficiosas son las causas de las grandes variaciones que muestran los individuos de una misma especie. Los individuos que presenten una mejor adaptación a su entorno es más probable que tengan descendientes formados en base a su material genético.

Los algoritmos genéticos permiten encontrar buenas soluciones para una clase de problemas cuya solución sería difícil de encontrar utilizando otros métodos. Conceptualmente establecen una analogía entre el conjunto de soluciones de un problema y el conjunto de individuos de una población. Cada individuo representa una posible solución al problema y se parte de un conjunto de individuos normalmente generado al azar que se hará evolucionar de tal forma que las nuevas generaciones contengan soluciones mejores para el problema a resolver.

De forma general el proceso es el siguiente:
<blockquote>
<ol>
	<li>Generar una población aleatoria de n cromosomas (posibles soluciones al problema).</li>
	<li>Evaluar la adaptación f(x) de cada cromosoma x en la población. Dicha función evaluara la bondad de la solución que presenta cada cromosoma.</li>
	<li>Si se cumple la condición de finalización (típicamente el haber encontrado una solución aceptable o llegar a un número de generaciones máximo) detener el algoritmo.</li>
	<li>Generar una nueva población. El proceso de crear una nueva generación típicamente se divide en cuatro pasos: Selección, Cruzamiento, Mutación y reemplazo.</li>
	<li>Reemplazar la antigua generación por la nueva.</li>
	<li>Ir al paso 2.</li>
</ol>
</blockquote>
Un ejemplo de resolución de este tipo de problemas lo encontramos en la reciente implementación por <a href="http://rogeralsing.com/2008/12/07/genetic-programming-evolution-of-mona-lisa/" target="_blank">Roger Alsing</a> de un algoritmo genético para aproximar una imagen utilizando un número pequeño de polígonos traslucidos.

<img title="Aproximación mediante poligonos de una fotografía de Darwin utilizando un algoritmo genético" src="{{ site.baseurl }}/images/07-11/2008-12-darwin.png" alt="Aproximación mediante poligonos de una fotografía de Darwin utilizando un algoritmo genético" />

El funcionamiento del algoritmo, variante del proceso descrito anteriormente, se puede resumir en los siguientes pasos, tal y como Roger describe en su blog:
<blockquote>
<ol>
	<li>Generar una cadena de ADN de forma aleatoria. Esta cadena contendrá las instrucciones para pintar cada uno de los polígonos que aparecen en pantalla.</li>
	<li>Generar una nueva cadena de ADN copiando la cadena de ADN anterior mutándola ligeramente.</li>
	<li>Utilizar la cadena para representar los polígonos en pantalla.</li>
	<li>Comparar el resultado con la imagen original.</li>
	<li>Si la nueva imagen se parece más a la imagen original sobrescribir la cadena de ADN original con la nueva cadena.</li>
	<li>Repetir desde 1.</li>
</ol>
</blockquote>
Se puso su implementación a prueba con una imagen arbitraria y se dejo evolucionar al ‘organismo’ durante aproximadamente media hora. En el siguiente video se puede ver el proceso de evolución acelerado por un factor de 32.

<div class="flex-video">
  <iframe id="ytplayer" type="text/html" width="640" height="360"
    src="https://youtube.com/embed/vII5kIxZBj8"
    frameborder="0"></iframe>
</div>

La imagen final generada se corresponde con la generación 117653 y está compuesta por un total de 78 polígonos con una media de 8 puntos por polígono.

Se puede descargar el código fuente del programa en el <a href="http://rogeralsing.com/" target="_blank">blog de Roger Alsing</a>.
<h6>Fuentes| <a href="http://www.obitko.com/tutorials/genetic-algorithms/" target="_blank">Introduction to Genetic Algorithms</a> | <a href="http://es.wikipedia.org/wiki/Algoritmo_gen%C3%A9tico" target="_blank">Wikipedia</a> | <a href="http://www.casadellibro.com/libro-fundamentos-biologicos-de-la-conducta-2-vols-2-ed/2900000813278" target="_blank">Fundamentos biológicos de la conducta</a></h6>