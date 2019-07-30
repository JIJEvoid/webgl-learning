/**
 * Created by jijevoid on 2019-07-30
 * todo 多组数据写入同一组缓冲区
 */

let vs =
    'attribute vec4 a_Position;\n'+
    'attribute float a_PointSize;\n'+
    'void main(){\n'+
    ' gl_Position = a_Position;\n'+
    ' gl_PointSize = a_PointSize;\n'+
    '}\n';

let fs = 'void main(){gl_FragColor = vec4(1.0,0.0,0.0,1.0);}';

function mian() {
    let canvas = document.getElementById('webgl')
    let gl = canvas.getContext('webgl');
    if (!initShaders(gl, vs, fs)) {
        console.log(`init shader faild`);
    }
    var n = initVertexBuffer(gl);
    console.log(n);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS,0,n);
}

function initVertexBuffer(gl) {
    var verticesSizes = new Float32Array([
        0.0,0.5,10.0,//第一个点
        -0.5,-0.5,20.0,//第2个点
        0.5,-0.5,30.0//第三个点
    ])
    // var n = 3;
    // var vertexSizeBuffer = gl.createBuffer();
    //
    // gl.bindBuffer(gl.ARRAY_BUFFER,vertexSizeBuffer);
    // gl.bufferData(gl.ARRAY_BUFFER,verticesSizes,gl.STATIC_DRAW);
    // var FSIZE = vertexSizeBuffer.BYTES_PER_ELEMENT;
    //
    // var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    // gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,FSIZE*3,0);
    // gl.enableVertexAttribArray(a_Position);
    //
    // var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
    // gl.vertexAttribPointer(a_PointSize,1,gl.FLOAT,false,FSIZE*3,FSIZE*2);
    // gl.enableVertexAttribArray(a_PointSize);

    var n = 3;
    var vertexSizeBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexSizeBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,verticesSizes,gl.STATIC_DRAW);
    var FSIZE = verticesSizes.BYTES_PER_ELEMENT;

    var a_Position = gl.getAttribLocation(gl.program,'a_Position');
    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,FSIZE*3,0);
    gl.enableVertexAttribArray(a_Position);

    var a_PointSize = gl.getAttribLocation(gl.program,'a_PointSize');
    gl.vertexAttribPointer(a_PointSize,1,gl.FLOAT,false,FSIZE*3,FSIZE*2);
    gl.enableVertexAttribArray(a_PointSize);

    return n;
}

mian();