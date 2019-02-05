---
layout: page
title: "Sensor de humedad y temperatura con Arduino. Cuarta parte: Gadget para Windows 7"
image:
  thumb: 07-11/sht-desktop-detail_3.png
---

Este artículo es una continuación de los siguientes:
<ul>
	<li><a href="http://www.laciudadela.net/content/2010-03-19/sensor-de-humedad-y-temperatura-con-arduino-primera-parte-el-hardware">Sensor de humedad y temperatura con Arduino. Primera parte: El hardware.</a></li>
	<li><a href="http://www.laciudadela.net/content/2010-04-03/sensor-de-humedad-y-temperatura-con-arduino-segunda-parte-firmware">Sensor de humedad y temperatura con Arduino. Segunda parte: firmware.</a></li>
	<li><a href="http://www.laciudadela.net/content/2010-04-04/sensor-de-humedad-y-temperatura-con-arduino-tercera-parte-httprelay">Sensor de humedad y temperatura con Arduino. Tercera parte: HttpRelay.</a></li>
</ul>
Utilizando la base desarrollada en artículos anteriores, se construyó un gadget para el escritorio de Windows 7 que nos muestra información sobre la temperatura y la humedad y cuyo aspecto se puede ver en la figura siguiente.

<img style="display: inline; border: 0px;" title="Gadget para Windows 7 para medición de Humedad y Temperatura con Arduino y sensor SHT15" src="{{ site.baseurl }}/images/07-11/sht-desktop-detail_3.png" alt="Gadget para Windows 7 para medición de Humedad y Temperatura con Arduino y sensor SHT15" width="509" height="434" border="0" />

Además del manifiesto que le define, el gadget está compuesto de Html/CSS, JavaScript e imágenes que definen su <em>background</em>. El siguiente <a href="http://msdn.microsoft.com/en-us/magazine/cc163370.aspx" target="_blank">artículo que explica como desarrollar un gadget para Windows</a> resultó muy útil.

Toda la lógica ha sido implementada en JavaScript utilizando <a href="http://jquery.com/" target="_blank">Jquery</a> y las <a href="http://code.google.com/intl/es-ES/apis/visualization/documentation/gallery.html" target="_blank">APIs de visualización de Google</a>.

El gadget establece un timer que ejecutará una medición de forma periódica cada minuto utilizando ajax. Si la petición tiene éxito se ejecutará la función <em>measureReceived</em>.

<img style="display: inline; border: 0px;" title="petición de medicion de temperatura y humedad ajax" src="{{ site.baseurl }}/images/07-11/image_3_1.png" alt="petición de medicion de temperatura y humedad ajax" width="281" height="118" border="0" />

En la función <em>measureReceived</em>, ejecutada después de cada medición, se actualizarán los valores de las medidas, así como del gráfico que representa su historia. También se calcularán y actualizarán los estadísticos valor medio, mínimo y máximo de la humedad y temperatura.

El código fuente se adjunta al artículo.