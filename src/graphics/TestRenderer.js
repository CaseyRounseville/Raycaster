export function TestRenderer() {
  // nothing
}

TestRenderer.prototype.render = function(backend) {
  backend.fillRect(0, 0, 10, 10, 0xFF00FFFF);
};