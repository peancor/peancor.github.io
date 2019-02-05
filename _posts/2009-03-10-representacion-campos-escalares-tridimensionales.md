---
layout: page
title: Representación de campos escalares tridimensionales
image:
  thumb: 07-11/2009-03-volume-rendering-skull.jpg
---

La representación volumétrica es una técnica que permite la representación de campos escalares tridimensionales. Sus aplicaciones son múltiples: representación de imágenes del cuerpo humano procedentes de diversos instrumentos sensores con fines médicos, representación realista de nubes u otros fenómenos gaseosos en simulaciones visuales en entornos virtuales, o representación de diversas estructuras y constructos en la ciencia y la ingeniería.

En este artículo se describirá una variante de la técnica basada en texturas conocida como ‘volume ray casting’. Conceptualmente dicha técnica consiste en el lanzamiento de rayos con origen en la cámara de tal forma que atraviesen el volumen que contiene el campo escalar. El color resultante que se ‘pintará’ en la superficie del volumen en el punto de entrada de cada rayo será una función de los puntos que el rayo atravesó al pasar por el volumen.

Para su implementación se utilizará la plataforma XNA y se hará uso de la aceleración grafica que nos proporcionan la GPU. Será necesaria una tarjeta que soporte al menos la versión 3.0 del modelo de sombreadores (<em>Shader Model 3.0</em>).

El proceso comienza con la representación de un volumen que actuará como frontera del campo escalar, es decir, el campo escalar se encontrará completamente en el interior de ese volumen. Utilizaremos un cubo.

En primer lugar representaremos las posiciones de entrada del rayo y de salida en dos texturas que posteriormente utilizaremos para determinar la dirección. Al <em>Vertex Shader</em> en la GPU se le harán llegar las posiciones sin transformar de los vértices del cubo. Dichas coordenadas se copiaran a la variable <em>InterpolatedPosition</em> a la salida del <em>Vertex Shader</em>. Dicha variable está marcada como coordenadas de textura por lo que a la entrada del pixel shader se recibiran las coordenadas interpoladas. Lo mismo se hará para la variable <em>InterpolatedTransformedPosition</em> solo que en este caso almacenaremos las coordenadas transformadas por la combinación de las matrices de posicionamiento en el mundo (world), vista (view) y proyección (projection) que serán suministradas a la entrada del programa de la GPU como parámetros. Esta última variable será utilizada posteriormente para localizar la posición exacta donde se deben muestrear las texturas para obtener la dirección del rayo.
<div style="font-size: 8pt; background: white; color: black; font-family: consolas;">
<p style="margin: 0px;"><span style="color: #2b91af;">    1</span> <span style="color: blue;">struct</span> VertexShaderInput</p>
<p style="margin: 0px;"><span style="color: #2b91af;">    2</span> {</p>
<p style="margin: 0px;"><span style="color: #2b91af;">    3</span>     <span style="color: blue;">float4</span> Position : <span style="color: navy;">POSITION0</span>;</p>
<p style="margin: 0px;"><span style="color: #2b91af;">    4</span> };</p>
<p style="margin: 0px;"><span style="color: #2b91af;">    5</span></p>
<p style="margin: 0px;"><span style="color: #2b91af;">    6</span> <span style="color: blue;">struct</span> VertexShaderOutput</p>
<p style="margin: 0px;"><span style="color: #2b91af;">    7</span> {</p>
<p style="margin: 0px;"><span style="color: #2b91af;">    8</span>     <span style="color: blue;">float4</span> Position : <span style="color: navy;">POSITION0</span>;</p>
<p style="margin: 0px;"><span style="color: #2b91af;">    9</span>     <span style="color: blue;">float4</span> InterpolatedPosition : <span style="color: navy;">TEXCOORD0</span>;</p>
<p style="margin: 0px;"><span style="color: #2b91af;">   10</span>     <span style="color: blue;">float4</span> InterpolatedTransformedPosition : <span style="color: navy;">TEXCOORD1</span>;</p>
<p style="margin: 0px;"><span style="color: #2b91af;">   11</span> };</p>
<p style="margin: 0px;"><span style="color: #2b91af;">   12</span></p>
<p style="margin: 0px;"><span style="color: #2b91af;">   13</span> VertexShaderOutput VertexShaderFunction(VertexShaderInput input)</p>
<p style="margin: 0px;"><span style="color: #2b91af;">   14</span> {</p>
<p style="margin: 0px;"><span style="color: #2b91af;">   15</span>     VertexShaderOutput output;</p>
<p style="margin: 0px;"><span style="color: #2b91af;">   16</span></p>
<p style="margin: 0px;"><span style="color: #2b91af;">   17</span>     <span style="color: blue;">float4</span> worldPosition = <span style="color: blue;">mul</span>(input.Position, World);</p>
<p style="margin: 0px;"><span style="color: #2b91af;">   18</span>     <span style="color: blue;">float4</span> viewPosition = <span style="color: blue;">mul</span>(worldPosition, View);</p>
<p style="margin: 0px;"><span style="color: #2b91af;">   19</span>     output.Position = <span style="color: blue;">mul</span>(viewPosition, Projection);</p>
<p style="margin: 0px;"><span style="color: #2b91af;">   20</span>     output.InterpolatedPosition = input.Position;</p>
<p style="margin: 0px;"><span style="color: #2b91af;">   21</span>     output.InterpolatedTransformedPosition = output.Position;</p>
<p style="margin: 0px;"><span style="color: #2b91af;">   22</span>     <span style="color: blue;">return</span> output;</p>
<p style="margin: 0px;"><span style="color: #2b91af;">   23</span> }</p>
<p style="margin: 0px;"><span style="color: #2b91af;">   24</span></p>
<p style="margin: 0px;"><span style="color: #2b91af;">   25</span> <span style="color: blue;">float4</span> RenderPositionsPixelShaderFunction(VertexShaderOutput input) : <span style="color: navy;">COLOR0</span></p>
<p style="margin: 0px;"><span style="color: #2b91af;">   26</span> {</p>
<p style="margin: 0px;"><span style="color: #2b91af;">   27</span>     <span style="color: blue;">float4</span> color = input.InterpolatedPosition;</p>
<p style="margin: 0px;"><span style="color: #2b91af;">   28</span>     <span style="color: blue;">return</span> color;</p>
<p style="margin: 0px;"><span style="color: #2b91af;">   29</span> }</p>

</div>
Se representarán las caras frontales del cubo en una textura utilizando el estado de representación <em>CullMode.CounterClockWise</em>. El color asignado a la textura en realidad contiene las coordenadas tridimensionades del cubo en el espacio de coordenadas local del modelo en el formato (x,y,z,1).

<img src="{{ site.baseurl }}/images/07-11/2009-03-volume-rendering-front-texture.jpg" alt="" />

A continuación se repite la operación pero esta vez representando las caras interiores del cubo.

<img src="{{ site.baseurl }}/images/07-11/2009-03-volume-rendering-back-texture.jpg" alt="" />

El siguiente y ultimo paso es la representación del cubo, solo que en esta ocasión el color resultante será función del campo escalar, muestreado en base a las direcciones grabadas en las texturas anteriores. Al muestrear cada una de las texturas anteriores podemos obtener para cada punto (x,y) de la textura, las coordenadas (x,y,z) del cubo por las cuales entró el rayo y por las cuales salió. Con estas dos coordenadas se puede calcular la dirección del rayo y al conocer el punto inicial y la dirección del rayo que atraviesa el campo escalar se puede recorrer cada uno de los puntos de ese campo para calcular su contribución al color de la superficie del cubo. Este proceso se realiza en el <em>Pixel Shader</em> que representará el resultado final en pantalla.

<img src="{{ site.baseurl }}/images/07-11/2009-03-volume-rendering-skull.jpg" alt="" />
<div style="font-size: 8pt; background: white; color: black; font-family: consolas;">
<p style="margin: 0px;"><span style="color: #2b91af;">    1</span> <span style="color: blue;">float4</span> RenderVolumePixelShaderFunction(VertexShaderOutput input) : <span style="color: navy;">COLOR0</span></p>
<p style="margin: 0px;"><span style="color: #2b91af;">    2</span> {</p>
<p style="margin: 0px;"><span style="color: #2b91af;">    3</span>     <span style="color: green;">//Calculamos que puntos de las texturas debemos muestrear</span></p>
<p style="margin: 0px;"><span style="color: #2b91af;">    4</span>     <span style="color: blue;">float2</span> texC = input.InterpolatedTransformedPosition.xy /= input.InterpolatedTransformedPosition.w;</p>
<p style="margin: 0px;"><span style="color: #2b91af;">    5</span>     <span style="color: green;">//lo llevamos al rango [0,1] espacio de coordenadas de textura desde espacio de proyeccion 2D</span></p>
<p style="margin: 0px;"><span style="color: #2b91af;">    6</span>     texC.x =  0.5f*texC.x + 0.5f;</p>
<p style="margin: 0px;"><span style="color: #2b91af;">    7</span>     texC.y = -0.5f*texC.y + 0.5f;</p>
<p style="margin: 0px;"><span style="color: #2b91af;">    8</span>     <span style="color: green;">//Muestreamos las texturas de posiciones iniciales y finales</span></p>
<p style="margin: 0px;"><span style="color: #2b91af;">    9</span>     <span style="color: blue;">float3</span> frontPos = <span style="color: blue;">tex2D</span>(FrontTextureSampler, texC);</p>
<p style="margin: 0px;"><span style="color: #2b91af;">   10</span>     <span style="color: blue;">float3</span> backPos = <span style="color: blue;">tex2D</span>(BackTextureSampler, texC);</p>
<p style="margin: 0px;"><span style="color: #2b91af;">   11</span>     <span style="color: green;">//Calculamos el punto inicial y la direccion</span></p>
<p style="margin: 0px;"><span style="color: #2b91af;">   12</span>     <span style="color: blue;">float4</span> currentPosition = <span style="color: blue;">float4</span>(frontPos,0);</p>
<p style="margin: 0px;"><span style="color: #2b91af;">   13</span>     <span style="color: blue;">float3</span> direction = <span style="color: blue;">normalize</span>(backPos - frontPos);</p>
<p style="margin: 0px;"><span style="color: #2b91af;">   14</span>     <span style="color: green;">//Inicializamos las variables del color</span></p>
<p style="margin: 0px;"><span style="color: #2b91af;">   15</span>     <span style="color: blue;">float4</span> color = <span style="color: blue;">float4</span>(0, 0, 0, 0);</p>
<p style="margin: 0px;"><span style="color: #2b91af;">   16</span>     <span style="color: blue;">float4</span> src = 0;</p>
<p style="margin: 0px;"><span style="color: #2b91af;">   17</span>     <span style="color: blue;">float</span> value = 0;</p>
<p style="margin: 0px;"><span style="color: #2b91af;">   18</span>     <span style="color: green;">//Recorremos el campo escalar en la dirección calculada</span></p>
<p style="margin: 0px;"><span style="color: #2b91af;">   19</span>     <span style="color: green;">//acumulando opacidad en función del campo</span></p>
<p style="margin: 0px;"><span style="color: #2b91af;">   20</span>     <span style="color: blue;">float3</span> Step = direction * (1.0f/256.0f);</p>
<p style="margin: 0px;"><span style="color: #2b91af;">   21</span>     <span style="color: blue;">for</span>(<span style="color: blue;">int</span> i = 0; i &lt; 256; i++)</p>
<p style="margin: 0px;"><span style="color: #2b91af;">   22</span>     {</p>
<p style="margin: 0px;"><span style="color: #2b91af;">   23</span>         <span style="color: green;">//muestreamos la textura        </span></p>
<p style="margin: 0px;"><span style="color: #2b91af;">   24</span>         value = <span style="color: blue;">tex3Dlod</span>(VolumeTextureSampler, currentPosition).r;</p>
<p style="margin: 0px;"><span style="color: #2b91af;">   25</span>         src = (<span style="color: blue;">float4</span>)value;</p>
<p style="margin: 0px;"><span style="color: #2b91af;">   26</span>         <span style="color: green;">//Front to back blending</span></p>
<p style="margin: 0px;"><span style="color: #2b91af;">   27</span>         src.rgb *= src.a;</p>
<p style="margin: 0px;"><span style="color: #2b91af;">   28</span>         color = (1.0f - color.a)*src + color;</p>
<p style="margin: 0px;"><span style="color: #2b91af;">   29</span>         <span style="color: green;">//advance the current position</span></p>
<p style="margin: 0px;"><span style="color: #2b91af;">   30</span>         currentPosition.xyz += Step;</p>
<p style="margin: 0px;"><span style="color: #2b91af;">   31</span>     }</p>
<p style="margin: 0px;"><span style="color: #2b91af;">   32</span>     <span style="color: blue;">return</span> color;</p>
<p style="margin: 0px;"><span style="color: #2b91af;">   33</span> }</p>

</div>
El rendimiento de esta técnica al ser completamente acelerada por GPU es muy bueno como se puede constatar en los siguientes videos obtenidos con una tarjeta gráfica de gama media/baja con un consumo de CPU mínimo.

<div class="flex-video">
  <iframe id="ytplayer" type="text/html" width="640" height="360"
    src="https://youtube.com/embed/aRkn8erVXa4"
    frameborder="0"></iframe>
</div>

<div class="flex-video">
  <iframe id="ytplayer" type="text/html" width="640" height="360"
    src="https://youtube.com/embed/_O-2TevZqpM"
    frameborder="0"></iframe>
</div>

<h4></h4>
<h6>Basado en un artículo original de <a href="http://graphicsrunner.blogspot.com/2009/01/volume-rendering-101.html" target="_blank">Graphic Runner</a>.</h6>
<h6>Campos escalares obtenidos de <a href="http://www.gris.uni-tuebingen.de/edu/areas/scivis/volren/datasets/datasets.html" target="_blank">vorbis</a>.</h6>
<h6>Bibliografía: GPU - Based Interactive Visualization Techniques - D. Weiskopf</h6>