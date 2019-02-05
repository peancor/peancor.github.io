---
layout: page
title: Control de led RGB con arduino
image:
 thumb: 07-11/esquema_thumb.png
---

El modelo de <a href="http://www.dealextreme.com/details.dx/sku.20999" target="_blank">led RGB utilizado</a> teóricamente soporta hasta 5W y proporciona 70 lúmenes, sin embargo, en el circuito implementado, se controlará a una potencia mucho menor con una corriente máxima aproximada por color de 60ma. Aún así, esa corriente es demasiada para los puertos del arduino, por lo que se hace necesario intercalar un circuito controlador que soporte corrientes de esa magnitud.

El circuito controlador elegido es el chip <a href="{{ site.baseurl }}/files/ULN2003AN.pdf" target="_blank">ULN2003AN</a> que utilizamos a modo de relé para encender y apagar cada led.

El led tiene cuatro puertos, un ánodo común y un cátodo para cada uno de los colores: rojo, verde y azul. Al combinarse estos colores en distintas proporciones podemos crear la sensación de estar viendo casi cualquier color.

El esquema de circuito se muestra en la siguiente figura:

<a href="{{ site.baseurl }}/images/07-11/esquema_2.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="esquema para el control de led rgb utilizando arduino" src="{{ site.baseurl }}/images/07-11/esquema_thumb.png" border="0" alt="esquema para el control de led rgb utilizando arduino" width="417" height="484" /></a><

<a href="{{ site.baseurl }}/images/07-11/foto%20control%20led%20rgb%20con%20arduino_2.jpg"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="foto control led rgb con arduino" src="{{ site.baseurl }}/images/07-11/foto%20control%20led%20rgb%20con%20arduino_thumb.jpg" border="0" alt="foto control led rgb con arduino" width="429" height="323" /></a>

El sketch Arduino le programa para recibir mensajes de cambio de color del led vía el puerto serie en un formato ‘COLOR R G B’. Una vez recibido el mensaje utiliza la función analogWrite para controlar la corriente que circulara cada led <a href="http://es.wikipedia.org/wiki/Modulaci%C3%B3n_por_ancho_de_pulsos" target="_blank">vía modulación de anchura de pulso (PWM)</a>.


<a href="{{ site.baseurl }}/images/07-11/image_4_1.png"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="sketch en arduino para el control de leds rgb" src="{{ site.baseurl }}/images/07-11/image_thumb_1_1.png" border="0" alt="sketch en arduino para el control de leds rgb" width="470" height="712" /></a>

Posteriormente se realizo un programa en .NET que permite especificar el color del led de una forma amigable. El siguiente video muestra el resultado:

<div class="flex-video">
  <iframe id="ytplayer" type="text/html" width="640" height="360"
    src="https://youtube.com/embed//DIfRKhk26TY"
    frameborder="0"></iframe>
</div>

[Código fuente]({{ site.baseurl }}/files/control_de_led_RGB.zip)