"use strict";

var gl;

var theta = 0.0;
var thetaLoc;

var speed = 100;
var direction = true;

window.onload = function init()
{
    var canvas = document.getElementById("gl-canvas");

    gl = canvas.getContext('webgl2');

    if (!gl) alert("WebGL 2.0 isn't available");

    //
    //  Configure WebGL
    //
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    //  Load shaders and initialize attribute buffers

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram( program );

    var ferrisWheel = [];
    var vert1 = [];
    var vert2 = [];
    var vert3 = [];
    var vert4 = [];
    var vert5 = [];
    var vert6 = [];
    var vert7 = [];
    var vert8 = [];


    for(var i =0;i<=360;i+=1){
      var j = i * Math.PI / 180;
      ferrisWheel[i] = vec2(.75*Math.sin(j),.75*Math.cos(j));
    }

    for(var i =0;i<=360;i+=1){
      var j = i * Math.PI / 180;
      vert1[i] = vec2(.2*Math.sin(j)+.75,.2*Math.cos(j));
    }

    for(var i =0;i<=360;i+=1){
      var j = i * Math.PI / 180;
      vert2[i] = vec2(.2*Math.sin(j)+-.75,.2*Math.cos(j));
    }

    for(var i =0;i<=360;i+=1){
      var j = i * Math.PI / 180;
      vert3[i] = vec2(.2*Math.sin(j),.2*Math.cos(j)+.75);
    }

    for(var i =0;i<=360;i+=1){
      var j = i * Math.PI / 180;
      vert4[i] = vec2(.2*Math.sin(j),.2*Math.cos(j)+-.75);
    }

    for(var i =0;i<=360;i+=1){
      var j = i * Math.PI / 180;
      vert5[i] = vec2(.2*Math.sin(j)+.75*Math.sin(45 * Math.PI / 180),.2*Math.cos(j)+.75*Math.cos(45 * Math.PI / 180));
    }

    for(var i =0;i<=360;i+=1){
      var j = i * Math.PI / 180;
      vert6[i] = vec2(.2*Math.sin(j)+(.75*Math.sin(135 * Math.PI / 180)),.2*Math.cos(j)+(.75*Math.cos(135 * Math.PI / 180)));
    }

    for(var i =0;i<=360;i+=1){
      var j = i * Math.PI / 180;
      vert7[i] = vec2(.2*Math.sin(j)+(.75*Math.sin(315 * Math.PI / 180)),.2*Math.cos(j)+(.75*Math.cos(315 * Math.PI / 180)));
    }

    for(var i =0;i<=360;i+=1){
      var j = i * Math.PI / 180;
      vert8[i] = vec2(.2*Math.sin(j)+(.75*Math.sin(225 * Math.PI / 180)),.2*Math.cos(j)+(.75*Math.cos(225 * Math.PI / 180)));
    }

    

    var vertices = [
      vec2(0,.75),
      vec2(0,-.75),
      vec2(-.75,0),
      vec2(.75,0)
  ];
  var spokes = [
    vec2(.75*Math.sin(45 * Math.PI / 180),.75*Math.cos(45 * Math.PI / 180)),
    vec2(.75*Math.sin(225 * Math.PI / 180),.75*Math.cos(225 * Math.PI / 180)),
    vec2(.75*Math.sin(135 * Math.PI / 180),.75*Math.cos(135 * Math.PI / 180)),
    vec2(.75*Math.sin(315 * Math.PI / 180),.75*Math.cos(315 * Math.PI / 180))
  ];
    vertices = vertices.concat(ferrisWheel);
    vertices = vertices.concat(vert1);
    vertices = vertices.concat(vert2);
    vertices = vertices.concat(vert3);
    vertices = vertices.concat(vert4);
    vertices = vertices.concat(spokes);
    vertices = vertices.concat(vert5);
    vertices = vertices.concat(vert6);
    vertices = vertices.concat(vert7);
    vertices = vertices.concat(vert8);



    // Load the data into the GPU

    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer

    var positionLoc = gl.getAttribLocation( program, "aPosition" );
    gl.vertexAttribPointer( positionLoc, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray(positionLoc);

    thetaLoc = gl.getUniformLocation(program, "uTheta");

    // Initialize event handlers

    document.getElementById("slider").onchange = function(event) {
        speed = 100 - event.target.value;
    };
    document.getElementById("Direction").onclick = function (event) {
        direction = !direction;
    };

    document.getElementById("Controls").onclick = function( event) {
        switch(event.target.index) {
          case 0:
            direction = !direction;
            break;

         case 1:
            speed /= 2.0;
            break;

         case 2:
            speed *= 2.0;
            break;
       }
    };

    window.onkeydown = function(event) {
        var key = String.fromCharCode(event.keyCode);
        switch( key ) {
          case '1':
            direction = !direction;
            break;

          case '2':
            speed /= 2.0;
            break;

          case '3':
            speed *= 2.0;
            break;
        }
    };


    render();
};

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT );

    theta += (direction ? 0.1 : -0.1);
    gl.uniform1f(thetaLoc, theta);

    gl.drawArrays(gl.LINES, 0, 2);
    gl.drawArrays(gl.LINES, 2, 2);
    gl.drawArrays(gl.LINE_LOOP, 4, 360);
    gl.drawArrays(gl.LINE_LOOP, 365, 360);
    gl.drawArrays(gl.LINE_LOOP, 726, 360);
    gl.drawArrays(gl.LINE_LOOP, 1087, 360);
    gl.drawArrays(gl.LINE_LOOP, 1448, 360);
    gl.drawArrays(gl.LINES, 1809, 4);
    gl.drawArrays(gl.LINE_LOOP, 1814, 360);
    gl.drawArrays(gl.LINE_LOOP, 2175, 360);
    gl.drawArrays(gl.LINE_LOOP, 2536, 360);
    gl.drawArrays(gl.LINE_LOOP, 2897, 360);


    setTimeout(
        function () {requestAnimationFrame(render);},
        speed
    );
}
