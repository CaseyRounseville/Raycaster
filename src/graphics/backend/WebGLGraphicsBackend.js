import * as GraphicsBackend from "./GraphicsBackend";

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

const destroy = (self) => {
  
};

const loadProgram = (self, vertSrc, fragSrc) => {
  // vertex shader
  let vertHandle = self.ctxt.createShader(self.ctxt.VERTEX_SHADER);
  self.ctxt.shaderSource(vertHandle, vertSrc);
  self.ctxt.compileShader(vertHandle);
  if (!self.ctxt.getShaderParameter(vertHandle, self.ctxt.COMPILE_STATUS)) {
    throw "WebGLGraphicsBackend.loadProgram: FAILED TO COMPILE VERTEX SHADER:\n" +
          "\t" + self.ctxt.getShaderInfoLog(vertHandle);
  }
  
  // fragment shader
  let fragHandle = self.ctxt.createShader(self.ctxt.FRAGMENT_SHADER);
  self.ctxt.shaderSource(fragHandle, fragSrc);
  self.ctxt.compileShader(fragHandle);
  if (!self.ctxt.getShaderParameter(fragHandle, self.ctxt.COMPILE_STATUS)) {
    throw "WebGLGraphicsBackend.loadProgram: FAILED TO COMPILE FRAGMENT SHADER:\n" +
          "\t" + self.ctxt.getShaderInfoLog(fragHandle);
  }
  
  // link program
  let progHandle = self.ctxt.createProgram();
  self.ctxt.attachShader(progHandle, vertHandle);
  self.ctxt.attachShader(progHandle, fragHandle);
  self.ctxt.linkProgram(progHandle);
  if (!self.ctxt.getProgramParameter(progHandle, self.ctxt.LINK_STATUS)) {
    throw "WebGLGraphicsBackend.loadProgram: FAILED TO LINK PROGRAM:\n" +
          "\t" + self.ctxt.getProgramInfoLog(progHandle);
  }
  
  // clean up
  self.ctxt.deleteShader(vertHandle);
  self.ctxt.deleteShader(fragHandle);
  
  return progHandle;
};

const destroyProgram = (self, progHandle) => {
  self.ctxt.deleteProgram(progHandle);
};

export const create = () => {
  let self = GraphicsBackend.create(fillRect,
                                    clearScreen,
                                    renderTexture,
                                    loadTexture,
                                    getTexture,
                                    destroyTexture,
                                    getFillColor,
                                    setFillColor,
                                    setBlockMap,
                                    destroy);
  // find canvas
  self.canvas = document.getElementById("canvas");
  
  // webgl context attributes
  let ctxtAttr = {
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
  self.ctxt = self.canvas.getContext("webgl2", ctxtAttr);
  
  if (self.ctxt == null) {
    throw "WebGLGraphicsBackend.create: FATAL: UNABLE TO CREATE WEBGL CONTEXT.";
  }
  
  Object.keys(ctxtAttr).every((key) => {
    if (self.ctxt.getContextAttributes[key] !== ctxtAttr[key]) {
      console.error("WebGLGraphicsBackend.create: WARNING: REQUESTED CTXT CREATION ATTR DOES NOT MATCH ACTUAL ATTR\n" +
                    "\tREQUESTED: " + key + ": " + ctxtAttr[key] + "\n" +
                    "\tACTUAL: " + key + ": " + self.ctxt.getContextAttributes[key]);
    }
  });
  
  self.ctxt.clearColor(0.0, 1.0, 0.0, 1.0);
  self.ctxt.clear(self.ctxt.COLOR_BUFFER_BIT);
  
  // load shader program
  let vertSrc = IOUtil.readFileFromNetwork("http://localhost:3333/" + "res/glsl/default/Default.vert");
  let fragSrc = IOUtil.readFileFromNetwork("http://localhost:3333/" + "res/glsl/default/Default.frag");
  self.progHandle = loadProgram(self, vertSrc, fragSrc)
  self.ctxt.useProgram(self.progHandle);
  
  // set up vertex buffer
  self.vertBufHandle = self.ctxt.createBuffer();
  self.ctxt.bindBuffer(self.ctxt.ARRAY_BUFFER, self.vertBufHandle);
  self.ctxt.bufferData(self.ctxt.ARRAY_BUFFER,
                       new Float32Array([
                         -1.0, 1.0, 1.0,         1.0, 0.0, 0.0, 1.0,       0.0, 0.0,
                         -1.0, -1.0, 1.0,       0.0, 1.0, 0.0, 1.0,       0.0, 0.0,
                         1.0, -1.0, 1.0,        0.0, 0.0, 1.0, 1.0,       0.0, 0.0
                       ]),
                       self.ctxt.STATIC_DRAW);
  
  // position
  self.ctxt.vertexAttribPointer(0,                // location
                                3,                // num components
                                self.ctxt.FLOAT,  // type
                                false,            // normalize?
                                36,               // stride(in bytes)
                                0);               // offset(in bytes)
  self.ctxt.enableVertexAttribArray(0);
  
  // color
  self.ctxt.vertexAttribPointer(1,
                                4,
                                self.ctxt.FLOAT,
                                true,
                                36,
                                12);
  self.ctxt.enableVertexAttribArray(1);
  
  // tex coords
  self.ctxt.vertexAttribPointer(2,
                                2,
                                self.ctxt.FLOAT,
                                false,
                                36,
                                28);
  self.ctxt.enableVertexAttribArray(2);
  
  self.ctxt.drawArrays(self.ctxt.TRIANGLES, 0, 3);
  
  return self;
};