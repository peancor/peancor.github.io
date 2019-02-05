---
layout: page
title: Transiciones con efecto disolver en Silverlight 3
mathjax_enabled: true
---

<p>El efecto de transición entre imágenes disolver o ‘dissolve’ consiste en una interpolación desde la imagen inicial hasta la imagen final en un periodo de tiempo determinado.</p>
<p>Para ello se definirá un parámetro t, que representa el progreso de la transición y cuyo rango es de 0 a 1. Un valor de cero significa que la transición aún no ha comenzado, es decir, aún se muestra completamente la imagen de origen, mientras que un valor de 1 significa que se ha completado el 100% de la transición, es decir, se mostrará la imagen de destino. Un valor de 0.5 significaría que la transición está al 50% por lo que se mostraría una mezcla a partes iguales de la imagen de origen y la imagen de destino.</p>
<p>Para su implementación se utilizará un WriteableBitmap. Los pixeles de un WriteableBitmap en Silverlight se representan como valores pargb lo que implica que el canal alpha, encargado de representar el nivel de opacidad, debe ir premultiplicado por lo que para representar un color rojo 50% transparente el pixel debería contener los valores [0.5,0.5,0,0]. De todas formas, para el caso que nos ocupa simplemente realizaremos la interpolación entre cada uno de los componentes de cada pixel de la imagen.</p>
<p>Si representamos cada pixel como un vector de cuatro componentes, siendo <strong>tr</strong> el vector que representa a un pixel de la transición, <strong>o</strong> a uno de la imagen de origen y <strong>d</strong> a uno de la imagen de destino el calculo de cada uno de los pixeles de la transición para un <em>t</em> dado se realiza mediante la siguiente expresión:</p>

$$ \vec{tr_{x,y}} = (1-t)\vec{o_{x,y}}+t\cdot\vec{d_{x,y}} $$

<p>siendo x,y las coordenadas del pixel.</p>
<p>El siguiente programa en Silverlight muestra el efecto de transición con dos imagenes predefinidas.</p>


<object width="600" height="500"
    data="data:application/x-silverlight-2," 
    type="application/x-silverlight-2" >
    <param name="source" value="{{ site.baseurl }}/files/2009-07-dissolve-effect.xap"/>
</object>

[Código fuente]({{ site.baseurl }}/files/2009-07-dissolve-transition-project.zip)
