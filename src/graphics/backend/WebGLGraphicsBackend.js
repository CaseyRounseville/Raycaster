import { GraphicsBackend } from "./GraphicsBackend";

import * as IOUtil from "../../util/IOUtil";

import { globalCtxt } from "../../main/Main";

const fillRect = (self) => {
  
};

const clearScreen = (self) => {
  
};

const renderTexture = (self) => {
  
};

const loadTexture = (self) => {
  
};

const getTexture = (self) => {
  
};

const destroyTexture = (self) => {
  
};

const getFillColor = (self) => {
  
};

const setFillColor = (self) => {
  
};

const setBlockMap = (self, blockMap) => {
  self.blockMap = blockMap;
  
  // generate and upload mesh to gpu
  // ...
  
  // add height change callback to blockMap
  // ...
};

const PROG_DEFAULT = "default";

const VERT_BUF_DEFAULT = "default"

WebGLGraphicsBackend.prototype = Object.create(GraphicsBackend.prototype);
WebGLGraphicsBackend.prototype.constructor = WebGLGraphicsBackend;

export function WebGLGraphicsBackend() {
  GraphicsBackend.call(this);
  
  this.idToTexHandle = {};
  this.idToProgHandle = {};
  this.idToVertBufHandle = {};
  
  this.loadContext();
  this.loadDefaultProgram();
  
  // load single white pixel
  // from WebGL resId, or just paste b64 for single white pixel
  
}

WebGLGraphicsBackend.prototype.loadContext = function() {
  // webgl context attributes
  const glAttr = {
    alpha: false,
    depth: true,
    stencil: false,
    antialias: true,
    premultipliedAlpha: true,
    preserveDrawingBuffer: false,
    powerPreference: "default",
    failIfMajorPerformanceCaveat: false
  };
  
  // get context
  const gl = document.getElementById("canvas").getContext("webgl2", glAttr);
  
  if (!gl) {
    throw "WebGLGraphicsBackend.create: FATAL: UNABLE TO CREATE WEBGL CONTEXT.";
  }
  
  Object.keys(glAttr).every((key) => {
    if (gl.getContextAttributes[key] !== glAttr[key]) {
      console.error("WebGLGraphicsBackend.create: WARNING: REQUESTED CTXT CREATION ATTR DOES NOT MATCH ACTUAL ATTR\n" +
                    "\tREQUESTED: " + key + ": " + glAttr[key] + "\n" +
                    "\tACTUAL: " + key + ": " + gl.getContextAttributes[key]);
    }
  });
  
  gl.clearColor(0.0, 1.0, 0.0, 1.0);
//  gl.clear(self.ctxt.COLOR_BUFFER_BIT);
  
  this.gl = gl;
};

WebGLGraphicsBackend.prototype.getFillColor = function() {
  return this.fillColor;
};

WebGLGraphicsBackend.prototype.setFillColor = function(color) {
  this.fillColor = color;
};

WebGLGraphicsBackend.prototype.fillRect = function() {
  // set tint to fill color and call renderTexture with white pixel
};

WebGLGraphicsBackend.prototype.renderTexture = function(id,
                                                        destX,
                                                        destY,
                                                        destW,
                                                        destH,
                                                        srcX,
                                                        srcY,
                                                        srcW,
                                                        srcH) {
  // write something to the vertex buffer
};

WebGLGraphicsBackend.prototype.loadTexture = function(id, b64) {
  const img = new Image();
  img.src = b64;
  
  const gl = this.gl;
  
  const texHandle = gl.createTexture();
  
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texHandle);
  gl.texImage2D();
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.bindTexture(gl.TEXTURE_2D, null);
  
  this.idToTexHandle[id] = texHandle;
};

WebGLGraphicsBackend.prototype.destroyTexture = function(id) {
  
};

WebGLGraphicsBackend.prototype.loadProgram = function(id, vertSrc, fragSrc) {
  const gl = this.gl;
  
  // vertex shader
  const vertHandle = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertHandle, vertSrc);
  gl.compileShader(vertHandle);
  if (!gl.getShaderParameter(vertHandle, gl.COMPILE_STATUS)) {
    throw "WebGLGraphicsBackend.loadProgram: FAILED TO COMPILE VERTEX SHADER:\n" +
          "\t" + gl.getShaderInfoLog(vertHandle);
  }
  
  // fragment shader
  const fragHandle = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragHandle, fragSrc);
  gl.compileShader(fragHandle);
  if (!gl.getShaderParameter(fragHandle, gl.COMPILE_STATUS)) {
    throw "WebGLGraphicsBackend.loadProgram: FAILED TO COMPILE FRAGMENT SHADER:\n" +
          "\t" + gl.getShaderInfoLog(fragHandle);
  }
  
  // link program
  const progHandle = gl.createProgram();
  gl.attachShader(progHandle, vertHandle);
  gl.attachShader(progHandle, fragHandle);
  gl.linkProgram(progHandle);
  if (!gl.getProgramParameter(progHandle, gl.LINK_STATUS)) {
    throw "WebGLGraphicsBackend.loadProgram: FAILED TO LINK PROGRAM:\n" +
          "\t" + gl.getProgramInfoLog(progHandle);
  }
  
  // clean up
  gl.deleteShader(vertHandle);
  gl.deleteShader(fragHandle);
  
  this.idToProgHandle[id] = progHandle;
  return progHandle;
};

WebGLGraphicsBackend.prototype.loadDefaultProgram = function() {
  const vertSrc = IOUtil.readFileFromNetwork("http://localhost:3333/" + "res/glsl/default/Default.vert");
  const fragSrc = IOUtil.readFileFromNetwork("http://localhost:3333/" + "res/glsl/default/Default.frag");
  
  const progHandle = this.loadProgram(PROG_DEFAULT, vertSrc, fragSrc);
  this.idToProgHandle[PROG_DEFAULT] = progHandle;
  
  const gl = this.gl;
  
  gl.useProgram(progHandle);
  
  // set up vertex buffer
  const vertBufHandle = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertBufHandle);
  gl.bufferData(gl.ARRAY_BUFFER,
                new Float32Array([
                  -1.0, 1.0, 1.0,        1.0, 0.0, 0.0, 1.0,       0.0, 0.0,
                  -1.0, -1.0, 1.0,       0.0, 1.0, 0.0, 1.0,       0.0, 0.0,
                  1.0, -1.0, 1.0,        0.0, 0.0, 1.0, 1.0,       0.0, 0.0
                ]),
                gl.STATIC_DRAW);
  
  this.idToVertBufHandle[VERT_BUF_DEFAULT] = vertBufHandle;
  
  // position
  gl.vertexAttribPointer(0,        // location
                         3,        // num components
                         gl.FLOAT, // type
                         false,    // normalize?
                         36,       // stride(in bytes)
                         0);       // offset(in bytes)
  gl.enableVertexAttribArray(0);
  
  // color
  gl.vertexAttribPointer(1,
                         4,
                         gl.FLOAT,
                         true,
                         36,
                         12);
  gl.enableVertexAttribArray(1);
  
  // tex coords
  gl.vertexAttribPointer(2,
                         2,
                         gl.FLOAT,
                         false,
                         36,
                         28);
  gl.enableVertexAttribArray(2);  
  
  gl.drawArrays(gl.TRIANGLES, 0, 3);
};

WebGLGraphicsBackend.prototype.destroyProgram = function(progHandle) {
  delete this.idToProgHandle[progHandle];
  this.gl.deleteProgram(progHandle);
};

WebGLGraphicsBackend.prototype.clearScreen = function() {
  
};