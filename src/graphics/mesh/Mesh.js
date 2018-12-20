import { Vector3 } from "../../physics/Vector3";

export function Mesh(vertices, indices) {
  this.vertices = vertices;
  this.indices = indices;
}

Mesh.prototype.normalize = function() {
  vertices.forEach((vertex) => {
    vertex.pos.normalize();
  });
};

Mesh.prototype.scale = function(factor) {
  vertices.forEach((vertex) => {
    Vector3.Multiply(vertex.pos, vertex.pos, factor);
  });
};

export const cube = new Mesh([
    // bottom
    new Vertex(new Vector3(0, 0, 0)),
    new Vertex(new Vector3(0, 0, 1)),
    new Vertex(new Vector3(1, 0, 1)),
    new Vertex(new Vector3(1, 0, 0)),
    
    // top
    new Vertex(new Vector3(0, 1, 0)),
    new Vertex(new Vector3(0, 1, 1)),
    new Vertex(new Vector3(1, 1, 1)),
    new Vertex(new Vector3(1, 1, 0))
  ], [
    // bottom
    0, 1, 2,
    0, 2, 3,
    
    // top
    4, 5, 6,
    4, 6, 7,
    
    // back
    4, 0, 3,
    4, 3, 7,
    
    // front
    5, 1, 2,
    5, 2, 6,
    
    // left
    4, 0, 1,
    4, 1, 5,
    
    //right
    6, 2, 3,
    6, 3, 7
]);

export const billboard = new Mesh([
    new Vertex(new Vector3(0, 0, 0)),
    new Vertex(new Vector3(1, 0, 0)),
    new Vertex(new Vector3(1, 1, 0)),
    new Vertex(new Vector3(0, 1, 0))
  ], [
    0, 1, 2,
    0, 2, 3
]);