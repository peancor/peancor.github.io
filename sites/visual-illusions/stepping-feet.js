/// <reference path="jquery-1.3.2-vsdoc2.js" />
var elapsed = 0;
var top = 84;
var left = 146;
var timerInterval = 25;
var borderPeriod = 5;
var borderElapsed = 0;
$(document).ready(function() {
    setInterval(function() {
        elapsed += 0.001 * timerInterval;
        borderElapsed += 0.001 * timerInterval;
        //
        //franjas
        if (borderElapsed > borderPeriod) {
            borderElapsed = 0;
            if ($('#grid').is(':visible')) {
                $('#grid').hide();
            } else {
                $('#grid').show();
            }
        }        
        //        
        var newLeft = left + 140 * Math.cos(2 * Math.PI * 0.125 * elapsed);
        $("#yellowSprite").css("left", newLeft);
        $("#blueSprite").css("left", newLeft);
    }, timerInterval);
}); 