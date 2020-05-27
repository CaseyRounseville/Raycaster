import { Vector2 } from "../../physics/Vector2";

// the neutral positions on the screen, in pixels, of the player's left and
// right hands;
// these positions are for the top-left corner of the images
const leftHandNeutralPos = new Vector2(-50, 130);
const rightHandNeutralPos = new Vector2(240, 80);

export function PlayerRenderer(player) {
  this.player = player;
}

PlayerRenderer.prototype.render = function(backend) {
  /*// read the position offset of the player's head bobbing
  const headBobPos = this.player.headBobEffect.getPosOffset();
  // draw left hand
  const leftHandTex = backend.getTexture("player-left-hand");
  const leftHandWidth = leftHandTex.getWidth();
  const leftHandHeight = leftHandTex.getHeight();
  backend.renderTexture("player-left-hand", leftHandNeutralPos.x -
      headBobPos.x, leftHandNeutralPos.y - headBobPos.y, leftHandWidth,
      leftHandHeight, 0, 0, leftHandWidth, leftHandHeight);

  // draw right hand
  const rightHandTex = backend.getTexture("player-right-hand");
  const rightHandWidth = rightHandTex.getWidth();
  const rightHandHeight = rightHandTex.getHeight();
  backend.renderTexture("player-right-hand", rightHandNeutralPos.x +
      headBobPos.x, rightHandNeutralPos.y + headBobPos.y, rightHandWidth,
      rightHandHeight, 0, 0, rightHandWidth, rightHandHeight);*/

  // draw debug player
  /*backend.setFillColor(0xFF0000FF);
	backend.fillRect(this.player.pos.x - 10, this.player.pos.y - 10, 20, 20, 0xFF0000FF);
  backend.renderTexture("test-0",
                        this.player.pos.x,
                        this.player.pos.y,
                        32,
                        32,
                        0,
                        0,
                        32,
                        32);*/
};
