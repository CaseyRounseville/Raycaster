import GraphicsBackend from "../../graphics/backend/GraphicsBackend";
import Renderer from "../../graphics/Renderer";

const render = (self, backend) => {
	backend.setFillColor(backend, 0xFF0000FF);
	backend.fillRect(backend, self.player.pos.x - 10, self.player.pos.y - 10, 20, 20, 0xFF0000FF);
};

const create = (player) => {
	let playerRenderer = Renderer.create(render);
	
	playerRenderer.player = player;
	
	return playerRenderer;
}

export default {
	create
};