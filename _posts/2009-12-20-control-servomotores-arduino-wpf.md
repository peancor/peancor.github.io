---
layout: page
title: Control de servomotores con Arduino y WPF
image:
  thumb: 07-11/image_2.png
---

<p>Los <a href="http://es.wikipedia.org/wiki/Servomotor_de_modelismo" target="_blank">servomotores</a> son motores que integran una circuitería de control que permiten posicionar su eje dentro de un rango. Típicamente los servomotores permiten posicionar el eje con precisión dentro de un rango angular de 0 a 180 grados aproximadamente.</p>
<p>Constan de tres señales de entrada: alimentación, referencia, y señal de control. Utilizando la señal de control se puede posicionar el motor dentro del rango. El control se realiza a través de pulsos de duración determinada de la señal de control. Por ejemplo, para posicionar un servomotor controlado con pulsos de 1msg a 2msg de rango 0-180 grados a 90 grados necesitaríamos suministrar a la señal de control un pulso de 1.5msg de duración.</p>
<p>Se conecta el control del servomotor a la salida digital número 9 del Arduino que programaremos para recibir mensajes de posicionamiento a través del puerto serie, interpretarles y posicionar el servomotor. Para ello utilizaremos las librerías de control de servos (Servo) y de delimitación de mensajes del puerto serie (Messenger).</p>
<p>La inicialización del programa del Arduino se muestra en la siguiente figura donde simplemente indicamos a la librería de control de servos que se utilizará el pin 9 para el control, inicializamos el puerto serie a 115200 baudios e inicializamos la librería de procesado de mensajes.</p>
<p><a href="{{ site.baseurl }}/images/07-11/image_2.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="inicialización control servomotor arduino" src="{{ site.baseurl }}/images/07-11/image_thumb_2.png" border="0" alt="inicialización control servomotor arduino" width="255" height="230" /></a></p>
<p>Dentro del bucle principal simplemente se leerá el puerto serie esperando mensajes de la forma ‘SERVO n’ donde n es un número de 0 a 178 que indica el ángulo en grados donde se desea posicionar el motor. Una vez interpretado el mensaje satisfactoriamente se posicionara el servomotor y se añadirá un pequeño retraso de 15msg que permita al servomotor posicionarse antes de recibir otra orden.</p>
<p><a href="{{ site.baseurl }}/images/07-11/image_4_0.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="bucle principal control servomotor arduino" src="{{ site.baseurl }}/images/07-11/image_thumb_1_0.png" border="0" alt="bucle principal control servomotor arduino" width="489" height="401" /></a>&nbsp;</p>
<p>Para la aplicación WPF diseñaremos una clase con una única propiedad que permita establecer la posición del servo. Haremos que dicha propiedad sea ‘Bindable’ para poderla enlazar de forma natural con los controles de interface gráfico.</p>
<p>La parte principal de dicha clase se muestra en la figura siguiente:</p>
<p><a href="{{ site.baseurl }}/images/07-11/image_6.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="clase controladora de servomotor en .net" src="{{ site.baseurl }}/images/07-11/image_thumb_2_0.png" border="0" alt="clase controladora de servomotor en .net" width="543" height="346" /></a></p>
<p>y se creará un interface gráfico para el control en XAML enlazando a dicha propiedad de la siguiente manera:</p>
<p><a href="{{ site.baseurl }}/images/07-11/image_8.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="xaml para el interface gráfico del control de servomotores con arduino" src="{{ site.baseurl }}/images/07-11/image_thumb_3.png" border="0" alt="xaml para el interface gráfico del control de servomotores con arduino" width="518" height="226" /></a></p>

El resultado se puede ver en el siguiente video. 

<div class="flex-video">
  <iframe id="ytplayer" type="text/html" width="640" height="360"
    src="https://youtube.com/embed/2b9s11eihog"
    frameborder="0"></iframe>
</div>

[Código fuente]({{ site.baseurl }}/files/ServoControlSlider.zip)