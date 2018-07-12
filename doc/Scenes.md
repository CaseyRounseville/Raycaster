# Scenes
Holds the block map and actor list. Only one scene can be loaded at a time.
```
{
	width:		<number>,
	height:		<number>,
	blocks:		<number[width * height]>,
	actors:		<actor[]>
}
```

## Rooms
Rooms are really just groups of actors. Doors are in room -1, which is loaded
when the scene loads, and unloaded when the scene unloads. A max of 3 rooms can
be loaded at a time: room -1(always), and two others in between a transition.