# Triggers
A set of observable bits that is saved to the player's save file. Each scene has its own set, and
there is a global set accessable from anywhere.
```
ints: []

registerBitObserver(bitNum, obs);
unregisterBitObserver(bitNum, obs);
set(bitNum);
clear(bitNum);
touch(bitNum);

BitObserver: {
	bitSet: function(),
	bitCleared: function(),
	bitTouched: function()
}
```

Can be used for:
* Dungeon triggers(flip switch -> open door(s))
* Automagically open door once all enemies killed
* Actor communication across rooms(scene-level)
* Actor communication across scenes(global-level)
* Keep track of NPC side quests
* Combine with timer for timed gate closing/opening
* Remember chests opened/items picked up/enemies killed

## TODO: maybe rooms flags that get cleared on a room change, for local puzzles that don't leave the
room