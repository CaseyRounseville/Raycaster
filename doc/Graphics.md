# Graphics
Pluggable graphics backends.

## Backend Base
Handles stuff common to all backends, like object registration.

## Backend Implementation
Deals with the actual rendering part. Specified in the GlobalContext.

### Canvas2D Backend
Uses Canvas2D.

## RayCasting
### Uniform Height Walls
* Use a depth buffer for each column of the projection plane to aid in sprite rendering. Not sure
how to handle this for var-height, as this depends on only one wall per vertical scan line.
### Variable Height Walls
* Each ray must go either to the fullest reach of the map, or to a predefined visibility limit, on
each cast.
* Draw walls and flats as they are detected. Must detect both in same loop.
* Need to figure out sprite rendering.