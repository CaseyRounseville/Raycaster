import { wrapFullDeg } from "../physics/Angle";

/**
 * Initialize a skybox.
 *
 * Parameters:
 * texture -- The texture to use for this skybox.
 *
 * Returns:
 * Nothing.
 */
export function SkyBox(texture) {
    this.texture = texture;
}

/**
 * Return the texture being used for this skybox.
 *
 * Parameters:
 * None.
 *
 * Returns:
 * The texture being used for this skybox.
 */
SkyBox.prototype.getTexture = function() {
    return this.texture;
};

/**
 * Return the starting x-coordinate, in pixels, on the texture for this skybox,
 * taking into account the rotation of the camera.
 *
 * Parameters:
 * camera -- The camera to look at its rotation to determine where to start
 * rendering from the skybox texture.
 *
 * Returns:
 * The x-coordinate, in pixels, on the skybox texture from which to begin
 * rendering.
 */
SkyBox.prototype.getStartX = function(camera) {
	// calculate the rotation of the camera, as a percentage of a full circle;
	// be sure to wrap the angle between 0 degrees inclusive and 360 degrees
	// exclusive
    const rotPercentage = 1.0 - wrapFullDeg(camera.rot.v) / 360.0;

	// remember that valid x-coordinates on a texture are from 0 pixels to
	// width - 1 pixels
    return (this.texture.getWidth() - 1) * rotPercentage;
};
