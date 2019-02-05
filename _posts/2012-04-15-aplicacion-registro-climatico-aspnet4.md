---
layout: page
title: Aplicación de registro climático basada en ASP.NET MVC 4
---

En este artículo se describe una aplicación web basada en ASP.NET MVC 4 que obtiene datos de la<a title="Estación meteorológica digital usb con arduino" href="http://www.laciudadela.net/2012/04/14/estacion-meteorologica-digital-usb-con-arduino/"> estación meteorológica usb</a> descrita en el artículo anterior permitiendo su análisis. El resultado se muestra en la siguiente imagen:
<a href="{{ site.baseurl }}/images/12/grafico-registro-estación-climática.png"><img class="aligncenter size-full wp-image-266" title="gráfico registro estación climática usb" src="{{ site.baseurl }}/images/12/grafico-registro-estación-climática.png" alt="" width="823" height="621" /></a>

En primer lugar se modelan los datos. En este caso se ha definido una tabla con seis campos, el primero para la fecha de obtención de la medición y los cinco restantes para cada uno de los valores que retorna el sistema.

<a href="{{ site.baseurl }}/images/12/image.png"><img style="background-image: none; float: none; padding-top: 0px; padding-left: 0px; margin-left: auto; display: block; padding-right: 0px; margin-right: auto; border-width: 0px;" title="modelo de datos sensor estación meteorológica" src="{{ site.baseurl }}/images/12/image_thumb.png" alt="modelo de datos sensor estación meteorológica" width="166" height="221" border="0" /></a>

Necesitamos obtener datos de los sensores de forma periódica y para ello utilizaremos <a href="http://quartznet.sourceforge.net/" target="_blank">Quarz.net</a>. La instalación de Quartz.net se realiza utilizando Nuget desde el propio Visual Studio 11. Para representar gráficos instalaremos también <a href="http://dotnethighcharts.codeplex.com/" target="_blank">DotNet.HighCharts</a>.

```shell
Package Manager Console Host Version 1.7.30402.9028
Type 'get-help NuGet' to see all available NuGet commands.
PM&gt; Install-Package Quartz
Attempting to resolve dependency 'Common.Logging (≥ 2.0.0)'.
Successfully installed 'Common.Logging 2.0.0'.
Successfully installed 'Quartz 2.0.0'.
Successfully added 'Common.Logging 2.0.0' to MvcApplication1.
Successfully added 'Quartz 2.0.0' to MvcApplication1.
PM&gt; Install-Package DotNet.Highcharts
Successfully installed 'DotNet.Highcharts 1.2'.
Successfully added 'DotNet.Highcharts 1.2' to MvcApplication1.
```

A continuación en el fichero global.asax configuraremos una tarea periódica que se ejecute cada minuto con el objetivo de obtener datos de los sensores y almacenarlos en la base de datos.

```cs
void ScheduleReadSensor0()
{
    var schedFact = new StdSchedulerFactory();
    // get a scheduler
    IScheduler sched = schedFact.GetScheduler();
    sched.Start();
    // construct job info
    var schedule = SimpleScheduleBuilder.RepeatSecondlyForever(60);
    var trigger = TriggerBuilder.Create().StartNow().WithSchedule(schedule).Build();
    var job = new JobDetailImpl(&quot;Sensors&quot;, typeof(Jobs.ReadSensorsJob));
    sched.ScheduleJob(job, trigger);
}
```

La tarea simplemente obtiene datos del sensor y les almacena.

```cs
void ReadSensors()
{
    var portName = Properties.Settings.Default.Sensor0PortName;
    //Si el puerto serie existe leemos
    if (SerialPort.GetPortNames().Contains(portName))
    {
        using (SerialPort port = new SerialPort(portName, 9600))
        {
            port.ReadTimeout = 5000;
            port.DtrEnable = false;
            port.Open();
            port.Write(&quot;g&quot;);
            var line = port.ReadLine();
            var vals = (from v in line.Split(&quot;|&quot;.ToCharArray(), StringSplitOptions.RemoveEmptyEntries)
                        select XmlConvert.ToSingle(v)).ToArray();
            //Si todo ha ido bien almacenamos los datos
            Store(vals[0], vals[1], vals[2], vals[3], vals[4]);
        }
    }
}

void Store(Single t1, Single h, Single l, Single p, Single t2)
{
    //Almacenamos los datos en la base de datos
    using (var db= new SantuarioEntities())
    {
        var sr = new Sensor0Readings()
        {
            TimeStamp = DateTime.Now,
            Temperature1 = t1,
            Temperature2 = t2,
            Pressure = p,
            Humidity = h,
            Luminance = l
        };
        db.Sensor0Readings.AddObject(sr);
        db.SaveChanges();
    }
}
```

Por defecto los procesos ASP.NET se detienen pasados 20 minutos de inactividad por lo que un primer paso para que el registro se produzca de manera continua es aumentar ese límite. Para ello en la configuración de IIS, dentro de la configuración avanzada del grupo de aplicaciones establecemos el valor a 0, que significa indefinido.

<a href="{{ site.baseurl }}/images/12/aumentar-tiempo-keep-alive-in-asp.net_.png"><img class="aligncenter size-full wp-image-273" title="aumentar tiempo keep-alive in asp.net" src="{{ site.baseurl }}/images/12/aumentar-tiempo-keep-alive-in-asp.net_.png" alt="" width="526" height="174" /></a>

Aun así, por diversas razones el proceso se podría detener por lo que es recomendable configurar una tarea periódica que solicite una página al servidor provocando su arranque en caso de que esté detenido.

Ya solo queda implementar un controlador y una vista de ASP.NET MVC que se encargue de obtener los datos y representarles.

Se ha implementado una acción de controlador cuya lógica se divide en obtener los datos y generar un gráfico a partir de ellos.

La parte de obtención de los datos:

```cs
//span define el tamaño en minutos de cada intervalo
//nSpan el número de intervalos a representar
if (endTime == null)
    endTime = DateTime.Now;

var lastMeasure = (from m in db.Sensor0Readings
                    where m.TimeStamp &lt;= endTime.Value
                    orderby m.TimeStamp descending
                    select m).FirstOrDefault();
//Si no hay medidas o la medida es muy vieja
if (lastMeasure == null || (endTime.Value - lastMeasure.TimeStamp) &gt; TimeSpan.FromMinutes(60))
{
    ViewBag.Temperature = &quot;Desconocida&quot;;
}
else
{
    ViewBag.ElapsedMinutes = (endTime.Value - lastMeasure.TimeStamp).TotalMinutes.ToString(&quot;F0&quot;);
    ViewBag.Temperature = string.Format(&quot;{0:F1} ºC&quot;, lastMeasure.Temperature1);
    ViewBag.Humidity = string.Format(&quot;{0:F1} %&quot;, lastMeasure.Humidity);
    ViewBag.Pressure = string.Format(&quot;{0:F1} mb&quot;, lastMeasure.Pressure);
}
//Obtenemos datos de los ultimos n mins
List&lt;DateTime&gt; limitPoints = new List&lt;DateTime&gt;();
List&lt;DateTime&gt; intervals = new List&lt;DateTime&gt;();
List&lt;object&gt; pressures = new List&lt;object&gt;();
List&lt;object&gt; temperatures = new List&lt;object&gt;();
List&lt;object&gt; humidities = new List&lt;object&gt;();
//Establecemos los puntos limite
for (int i = 0; i &lt; nSpan + 1; i++)
{
    limitPoints.Add(endTime.Value - TimeSpan.FromMinutes(i * span));
}
//Obtenemos los datos para los intervalos
for (int i = 0; i &lt; nSpan; i++)
{
    var upperLimit = limitPoints[i];
    var lowerLimit = limitPoints[i + 1];
    var measurements = (from m in db.Sensor0Readings
                        where m.TimeStamp &lt; upperLimit
                        where m.TimeStamp &gt;= lowerLimit
                        select m).ToArray();
    double pAverage = 0;
    double tAverage = 0;
    double hAverage = 0;
    if (measurements.Length &gt; 0)
    {
        pAverage = (from p in measurements
                    select p.Pressure).Average();
        tAverage = (from p in measurements
                    select p.Temperature1).Average();

        hAverage = (from p in measurements
                    select p.Humidity).Average();
    }
    var intervalLabel = limitPoints[i] - TimeSpan.FromMinutes(0.5 * span);
    intervals.Add(intervalLabel);
    pressures.Add(pAverage);
    temperatures.Add(tAverage);
    humidities.Add(hAverage);
}
intervals.Reverse();
pressures.Reverse();
temperatures.Reverse();
humidities.Reverse();

```

Y el código de la parte de generación del gráfico:

```cs
Highcharts chart = new Highcharts(&quot;chart&quot;)
    .InitChart(new Chart { ZoomType = ZoomTypes.Xy })
    .SetTitle(new Title { Text = &quot;Registro climático&quot; })
    .SetSubtitle(new Subtitle { Text = &quot;citadel labs&quot; })
    .SetXAxis(new XAxis
    {
        Type = AxisTypes.Datetime,
    })
    .SetYAxis(new[]
                            {
                                new YAxis
                                {
                                    Labels = new YAxisLabels
                                            {
                                                Formatter = &quot;function() { return this.value +'°C'; }&quot;,
                                                Style = &quot;color: '#89A54E'&quot;
                                            },
                                    Title = new XAxisTitle
                                            {
                                                Text = &quot;Temperatura&quot;,
                                                Style = &quot;color: '#89A54E'&quot;
                                            },
                                    Opposite = true,
                                },
                                new YAxis
                                {
                                    Labels = new YAxisLabels
                                            {
                                                Formatter = &quot;function() { return this.value +' %'; }&quot;,
                                                Style = &quot;color: '#4572A7'&quot;
                                            },
                                    Title = new XAxisTitle { Text = &quot;Humedad relativa&quot;, Style = &quot;color: '#4572A7'&quot; },
                                    GridLineWidth = 0
                                },
                                new YAxis
                                {
                                    Labels = new YAxisLabels
                                            {
                                                Formatter = &quot;function() { return this.value +' mb'; }&quot;,
                                                Style = &quot;color: '#AA4643'&quot;
                                            },
                                    Title = new XAxisTitle
                                            {
                                                Text = &quot;Presión&quot;,
                                                Style = &quot;color: '#AA4643'&quot;
                                            },
                                    GridLineWidth = 0,
                                    Opposite = true
                                }
                            })
    .SetTooltip(new Tooltip { Formatter = &quot;TooltipFormatter&quot; })
    .AddJavascripFunction(&quot;TooltipFormatter&quot;,
                            @&quot;var unit = {
                    'Humedad relativa': '%',
                    'Temperatura': '°C',
                    'Presión': 'mb'
                    }[this.series.name];
                    var xDate = new Date(this.x);
                return ''+
                    xDate+': '+ this.y.toFixed(2) +' '+ unit;&quot;)
    .SetPlotOptions(new PlotOptions
    {
        Spline = new PlotOptionsSpline
        {
            Marker = new PlotOptionsLineMarker { Enabled = false },
            LineWidth = 3,
            DashStyle = DashStyles.ShortDot,
            PointInterval = 3600000,
            PointStart = new PointStart(intervals[0])
        },
        Column = new PlotOptionsColumn
        {
            PointInterval = 3600000,
            PointStart = new PointStart(intervals[0])
        }
    })
    .SetSeries(new[]
                            {
                                new Series
                                {
                                    Name = &quot;Humedad relativa&quot;,
                                    Color = ColorTranslator.FromHtml(&quot;#804572A7&quot;),
                                    Type = ChartTypes.Column,
                                    YAxis = 1,
                                    Data = new Data(humidities.ToArray())
                                },
                                new Series
                                {
                                    Name = &quot;Presión&quot;,
                                    Color = ColorTranslator.FromHtml(&quot;#AA4643&quot;),
                                    Type = ChartTypes.Spline,
                                    YAxis = 2,
                                    Data = new Data(pressures.ToArray()),
                                },
                                new Series
                                {
                                    Name = &quot;Temperatura&quot;,
                                    Color = ColorTranslator.FromHtml(&quot;#89A54E&quot;),
                                    Type = ChartTypes.Spline,
                                    PlotOptionsSpline = new PlotOptionsSpline
                                        {
                                            Marker = new PlotOptionsLineMarker { Enabled = false },
                                            LineWidth = 3,
                                            DashStyle = DashStyles.Solid,
                                            PointInterval = 3600000,
                                            PointStart = new PointStart(intervals[0])
                                        },
                                    Data = new Data(temperatures.ToArray())
                                }
                            });
```

Por último, la vista quedaría:

```html
@{
    ViewBag.Title = &quot;Sensor0&quot;;
}

@model DotNet.Highcharts.Highcharts&lt;/pre&gt;
&lt;h2&gt;Estado (Actualizado hace @ViewBag.ElapsedMinutes minutos)&lt;/h2&gt;
&lt;dl&gt;&lt;dt&gt;Temperatura actual:&lt;/dt&gt;&lt;dd&gt;@ViewBag.Temperature&lt;/dd&gt;&lt;dt&gt;Humedad:&lt;/dt&gt;&lt;dd&gt;@ViewBag.Humidity&lt;/dd&gt;&lt;dt&gt;Presión atmosférica:&lt;/dt&gt;&lt;dd&gt;@ViewBag.Pressure&lt;/dd&gt;&lt;/dl&gt;
&lt;pre&gt;
@Model
```