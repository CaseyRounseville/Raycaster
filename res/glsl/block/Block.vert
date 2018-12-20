#version 330 es

layout (location = 0) in vec3 attr_vertPos;
layout (location = 1) in vec4 attr_vertColor;
layout (location = 2) in vec2 attr_texCoords;

out vec4 vertColor;
out vec2 texCoords;

void main() {
	vertColor = attr_vertColor;
	texCoords = attr_texCoords;
	
	gl_Position = vec4(attr_vertPos.xyz, 1.0);
}