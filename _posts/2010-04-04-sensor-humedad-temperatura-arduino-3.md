---
layout: page
title: "Sensor de humedad y temperatura con Arduino. Tercera parte: HttpRelay"
image:
  thumb: 07-11/HttpRelay-block-diagram_6.png
---

Este artículo es una continuación de los siguientes:
<ul>
	<li><a href="http://www.laciudadela.net/content/2010-03-19/sensor-de-humedad-y-temperatura-con-arduino-primera-parte-el-hardware">Sensor de humedad y temperatura con Arduino. Primera parte: El hardware.</a></li>
	<li><a href="http://www.laciudadela.net/content/2010-04-03/sensor-de-humedad-y-temperatura-con-arduino-segunda-parte-firmware">Sensor de humedad y temperatura con Arduino. Segunda parte: firmware.</a></li>
</ul>
El acceso a través del puerto serie resulta inconveniente para el propósito de crear un gadget para el escritorio de Windows 7, por lo que se hace necesario escribir un pequeño programa que nos permita trasladar peticiones HTTP convencionales a peticiones a través del puerto serie. Se ha escrito dicho programa y se ha denominado <em>HttpRelay</em>.

<img style="display: inline; border: 0px;" title="Diagrama de bloques de HttpRelay" src="{{ site.baseurl }}/images/07-11/HttpRelay-block-diagram_6.png" alt="Diagrama de bloques de HttpRelay" width="270" height="175" border="0" />

Dicho programa se queda residente como un icono en la barra de notificaciones encargándose de trasladar las peticiones HTTP GET a comandos a través del puerto serie que se haya configurado. De esta forma, podemos comunicarnos con el Arduino a través de HTTP.

<img style="display: inline; border: 0px;" title="pantalla principal del programa HttpRelay" src="{{ site.baseurl }}/images/07-11/http-relay_3.png" alt="pantalla principal del programa HttpRelay" width="331" height="328" border="0" />

El programa se configura a través de un archivo <em>xml</em> que indica la URI en la que se debe escuchar y el puerto serie COM al que se delegará la respuesta, así como, la velocidad en bits por segundo a la que se debe utilizar el puerto.

<img style="display: inline; border: 0px;" title="configuración xml del programa HttpRelay" src="{{ site.baseurl }}/images/07-11/image_3_0.png" alt="configuración xml del programa HttpRelay" width="298" height="111" border="0" />

El programa traslada al puerto serie el parámetro de query llamado ‘q’ por lo que si deseamos obtener mediciones de temperatura y humedad con la configuración anterior, utilizando el comando ‘g’ definido en el firmware, deberemos utilizar la URL: ‘http://localhost:8080/?q=g’

<a href="{{ site.baseurl }}/images/07-11/image_5.png"><img style="display: inline; border: 0px;" title="image" src="http://www.laciudadela.net/wp-content/uploads/2007-2011/image_thumb_1_2.png" alt="image" width="554" height="264" border="0" /></a>

El programa <em>HttpRelay</em>, escrito en c#, utiliza la clase <a href="http://msdn.microsoft.com/es-es/library/system.net.httplistener(VS.80).aspx" target="_blank">HttpListener</a> para realizar la escucha en una URL determinada. 

[Código fuente]({{ site.baseurl }}/files/HttpRelay.zip)