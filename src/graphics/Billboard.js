/**
 * a billboard graphics object
 */
export function Billboard(id, x, y, rot, width, height) {
  this.id = id;
  this.x = x;
  this.y = y;
  
  // for enemies and other non-block objects, the rotation
  // is always facing the camera
  this.rot = rot;
  
  this.width = width;
  this.height = height;
}