# Actors
```
Actor: {
  wire:	    <function()>,
  unwire:   <function()>
}
```

## Proto Actors in Scene Files
```
{
  type:   <string>,
  room:   <number>,
  x:      <number>,
  y:      <number>,
  horiz:  <string>,
  vert:   <string>,
  arg: {
    /* varies by actor */
  }
}
```

## Actor Loader
### JSON
* Takes scene file, and finds `actors`
* passes `actors` obj to JSONActorLoader

## Actor Factory
* Keeps associative array of actor type to creation function
* Creation function may return undefined if actor should not spawn based on `arg`