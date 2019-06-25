/**
 * Created by wanglei on 2019-06-24
 */

var vs ='attribute vec4 a_Position;\n'+
        'void main(){\n'+
        ' gl_Position = a_Position;\n'+
        ' gl_PointSize = 10.0;\n'+
        '}\n';

var fs ='precision mediump float;\n' +
        'uniform vec4 u_FragColor;\n'+
    'void main(){ gl_FragColor = u_FragColor;}'
var gl;
function main(){
    var canvas = document.getElementById(`webgl`);
    gl = canvas.getContext('webgl');

    if(!initShaders(gl,vs,fs)){
        console.log(`not suppot webgl`);
    }

    var a_Position = gl.getAttribLocation(gl.program,'a_Position');
    var u_FragColor = gl.getUniformLocation(gl.program,'u_FragColor');
    canvas.onmousedown = (ev)=>{
        click(ev,gl,canvas,a_Position,u_FragColor);
    }

    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

}

var g_points = [];
function click(ev,gl,canvas,a_Position,u_FragColor) {
    var x = ev.clientX;
    var y = ev.clientY;
    var rect = ev.target.getBoundingClientRect();
    x= ((x-rect.left) - canvas.height/2)/(canvas.height/2);
    y = (canvas.width/2 - (y - rect.top))/(canvas.width/2);
    g_points.push(x)
    g_points.push(y)
    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    var len = g_points.length;
    for (var i=0;i<len;i+=2){
        gl.vertexAttrib3f(a_Position,g_points[i],g_points[i+1],0.0);
        gl.uniform4f(u_FragColor,Math.random(),Math.random(),Math.random(),1.0);
        gl.drawArrays(gl.POINTS,0,1);
    }

}
main();