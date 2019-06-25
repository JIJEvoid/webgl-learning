/**
 * Created by wanglei on 2019-06-21
 */

// 顶点着色器
var vs = "attribute vec4 a_Position;\n"+
         "attribute float a_Size;\n"+
         "void main(){\n"+
         "gl_Position = a_Position;\n"+
         "gl_PointSize = a_Size;\n"+
         "}";

// 片元着色器
var fs = "void main() {gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);}";

function main() {
    console.log(`webgl render`);

    var canvas = document.getElementById(`webgl`);
    var gl = canvas.getContext('webgl');

    if(!initShaders(gl,vs,fs)){
        console.log(`failed to load shader`);
        return;
    }

    var a_Position = gl.getAttribLocation(gl.program,'a_Position');
    var a_Size = gl.getAttribLocation(gl.program,'a_Size');

    if(a_Position < 0){
        console.log(`failed to get the storage location of a_Position`);
    }

    //对 顶点着色器进行赋值；
    gl.vertexAttrib3f(a_Position,0.25,0.250,0.0);
    gl.vertexAttrib1f(a_Size,30.0);

    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS,0,1);
}

main();

