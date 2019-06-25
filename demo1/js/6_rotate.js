/**
 * Created by wanglei on 2019-06-25
 * todo 旋转
 */

var vs =
    'attribute vec4 a_Position;\n'+
    'uniform float u_CosB,u_SinB;\n'+
    'void mian(){\n'+
    'gl_Position.x = a_Position.x * u_CosB - a_Position.y * u_SinB;\n'+
    'gl_Position.y = a_Position.x * u_SinB + a_Position.y * u_CosB;\n'+
    'gl_Position.z = a_Position.z;\n'+
    'gl_Position.w = 1.0;\n'+
    '}\n';

var fs =
    'void main(){gl_FragColor = vec4(1.0,0.0,0.0,1.0);}';

var angle = 90.0;

function main() {
    var canvas = document.getElementById('webgl');
    var gl =canvas.getContext('webgl');


    if (initShaders(gl,vs, fs)) {
        console.log(`err shader log`);
    }

    var radian = Math.PI * angle;
    var cosB = Math.cos(radian)
    var sinB = Math.cos(radian)
    var u_cos = gl.getUniformLocation(gl.program,'u_CosB');
    var u_sin = gl.getUniformLocation(gl.program,'u_SinB');




    var n = initVertexBuffer(gl);

    gl.uniform1f(u_cos,cosB);
    gl.uniform1f(u_sin,sinB);

    gl.clearColor(1.0,1.0,1.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLE_STRIP,0,n);
}

function initVertexBuffer(gl) {
    var vertices = new Float32Array([
        -0.5,0.5,-0.5,-0.5,0.5,0.5,0.5,-0.5
    ])

    var n = 4;

    var vertexBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);

    gl.bufferData(gl.ARRAY_BUFFER,vertices, gl.STATIC_DRAW);

    var a_position = gl.getAttribLocation(gl.program,'a_Position');

    gl.vertexAttribPointer(a_position,2,gl.FLOAT,false,0,0);

    gl.enableVertexAttribArray(a_position);

    return n;

}

main();