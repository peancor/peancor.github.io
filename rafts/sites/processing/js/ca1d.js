/// <reference path="jquery-1.7.2.js"/>
/// <reference path="jquery-ui-1.8.19.custom.min.js"/>
/// <reference path="processing-1.3.6.js"/>

function sketchProc(processing) {

    function World(width, height, pixelSize) {
        this.width = width;
        this.height = height;
        this.pixelSize = pixelSize;

        this.moveDown = function () {
            //desplazamos todas las filas hacia abajo
            for (var i = this.height - 1; i > 0; i--) {
                this.screenBuffer[i] = this.screenBuffer[i - 1];
            }
            this.screenBuffer[0] = this.createRow();
        };
        this.createRow = function () {
            var row = new Array(this.width);
            for (var j = 0; j < this.width; j++) {
                row[j] = 0;
            }
            return row;
        };
        this.createWorld = function () {
            processing.background(0);
            this.screenBuffer = new Array();
            this.dirtyBuffer = new Array();
            for (var i = 0; i < this.height; i++) {
                this.screenBuffer[i] = this.createRow();
                this.dirtyBuffer[i] = this.createRow();
            }
        };

        this.draw = function () {
            for (var i = 0; i < this.height; i++) {
                var ry = i * this.pixelSize;
                for (var j = 0; j < this.width; j++) {
                    //solo actualizamos si no coincide el valor en pantalla con el deseado
                    if (this.screenBuffer[i][j] != this.dirtyBuffer[i][j]) {

                        this.dirtyBuffer[i][j] = this.screenBuffer[i][j];
                        if (this.screenBuffer[i][j] == 0) {
                            processing.fill(0, 0, 0);
                        } else {
                            processing.fill(255, 0, 0);
                        }
                        var rx = j * this.pixelSize;
                        processing.rect(rx, ry, this.pixelSize, this.pixelSize);
                    }
                }
            }
        }
        this.createWorld();
    };

    function CA(world, ruleNumber) {
        this.ruleNumber = ruleNumber;
        this.world = world;
        this.n = 0;
        this.isRunning = false;

        this.update = function () {

            if (this.isRunning == false || this.n == this.world.height - 1) {
                return;
            }
            this.n++;
            //obtenemos la fila superior
            var currentRow = world.screenBuffer[0];
            //Creamos una nueva fila
            var r = this.world.createRow();
            //Actualizamos
            for (var i = 0; i < this.world.width; i++) {
                //Obtenemos la configuración de la celda
                var cellConfigRight = (currentRow[((i + 1) % this.world.width)] != 0) ? 1 : 0;
                var cellConfigcenter = (currentRow[i] != 0) ? 1 : 0;
                var cellConfigLeft = (currentRow[((i - 1) % this.world.width)] != 0) ? 1 : 0;
                //corregimos la izquierda en el caso del 0
                if (i == 0) cellConfigLeft = currentRow[this.world.width - 1] != 0 ? 1 : 0;
                //
                //if (i == world.width - 1) cellConfigRight = 0;
                //if (i == 0) cellConfigLeft = 0;

                //
                var cellConfig = (cellConfigRight << 2) | (cellConfigcenter << 1) | cellConfigLeft;
                //obtenemos si la celda debe permanecer encendida según el número de bit
                if (this.ruleNumber != 0) {
                    r[i] = (1 << cellConfig) & this.ruleNumber;
                } else {
                    r[i] = 0;
                }
            }
            //actualizamos
            world.moveDown();
            world.screenBuffer[0] = r;
            world.draw();
        }

        this.run = function () {
            this.n = 0;
            this.isRunning = true;
            this.world.createWorld();
            this.world.screenBuffer[0][39] = 1;
            this.world.draw();
        }

        this.setRuleNumber = function (ruleNumber) {
            this.ruleNumber = ruleNumber;
            this.run();
        }

        this.run();
    }

    processing.setup = function () {
        var ww = myWorld.width * myWorld.pixelSize;
        var wh = myWorld.height * myWorld.pixelSize;
        processing.size(ww, wh);
        processing.frameRate(5);
        processing.background(0);
    }

    // Override draw function, by default it will be called 60 times per second
    processing.draw = function () {
        ca.update();
    };

    var myWorld = new World(80, 40, 5);
    var initialRule = 110;
    var ca = new CA(myWorld, initialRule);

    $("#slider").slider({
        range: "min",
        value: initialRule,
        min: 0,
        max: 255,
        slide: function (event, ui) {
            $("#ca").val(ui.value);
            var caNumber = parseInt(ui.value);
            ca.setRuleNumber(caNumber);
        }
    });
    $("#ca").val($("#slider").slider("value"));
}

$(function () {
    var canvas = document.getElementById("canvas1");
    // attaching the sketchProc function to the canvas
    var processingInstance = new Processing(canvas, sketchProc);
});