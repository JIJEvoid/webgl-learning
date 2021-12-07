/**
 * Created by jijevoid on 2019-08-05
 * todo webgl 纹理映射
 */
let vs = 'attribute vec4 a_Position;\n'+
        'attribute vec2 a_TexCoord;\n'+
        'varying vec2 v_TexCoord;\n'+
        'void main(){\n'+
        ' v_TexCoord= a_TexCoord;\n'+
        ' gl_Position = a_Position;\n'+
        '}\n';

let fs = 'precision mediump float;\n uniform sampler2D u_Sampler;\n'+
        'varying vec2 v_TexCoord;\n'+
        'void main(){\n' +
        'vec4 color = texture2D(u_Sampler,v_TexCoord);\n'+
        'gl_FragColor = vec4(color.rgb,1.);\n'+
        '}\n';

function main() {
    let canvas = document.getElementById('webgl');
    let gl = canvas.getContext('webgl');

    initShaders(gl, vs, fs);

    var n = initVertexBuffer(gl);

    if (initTextures(gl,n)){

    }
}

function initVertexBuffer(gl) {
    //指定图片位置
    var verticesTexCoords = new Float32Array([
        -1.0,1.0,0.0,1.0,
        -1.0,-1.0,0.0,0.0,
        1.0,1.0,1.0,1.0,
        1.0,-1.0,1.0,0.0
    ]);
    var n = 4;
    var vertexTexCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexTexCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,verticesTexCoords,gl.STATIC_DRAW);
    var FSIZE = verticesTexCoords.BYTES_PER_ELEMENT;

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,FSIZE*4,0);
    gl.enableVertexAttribArray(a_Position);

    var a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');
    gl.vertexAttribPointer(a_TexCoord,2,gl.FLOAT,false,FSIZE*4,FSIZE*2);
    gl.enableVertexAttribArray(a_TexCoord);

    return n
}

function initTextures(gl,n) {
    var texture = gl.createTexture();
    var u_Sampler =  gl.getUniformLocation(gl.program, 'u_Sampler');

    var image = new Image();
    image.onload =()=>{
        loadTexture(gl, n, texture,u_Sampler,image);
    };
    image.src = './img/timg.jpeg';
    // image.src = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565017785448&di=7365f2011a485217c07cb2c720162e58&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201407%2F13%2F20140713132908_rx38t.thumb.700_0.jpeg';
}

function loadTexture(gl, n, texture,u_Sampler,image) {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,1);
    //开启0号纹理单元
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D,texture);

    // 配置纹理参数
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    // webgl设置图形纹理的时候，在设置水平和垂直如何填充的时候，设置成水平和垂直拉伸, 由于图片不是 2 的 幂数
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,image);
    //
    gl.uniform1i(u_Sampler,0);
    gl.drawArrays(gl.TRIANGLE_STRIP,0,n);

}


main()


