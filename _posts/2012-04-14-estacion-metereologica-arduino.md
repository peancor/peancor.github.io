---
layout: page
title: "Estación meteorológica digital usb con arduino"
image:
  thumb: 12/2012-04-14-08.29.49-1024x768.jpg
---

Utilizando un <a href="http://arduino.cc/en/Main/ArduinoBoardNano" target="_blank">arduino nano</a>, un módulo basado en el sensor <a href="{{ site.baseurl }}/files/datasheets/SHT1x_datasheet.pdf">SHT15</a> (temperatura y humedad), un módulo basado en el sensor <a href="{{ site.baseurl }}/files/datasheets/sensor_mm_1616_e.pdf">MM1616</a> (iluminancia), y un módulo basado basado en el sensor <a href="{{ site.baseurl }}/files/datasheets/12/MS5561C.pdf">MS5561C</a> (presión y temperatura) se ha construido un sistema que permite registrar las siguientes variables del entorno:


- Temperatura
- Presión atmosférica
- Humedad
- iluminancia

<a href="{{ site.baseurl }}/images/12/2012-04-14-08.29.49.jpg"><img class=" wp-image-177" title="ensamblaje estación meteorológica digital usb con arduino" src="{{ site.baseurl }}/images/12/2012-04-14-08.29.49-1024x768.jpg" alt="ensamblaje estación meteorológica digital usb con arduino" width="584" height="438" /></a>

El programa desarrollado para arduino proporciona un interface a través del puerto serie (9600 baudios). Al recibir el caracter ASCII 'g' el sistema obtiene medidas de cada uno de los sensores escribiendo sus valores en el puerto serie con el formato que se muestra en la siguiente figura:

<a href="{{ site.baseurl }}/images/12/lectura-serie-estacion-meteorologica-digital-usb-arduino.png"><img class="size-full wp-image-194" title="lectura estacion meteorologica digital usb arduino" src="{{ site.baseurl }}/images/12/lectura-serie-estacion-meteorologica-digital-usb-arduino.png" alt="" width="698" height="446" /></a>

El orden de las mediciones el es siguiente:
<ol>
	<li>Temperatura (ºC, SHT15)</li>
	<li>Humedad (%)</li>
	<li>Iluminancia (lux)</li>
	<li>Presión atmosférica (mb)</li>
	<li>Temperatura (MS5561C)</li>
</ol>
<div>

Código fuente: <a href="{{ site.baseurl }}/files/MeteoSys.zip">Sketch Arduino para estación meteorológica</a>
