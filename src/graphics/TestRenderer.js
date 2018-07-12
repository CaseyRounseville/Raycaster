import GraphicsBackend from "./backend/GraphicsBackend";
import Renderer from "./Renderer";

const render = (self, backend) => {
	graphicsBackend.fillRect(0, 0, 10, 10, 0xFF00FFFF);
};

const create = () => {
	let testRenderer = Renderer.create(render);
	
	return testRenderer;
};

export default {
	create
};