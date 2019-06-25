/**
 * Created by wanglei on 2019-06-21
 */

window.onload = function () {

    var canvas = document.getElementById(`webgl`);

    var gl = canvas.getContext('webgl');

    gl.clearColor(0.0,.0,.0,1.0);

    gl.clear(gl.COLOR_BUFFER_BIT);

    console.log(gl);
}