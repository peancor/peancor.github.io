---
layout: page
title: "Sensor de humedad y temperatura con Arduino. Primera parte: El hardware"
image:
  thumb: 07-11/image_30.png
---

Utilizamos un sensor de temperatura y humedad <a href="{{ site.baseurl }}/files/datasheets/SHT1x_datasheet.pdf" target="_blank">SHT15</a> y un Arduino. El interface de datos con el sensor requiere únicamente de 2 pines, un pin de reloj (SCK) y un pin de datos (DATA).

<img style="display: inline; border-width: 0px;" title="esquemático arduino con SHT15" src="{{ site.baseurl }}/images/07-11/image_27.png" alt="esquemático arduino con SHT15" width="358" height="374" border="0" />

El interface con el sensor consiste de lógica estática y por lo tanto no existe una frecuencia de reloj mínima. El pin de datos triestado es utilizado para escribir y leer datos del sensor. Los datos se validan en el pulso de subida del reloj y deben permanecer estables mientras el reloj esté en estado alto.

En el datasheet del sensor se muestran las frecuencias máximas de operación que soporta el sensor, sin embargo, los comandos para modificar los pins del arduino imponen la suficiente sobrecarga para que en este caso no nos tengamos que preocupar de sobrepasarlas, y por lo tanto, no es necesario introducir ningún retraso a la hora de modificar los pins del interface para operar con el sensor.

<img style="display: inline; border-width: 0px;" title="foto de la conexión sensor SHT15 a Arduino" src="{{ site.baseurl }}/images/07-11/image_30.png" alt="foto de la conexión sensor SHT15 a Arduino" width="507" height="382" border="0" />

En las siguientes figuras se muestra una traza del comando para medir la temperatura. El trazo superior de la figura representa el reloj (SCK) y el inferior los datos (DATA). El comando para medir la humedad es muy parecido por lo que solo se ilustrará el de temperatura.

La secuencia para enviar un comando consiste en poner DATA a 0 mientras SCK es 1, seguido por un pulso de reloj de 1 a 0 y de 0 a 1 para a continuación poner de nuevo DATA a 1 con SCK aún a 1.

Posteriormente a la secuencia de inicio de comando se envían 3 bits de dirección (que deben ser 000) y 5 bits de comando, que en el caso del comando para medir la temperatura son 00011.

El sensor indica la correcta recepción del comando estableciendo DATA a 0 durante la parte activa del siguiente pulso del reloj y liberando la línea en la caída de dicho pulso lo cual hace que DATA quede a 1 después del noveno pulso de reloj. A partir de ese momento el sensor realiza la medida, que tardara unas decenas de milisegundos. El sensor avisará de que ha completado la medida estableciendo DATA a 0.

<img style="display: inline; border: 0px;" title="Traza lógica del envio de un comando al sensor de temperatura y humedad SHT15" src="{{ site.baseurl }}/images/07-11/image_13.png" alt="Traza lógica del envio de un comando al sensor de temperatura y humedad SHT15" width="452" height="109" border="0" />

En el momento que DATA vale 0 podemos proceder a leer los datos de la medida realizada por el sensor.

<img style="display: inline; border: 0px;" title="traza lógica de la lectura de datos de temperatura sensor SHT15 con arduino" src="{{ site.baseurl }}/images/07-11/image_6_0.png" alt="traza lógica de la lectura de datos de temperatura sensor SHT15 con arduino" width="488" height="109" border="0" />

Se lee el primer byte, que en el caso anterior corresponde a 00011000 = 0x18 y se envía un ACK poniendo la línea de datos a cero durante el siguiente pulso de reloj. A continuación se lee el segundo byte correspondiente a 00011010 = 0x1A y en este caso no enviamos un ACK debido a que no vamos a utilizar el CRC que nos podría enviar el sensor como un tercer byte si le diéramos un ACK. El mantener DATA activo después de leer el segundo byte indica al sensor que hemos terminado y le permite pasar a modo SLEEP.

Después de leer el valor hexadecimal 0x181A que equivale a 6170 obtenemos la temperatura mediante la siguiente fórmula: T= –40.1 + 6170 * 0.01 = 21.6ºC