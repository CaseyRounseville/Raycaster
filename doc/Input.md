# Input
Pluggable Input backends.
## Backend Base
Handles stuff common to all implementations, like updating prevFrame and currFrame on each tick
## Backend Implementation
Deals with actually detecting input. Specified in `GlobalContext`.
## Default Input Backend
Uses the keyboard.