import * as GraphicsBackend from "./backend/GraphicsBackend";
import * as Renderer from "./Renderer";

const render = (self, backend) => {
	graphicsBackend.fillRect(0, 0, 10, 10, 0xFF00FFFF);
};

export const create = () => {
	let testRenderer = Renderer.create(render);
	
	return testRenderer;
};