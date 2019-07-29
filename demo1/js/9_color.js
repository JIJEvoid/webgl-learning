/**
 * Created by jijevoid on 2019-07-29
 * todo 创建多个缓冲区
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
    var vertices = new Float32Array([
        0.0,0.5,-0.5,-0.5,0.5,-0.5
    ]);
    var n = 3;
    var sizes = new Float32Array([
        10.0 ,20.0, 30.0
    ]);
    var vertexBuffer = gl.createBuffer();
    var sizeBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);

    var a_Position = gl.getAttribLocation(gl.program,'a_Position');
    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);
    gl.enableVertexAttribArray(a_Position);


    gl.bindBuffer(gl.ARRAY_BUFFER,sizeBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,sizes, gl.STATIC_DRAW);
    var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
    gl.vertexAttribPointer(a_PointSize,1,gl.FLOAT,false,0,0);
    gl.enableVertexAttribArray(a_PointSize);

    return n;
}

mian();