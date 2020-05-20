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
    const rotPercentage = 1.0 - camera.rot.v / (2 * Math.PI);
    return this.texture.getWidth() * rotPercentage;
};
