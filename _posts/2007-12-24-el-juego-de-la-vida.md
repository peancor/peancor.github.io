---
layout: page
title: El juego de la vida
subheadline: "Juego de la vida"
teaser: implementación del juego de la vida en XNA.
tags:
  - programación
image:
  thumb: 2007-12-24-el-juego-de-la-vida.png
---

Resulta interesante observar como partiendo de un estado inicial y de unas reglas sencillas, el juego de la vida evoluciona exhibiendo complejos patrones.

Ejemplo de [Autómata celular](http://es.wikipedia.org/wiki/Aut%C3%B3mata_celular) concebido por John Horton Conway y popularizado por Martin Gardner en un art&iacute;culo de Scientific American aparecido en 1970, el juego de la vida, desde su aparición, ha sido plasmado por los programadores en multitud de sistemas.

Utilizando la plataforma XNA y tomando como base uno de los ejemplos que se proporcionan consistente en un [sistema de partículas 2D](http://creators.xna.com/Headlines/developmentaspx/archive/2007/01/01/Particle-Sample.aspx), se realizó una implementación del juego de la vida. 

La implementación funciona tanto en sistemas Windows como en Xbox 360 suponiendo que contemos con una licencia para ejecutar c&oacute;digo en dicha consola. Para compilar el código es necesario disponer de [XNA Game Studio Express 1.0 Refresh](http://creators.xna.com/Resources/Essentials.aspx), el cual se puede descargar gratuitamente.

En el siguiente vídeo se puede observar la evolución del autómata celular para un estado inicial concreto establecido al azar.

<div class="flex-video">
  <iframe id="ytplayer" type="text/html" width="640" height="360"
    src="https://www.youtube.com/embed/g36yhy3_EtI"
    frameborder="0"></iframe>
</div>

La implementacón consta de una rejilla de 50x50 celdas o _células_. Cada c&eacute;lula puede estar en uno de dos posibles estados: viva o muerta.

Para cada iteración se calcula el siguiente estado utilizando las reglas descritas a continuación:
1. una célula ''nace'', es decir, pasa al estado de viva si y solo si tres células vecinas suyas están vivas.
2. Si una célula viva tiene como vecinas a dos o tres células vivas, seguirá viva. En caso contrario la célula morirá.

##### ¿Desea saber más?
- [Completo artículo en Wikipedia](http://es.wikipedia.org/wiki/Juego_de_la_vida)
- [Código fuente]( {{ site.baseurl }}/files/2007-12-24-conways-game-of-life.zip)