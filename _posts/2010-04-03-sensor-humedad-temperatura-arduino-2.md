---
layout: page
title: "Sensor de humedad y temperatura con Arduino. Segunda parte: firmware"
image:
  thumb: 07-11/image_22.png
---

En un <a href="http://www.laciudadela.net/content/2010-03-19/sensor-de-humedad-y-temperatura-con-arduino-primera-parte-el-hardware" target="_blank">artículo anterior se describió el hardware</a>. En este artículo nos centraremos en el programa que se ejecutará en el Arduino, también llamado <em>firmware</em>.

El programa de Arduino que utilizaremos para obtener la medición de temperatura y humedad del sensor SHT15 proporcionará un sencillo interface a través del puerto serie. Dicho programa está basado en el código de <a href="http://www.glacialwanderer.com/hobbyrobotics/?p=5" target="_blank">Hobby robotics</a>, aunque ha sido fuertemente modificado para adaptarse a nuestras necesidades.

En el principio del programa se definen las constantes que representan a cada uno de los comandos que utilizaremos del sensor, así como a los pines a los que están conectadas las líneas DATA y SCK del sensor. La función <em>shiftIn</em> nos permite leer un numero arbitrario de bits del sensor.

<img style="display: inline; border: 0px;" title="Sensor de humedad y temperatura con arduino y SHT15 - constantes y helpers" src="{{ site.baseurl }}/images/07-11/image_3.png" alt="Sensor de humedad y temperatura con arduino y SHT15 - constantes y helpers" width="437" height="348" border="0" />

La función <em>sendCommand</em> contiene toda la lógica que envía un comando al sensor SHT15 siguiendo el protocolo descrito en el artículo anterior.

<img style="display: inline; border: 0px;" title="Sensor de humedad y temperatura con arduino y SHT15 - envío de comandos" src="{{ site.baseurl }}/images/07-11/image_8_0.png" alt="Sensor de humedad y temperatura con arduino y SHT15 - envío de comandos" width="588" height="482" border="0" />

Después de enviar un comando es necesario esperar unas cuantas decenas de milisegundos a que se realice la medida. Una vez que la medida se ha completado, el sensor avisará poniendo la línea DATA a 0. El esperar el resultado de la medida, es el objetivo de la siguiente función.

<img style="display: inline; border: 0px;" title="Sensor de humedad y temperatura con arduino y SHT15 - espera de resultados" src="{{ site.baseurl }}/images/07-11/image_9.png" alt="Sensor de humedad y temperatura con arduino y SHT15 - espera de resultados" width="404" height="399" border="0" />

Por último, la función <em>getResult</em> obtiene el resultado de la medida del sensor siguiendo el protocolo descrito en el artículo anterior. Dicha medida se obtiene como un entero de 16 bits que será necesario procesar para obtener la medida en las unidades de humedad y temperatura.

<img style="display: inline; border: 0px;" title="Sensor de humedad y temperatura con arduino y SHT15 - lectura de resultados" src="{{ site.baseurl }}/images/07-11/image_12.png" alt="Sensor de humedad y temperatura con arduino y SHT15 - lectura de resultados" width="563" height="488" border="0" />

Ese es el objetivo de las siguientes funciones <em>printTemperature</em> y <em>printHumidity;</em> envían el comando correspondiente al sensor obteniendo el resultado como un entero de 16 bits, convierten dicho entero a un valor de temperatura en grados centígrados y a un valor de humedad relativa, imprimiendo dichos valores a través del puerto serie.

<img style="display: inline; border: 0px;" title="Sensor de humedad y temperatura con arduino y SHT15 - impresión de resultados" src="{{ site.baseurl }}/images/07-11/image_15.png" alt="Sensor de humedad y temperatura con arduino y SHT15 - impresión de resultados" width="462" height="450" border="0" />

La última parte del sketch de arduino es la configuración que simplemente establecerá el pin SCK como de salida y configurará el puerto serie a 9600 bps.

<a href="{{ site.baseurl }}/images/07-11/image_17.png"><img style="display: inline; border: 0px;" title="Sensor de humedad y temperatura con arduino y SHT15 - configuración" src="{{ site.baseurl }}/images/07-11/image_thumb_5.png" alt="Sensor de humedad y temperatura con arduino y SHT15 - configuración" width="278" height="106" border="0" /></a>

y el bucle principal que define una serie de comandos para obtener la medición de la temperatura y la humedad. El comando que utilizaremos en artículos posteriores es el comando ‘g’. Al recibir una ‘g’ en ASCII por el puerto serie, el programa realizara mediciones de la temperatura y de la humedad y las imprimirá por el puerto serie separadas por el carácter ‘|’ y finalizadas por ‘rn’.

<a href="{{ site.baseurl }}/images/07-11/image_19.png"><img style="display: inline; border: 0px;" title="Sensor de humedad y temperatura con arduino y SHT15 - bucle principal" src="{{ site.baseurl }}/images/07-11/image_thumb_6.png" alt="Sensor de humedad y temperatura con arduino y SHT15 - bucle principal" width="489" height="654" border="0" /></a>

La implementación de dicho programa en el Arduino ya nos permite obtener los valores de temperatura y humedad utilizando un programa de terminal tal y como se muestra en la figura siguiente.

<img style="display: inline; border: 0px;" title="Sensor de humedad y temperatura con arduino y SHT15 - resultados por consola serie" src="{{ site.baseurl }}/images/07-11/image_22.png" alt="Sensor de humedad y temperatura con arduino y SHT15 - resultados por consola serie" width="545" height="485" border="0" />

En un artículo posterior utilizaremos esta base para construir un gadget para el escritorio de Windows 7.