# Tasks
Tasks are ticked once per frame, and have an array of completion callbacks attached to them, that
get called when the task is completed. Can be used for timing, running something over multiple
frames, etc.
```
{
	tick: function()
	cbs: []
}
```

## TODO: maybe cutscenes?