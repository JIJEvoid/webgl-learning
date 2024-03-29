/**
 * Created by wanglei on 2019-07-29
 * todo 矩阵动画
 */

let vs =
    'attribute vec4 a_Position;\n' +
    'uniform mat4 u_xformMatrix;\n' +
    'void main(){\n' +
    ' gl_Position = u_xformMatrix * a_Position;\n' +
    '}\n';

let fs = 'void main(){gl_FragColor = vec4(1.0,0.0,0.0,1.0);}';

let canvas = document.getElementById('webgl')
var gl = canvas.getContext('webgl');
var angle = 90.0;
function main() {

    if (!initShaders(gl, vs, fs)) {
        console.log(`init shader faild`);
    }

    var n = initVertexBuffer(gl);

    var radian = Math.PI * angle / 180.0;//角度值转弧度制
    var cosB = Math.cos(radian), sinB = Math.sin(radian);

    //设置旋转矩阵
    var xformMatrix = new Float32Array([
        cosB, sinB, 0.0, 0.0,
        -sinB, cosB, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0,
    ]);

    var scalex = 1.0, scaley = 1.5, scalez = 1.0;

    // 设置缩放矩阵
    var xformMatrix = new Float32Array([
        scalex, 0.0, 0.0, 0.0,
        0.0, scaley, 0.0, 0.0,
        0.0, 0.0, scalez, 0.0,
        0.0, 0.0, 0.0, 1.0,
    ]);

    var u_xformMatrix = gl.getUniformLocation(gl.program, 'u_xformMatrix');

    gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix);

    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);

    render();
}

// 动画渲染
function render() {
    console.log(`render`);
    let gl = window.gl;

    var n = initVertexBuffer(gl);

    angle += 1;
    var radian = Math.PI * angle / 180.0;//角度值转弧度制
    var cosB = Math.cos(radian), sinB = Math.sin(radian);
    //设置旋转矩阵
    var xformMatrix = new Float32Array([
        cosB, sinB, 0.0, 0.0,
        -sinB, cosB, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0,
    ]);
    var scalex = 1.0, scaley = 1.5, scalez = 1.0;
    var u_xformMatrix = gl.getUniformLocation(gl.program, 'u_xformMatrix');
    gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
    window.requestAnimationFrame(render);
}

function initVertexBuffer() {
    let gl = window.gl;
    var vertices = new Float32Array([
        0.0, 0.25, -0.25, -0.25, 0.25, -0.25
    ]);
    var n = 3;
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    var a_position = gl.getAttribLocation(gl.program, 'a_Position');
    gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_position);
    return n;
}

main();

