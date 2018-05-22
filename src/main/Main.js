graphicsBackend.registerRenderer(new TestRenderer());
inputBackend.registerInputHandler(new TestInputHandler());

var player = new Player(50, 50);
player.wire();

setInterval(loop, 1000.0 / 60.0);
function loop() {
	inputBackend.processInput();
	graphicsBackend.render();
}