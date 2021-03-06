/**
 * Created by jijevoid on 2019-07-30
 * todo 彩色的三角形
 */
var vs =
        'attribute vec4 a_Position;\n'+
        'attribute vec4 a_Color;\n'+
        'varying vec4 v_Color;\n'+
        'void main() {\n'+
        ' gl_Position = a_Position;\n'+
        'v_Color = a_Color;\n'+
        '}\n';
//es2。0 片元着色器  precision mediump float 声明浮点精度
var fs =
        'precision mediump float;\n varying vec4 v_Color;\n'+
        ' void main() {\n'+
        '  gl_FragColor = v_Color;\n'+
        ' }';

function main() {
    let canvas = document.getElementById('webgl');
    let gl = canvas.getContext('webgl');

    if (!initShaders(gl, vs, fs)) {
        console.log(`init shader faild`);
    }

    var n = initVertexBuffer(gl);
    gl.clearColor(0.0,0.0,0.0,1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES,0,n);

}

function initVertexBuffer(gl) {
    var verticesColors = new Float32Array([
        0.0, 0.5, 1.0, 0.0, 0.0,
        -0.5, -0.5, 0.0, 1.0, 0.0,
        0.5, -0.5, 0.0, 0.0, 1.0,
    ])

    var vertexColorBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER,vertexColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,verticesColors,gl.STATIC_DRAW);

    var FSIZE = verticesColors.BYTES_PER_ELEMENT;

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,FSIZE*5,0);
    gl.enableVertexAttribArray(a_Position);

    var a_Color = gl.getAttribLocation(gl.program,'a_Color');
    gl.vertexAttribPointer(a_Color,3,gl.FLOAT,false,FSIZE*5,FSIZE*2);
    gl.enableVertexAttribArray(a_Color);

    return 3;

}

main();