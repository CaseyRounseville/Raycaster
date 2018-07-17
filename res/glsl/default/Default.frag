#version 300 es

precision mediump float;

in vec4 vertColor;
in vec2 texCoords;

out vec4 fragColor;

void main() {
	fragColor = vertColor;
}