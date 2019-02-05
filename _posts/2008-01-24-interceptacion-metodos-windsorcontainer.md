---
layout: page
title: Interceptación de métodos con WindsorContainer
image:
  thumb: 07-11/2008-01-24-resultados-interceptacion.png
---

Una de las ventajas de utilizar un contenedor como <a href="http://www.castleproject.org/" target="_blank">Windsor container</a> es la capacidad que nos proporciona para interceptar llamadas a métodos.

Supongamos que tenemos un sistema que se dedica a esperar a la recepción de un mensaje y que está implementado por la clase Receiver.
<pre class="code"><span style="color: blue;">public class </span><span style="color: #2b91af;">Receiver</span>{
    <span style="color: blue;">public void </span>WaitMessages()
    {
        <span style="color: blue;">while </span>(<span style="color: blue;">true</span>)
        {
            <span style="color: #2b91af;">Console</span>.Write(<span style="color: #a31515;">"Escriba un mensaje: "</span>);
            <span style="color: blue;">string </span>message = <span style="color: #2b91af;">Console</span>.ReadLine();
            <span style="color: blue;">if </span>(message == <span style="color: #a31515;">"exit" </span>|| message == <span style="color: #a31515;">"quit"</span>)
                <span style="color: blue;">break</span>;
            OnMessageReceived(message);
        }
    }

    <span style="color: blue;">protected virtual void </span>OnMessageReceived(<span style="color: blue;">string </span>message)
    {
        <span style="color: #2b91af;">Console</span>.WriteLine(<span style="color: #a31515;">"Mensaje recibido: " </span>+ message);
    }
}</pre>
El receptor espera a que le llegue un mensaje y una vez recibido llama al método OnMessageReceived, que se encarga de procesar el mensaje y que típicamente podría generar un evento informando a otras partes del sistema de la recepción de un mensaje.

Ahora imaginemos que por razones de seguridad queremos supervisar los mensajes que lleguen y dar nuestra aprobación para que dichos mensajes se transmitan.

Una opción sería modificar la clase Receiver con la lógica necesaria para implementar el nuevo sistema de seguridad, sin embargo, dicha clase puede ser bastante compleja ya de por si y además, puede que deseemos reutilizar dicha clase en otras partes que no requieran tan estricto control de seguridad.

La interceptación de métodos nos proporciona una opción sin duda más conveniente para este caso. Generamos una clase, que llamaremos ParentalControlInterceptor la cual implementa el interface IInterceptor.
<pre class="code"><span style="color: blue;">public class </span><span style="color: #2b91af;">ParentalControlInterceptor</span>: <span style="color: #2b91af;">IInterceptor</span>{
    <span style="color: blue;">#region </span>IInterceptor Members

    <span style="color: blue;">public void </span>Intercept(<span style="color: #2b91af;">IInvocation </span>invocation)
    {
        <span style="color: blue;">if </span>(invocation.Method.Name == <span style="color: #a31515;">"OnMessageReceived"</span>)
        {
            <span style="color: #2b91af;">Console</span>.WriteLine(<span style="color: #a31515;">"Mensaje interceptado: " </span>+ invocation.Arguments[0].ToString());
            <span style="color: #2b91af;">Console</span>.Write(<span style="color: #a31515;">"¿Aprueba el envío de este mensage (s/n)?"</span>);
            <span style="color: blue;">string </span>response = <span style="color: #2b91af;">Console</span>.ReadLine();
            <span style="color: blue;">if </span>(response.ToUpper().StartsWith(<span style="color: #a31515;">"S"</span>))
                invocation.Proceed();
        }
    }

    <span style="color: blue;">#endregion</span>}</pre>
En dicha clase comprobamos si el nombre del método interceptado coincide con el que nos interesa, en este caso es OnMessageReceived, y en caso afirmativo preguntamos si se desea aprobar la retransmisión del mensaje. <strong>El método OnMessageReceived de nuestra instancia de Receiver solo será invocado en el caso de que se apruebe la retransmisión</strong>.

Por último, para que los métodos de nuestro receptor sean interceptados todo lo que tenemos que hacer es decorar la clase con el atributo Interceptor tal y como se muestra a continuación.
<pre class="code">[<span style="color: #2b91af;">Interceptor</span>(<span style="color: blue;">typeof</span>(<span style="color: #2b91af;">ParentalControlInterceptor</span>))]
<span style="color: blue;">public class </span><span style="color: #2b91af;">Receiver</span>{
    <span style="color: blue;">public void </span>WaitMessages()
    {
        <span style="color: blue;">while </span>(<span style="color: blue;">true</span>)
        {
            <span style="color: #2b91af;">Console</span>.Write(<span style="color: #a31515;">"Escriba un mensaje: "</span>);
            <span style="color: blue;">string </span>message = <span style="color: #2b91af;">Console</span>.ReadLine();
            <span style="color: blue;">if </span>(message == <span style="color: #a31515;">"exit" </span>|| message == <span style="color: #a31515;">"quit"</span>)
                <span style="color: blue;">break</span>;
            OnMessageReceived(message);
        }
    }

    <span style="color: blue;">protected virtual void </span>OnMessageReceived(<span style="color: blue;">string </span>message)
    {
        <span style="color: #2b91af;">Console</span>.WriteLine(<span style="color: #a31515;">"Mensaje recibido: " </span>+ message);
    }
}</pre>
Actualmente, para que la interceptación se produzca es un requisito que, o bien se registre el componente en el contenedor con un interface o bien que los métodos a interceptar sean marcados como virtuales.

En la siguiente figura se observan los resultados que produce la interceptación tanto en el caso de que un mensaje se apruebe como en el contrario.

<img src="{{ site.baseurl }}/images/07-11/2008-01-24-resultados-interceptacion.png" alt="Resultados de la interceptación" width="382" height="206" />