---
layout: page
title: El modelo Kuramoto
image:
  thumb: 07-11/2008-11-26-el-modelo-kuramoto.png
---

El fenómeno de la sincronización nos rodea: nuestro corazón, los ritmos circadianos, aplausos, generadores eléctricos... Ciertas especies de luciérnagas han cautivado a muchos viajeros en el Sudoeste Asiático, los cuales regresaban a sus lugares de origen contando historias de poblaciones inmensas de luciérnagas emitiendo luz intermitente de forma totalmente sincronizada creando grandes franjas de luz parpadeante en la oscuridad.

Su estudio se remonta a 1665, cuando <a href="http://es.wikipedia.org/wiki/Christiaan_Huygens" target="_blank">Christiaan Huygens</a> yacía enfermo en la cama con la compañía de dos relojes de péndulo. Después de unos días se dio cuenta de que los péndulos se movían de tal forma que cuando uno estaba completamente a la izquierda, el otro se encontraba completamente a la derecha, y viceversa.

Intrigado, modifico manualmente el ritmo de los péndulos pero con el tiempo siempre volvían a sincronizarse. La explicación que dio a lo que el llamaba “simpatía de dos relojes” fue que cada uno de los péndulos causaba un movimiento imperceptible en la pared de la que colgaba cada reloj y que dicho movimiento tendía a forzar la sincronización de de cada uno de los péndulos con el otro. El tiempo le daría la razón.

En el siguiente video se puede observar una versión de este fenómeno (con sonido se aprecia mejor).


<div class="flex-video">
  <iframe id="ytplayer" type="text/html" width="640" height="360"
    src="https://youtube.com/embed/W1TMZASCR-I"
    frameborder="0"></iframe>
</div>

El modelo Kuramoto fue motivado por el comportamiento de ciertos osciladores químicos y biológicos y permite modelar la sincronización y desincronización en grupos de osciladores acoplados. La ecuación que gobierna el sistema es la siguiente:

<img src="{{ site.baseurl }}/images/07-11/2008-11-kuramoto.png" alt="" />

La limitada variedad de estados en los que el modelo se puede encontrar lo hace apropiado para el modelado de algunos sistemas utilizados en neurociencia.

En la siguiente aplicación, cuyo código se encuentra adjunto, puede observar como varía el comportamiento de 25 osciladores en función de la constante de acoplamiento (K). Al reiniciar la simulación se asignarán velocidades y fases iniciales aleatorias a cada uno de los osciladores.

<object width="500" height="300"
    data="data:application/x-silverlight-2," 
    type="application/x-silverlight-2" >
    <param name="source" value="{{ site.baseurl }}/files/2008-11-KuramotoModel.xap"/>
</object>

[Código fuente]({{ site.baseurl }}/files/KuramotoModel-source.zip)

<h3></h3>
<h3>Referencias</h3>
<ul>
	<li><a href="http://go.owu.edu/~physics/StudentResearch/2005/BryanDaniels/index.html" target="_blank">Synchronization of Globally Coupled Nonlinear Oscillators. The Rich Behavior of the Kuramoto Model</a></li>
	<li><a href="http://tutorials.siam.org/dsweb/cotutorial/" target="_blank">An Introduction to Coupled Oscillators: Exploring the Kuramoto Model</a></li>
</ul>