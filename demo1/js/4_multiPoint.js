/**
 * Created by wanglei on 2019-06-24
 * todo 通过缓冲区对象向顶点写入多个对象
 */

var vs =
    'attribute vec4 a_Position;\n' +
    'void main(){\n' +
    ' gl_Position = a_Position;\n' +
    ' gl_PointSize = 10.0;\n' +
    '}\n';

var fs =
    "void main() {gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);}";

function main() {
    var canvas = document.getElementById('webgl');
    var gl = canvas.getContext('webgl');

    if (!initShaders(gl, vs, fs)) {
        console.log(`init err`);
    }
    var n = initVertexBuffer(gl);// 设置顶点位置；
    if (n < 0) {
        console.log(`n < 0.err`);
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, n);


}

function initVertexBuffer(gl) {
    var vertices = new Float32Array([
        0.0, 0.5, -0.5, -0.5, 0.5, -0.5
    ])
    var n = 3;

    // create 缓冲区对象
    var vertexBuffer = gl.createBuffer();

    //将缓冲区对象绑定到目标
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    // 向缓冲区对象中写入数据
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');

    // 将缓冲区对象分配给a_Position 变量
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    // 链接a_position变量与分配给他的缓冲区对象
    gl.enableVertexAttribArray(a_Position);

    return n;

}

main();