export function HitBox(pos, size) {
  this.pos = pos;
  this.size = size;
}

HitBox.prototype.top = function() {
  return this.pos.y - this.size.y / 2;
};

HitBox.prototype.bottom = function() {
  return this.pos.y + this.size.y / 2;
};

HitBox.prototype.left = function() {
  return this.pos.x - this.size.x / 2;
};

HitBox.prototype.right = function() {
  return this.pos.x + this.size.x / 2;
};

HitBox.prototype.intersects = function(other) {
  return this.left()  <	other.right()	 &&
         this.right()	>	other.left()	 &&
         this.top()		<	other.bottom() &&
         this.bottom	>	other.top();
};