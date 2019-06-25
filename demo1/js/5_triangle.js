/**
 * Created by wanglei on 2019-06-24
 * todo 画多边形
 */

var vs =
    'attribute vec4 a_Position;\n'+
    'uniform vec4 u_translation;\n'+
    'void main(){\n'+
    ' gl_Position = a_Position + u_translation;\n'+
    '}\n';

    fs=
        'void main(){\n'+
        ' gl_FragColor = vec4(1.0,1.0,1.0,1.0);\n'+
        '}\n';

    var tx = 0.1,ty = 0.1,tz = 0.0;

    function main() {
        var canvas = document.getElementById('webgl');
        var gl = canvas.getContext('webgl');
        if(initShaders(gl, vs, fs)){

        }

        var n = initVertexBuffer(gl);

        var u_translation = gl.getUniformLocation(gl.program, 'u_translation');

        gl.uniform4f(u_translation,tx, ty, tz, 0.0);

        gl.clearColor(1.0,0.0,0.0,1.0);
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