---
layout: page
title: Termómetro con Arduino
image:
  thumb: /07-11/termometro-arduino-montaje_6.jpg
---

Utilizando un Arduino y el chip sensor de temperatura <a href="http://oomlout.com/ARDX/ZZ-DATA/TMP36.pdf" target="_blank">TMP36</a> se construye un sencillo termómetro tal y como se propone en el circuito diez de la <a href="http://www.adafruit.com/index.php?main_page=product_info&amp;cPath=17&amp;products_id=170&amp;zenid=bb5442d0730420f91821f153c5b3babf" target="_blank">guía de experimentación de adafruit</a>.

El circuito es extremadamente sencillo, basta conectar los pins de alimentación y referencia del sensor para alimentarle, y que de esta forma nos proporcione en su otro pin un voltaje proporcional a la temperatura, el cual leeremos a través de la entrada analógica número 0 del Arduino, cuyo ADC nos proporciona una resolución de 10 bits.

<a href="{{ site.baseurl }}/images/07-11/termometro-arduino-montaje_6.jpg"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="termometro-arduino-montaje" border="0" alt="termometro-arduino-montaje" src="{{ site.baseurl }}/images/07-11/termometro-arduino-montaje_thumb_2.jpg" width="504" height="396" /></a>

El <a href="http://www.oomlout.com/ARDX/CIRC10/CIRC10-code.txt" target="_blank">programa cargado en el Arduino</a> es simplemente un bucle que cada segundo lee el voltaje de la entrada analógica y le convierte en un valor de temperatura utilizando las indicaciones de la <a href="http://oomlout.com/ARDX/ZZ-DATA/TMP36.pdf" target="_blank">hoja de características del sensor</a>, enviando posteriormente este valor por el puerto serie.

El programa de PC leerá de forma continua los valores de temperatura que le vayan llegando por el puerto serie virtual (USB) y representándoles en pantalla. Su código principal es el siguiente (<em>Aplicacion WPF en C#</em>):

<a href="{{ site.baseurl }}/images/07-11/image_4.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="{{ site.baseurl }}/images/07-11/image_thumb_1.png" width="509" height="409" /></a>

Con lo cual podremos leer en la pantalla del PC el valor de temperatura procedente del sensor, el cual se actualizará cada segundo.

<a href="{{ site.baseurl }}/images/07-11/termometro-pc_2.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="termometro-pc" border="0" alt="termometro-pc" src="{{ site.baseurl }}/images/07-11/termometro-pc_thumb.png" width="244" height="133" /></a>