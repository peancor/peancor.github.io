---
layout: page
title: Servicios Web ASP.NET en Linux vía Mono
image:
  thumb: 07-11/2008-11-codigo-web-service.png
---

[Mono](http://mono-project.com), la implementación OpenSource de .Net, es ya una plataforma madura siendo actualmente una interesante opción a la hora de desarrollar en diversas plataformas entre las que se incluyen Linux, Windows, iPhone, Wii, etc. En teoría, al disponer de los fuentes podemos hacer que funcione en cualquier plataforma aunque actualmente su ‘footprint’ mínimo está en torno a 2 MegaBytes.

Como ejemplos importantes de su uso tenemos el reciente anuncio de [SecondLife](http://blog.secondlife.com/2008/08/20/mono-launch/) donde han comenzado a utilizarle en sus servidores; o [Unity](http://unity3d.com/unity/), una plataforma de desarrollo de videojuegos multiplataforma donde también se utiliza.

[Moonlight](http://www.go-mono.com/moonlight/), la implementación OpenSource de Silverlight basada en Mono avanza también a buen ritmo.

Entre sus características se encuentra soporte casi completo para ASP.NET 2.0, incluyendo Servicios Web.

La instalación es sencilla, en mi caso, bajo un servidor Ubuntu Hardy (8.04), bastó con ejecutar los siguientes dos comandos para tener el sistema listo:

- sudo aptitude install mono-2.0-devel
- sudo aptitude install mono-xsp2

El primer comando instala el entorno de desarrollo y el segundo instala un servidor ASP.NET independiente. Existen alternativas para servir las páginas directamente desde Apache pero en mi caso se presentaban problemas de dependencias por lo que se opto por la vía del servidor independiente escuchando en un puerto diferente al de Apache (esto ha sido solucionado en Ubuntu Intrepid 8.10).

Hecho esto basta con ejecutar xsp2 bajo el directorio sobre el que queramos la raíz de la aplicación Web para tener el servidor funcionando con la configuración básica.

<img src="{{ site.baseurl }}/images/07-11/2008-11-xsp2.png" /> 

Copiamos el código del servicio Web que se propone como ejemplo en el sitio de Mono ‘NumberService.asmx’ a la raíz del servidor y ya podemos empezar a consumir el servicio desde diversas aplicaciones, <strong>incluyendo Silverlight</strong>.

<img src="{{ site.baseurl }}/images/07-11/2008-11-codigo-web-service.png" />

El ejemplo anterior es muy sencillo proporcionando un par de métodos para sumar y restar números, no obstante, proporciona la base para construir nuestros propios servicios web que accedan a bases de datos, escriban y lean ficheros, generen imagenes dinámicamente, etc, etc.

Para comprobar que funciona simplemente escribimos la dirección en el navegador en la forma ‘http://&lt;host:port&gt;/NumberService.asmx’ y podremos observar una página autogenerada donde podemos ver la auto-descripción del servicio así como probar su funcionalidad.

<img src="{{ site.baseurl }}/images/07-11/2008-11-resultados-numbersservice.png" /></p>