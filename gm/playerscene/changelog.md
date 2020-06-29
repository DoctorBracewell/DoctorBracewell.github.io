# Changelog

## alpha | 0.1.0
* Added main engine functionality
  * Generates script based of vertex input
  * Code outputted in [CodeMirror](https://codemirror.net/)
* Simple grid style layout
* Root inputs:
  * Gamemode
  * Invisibility
  * Start Snippet
  * End Snippet
* Path Maker
  * New vertex button
  * Labelled vertices, starts at Vertex 0 
  * Delete All button to delete all vertices except 0
  * Individual delete buttons on vertices (very unstable)
  * Cords, yaw/pitch, time taken and script snippets for each vertex
* Input data saved on reload/revist
  * Saves all root inputs, amount of vertices, all data in vertices
  * Doesn't save generated code
* Footer with links to github source, homepage and contact

## alpha | 0.1.1
* Revamped localStorage with page prefixes
* Changed to parseFloats for decimal co-ordinates.

## alpha | 0.2.0
* Completley revamped styles
* Added local storage prefixes

## alpha | 0.2.1
* Fixed major bug where player would be stuck at end of vertex for same amount of time as taken before continuing.

## alpha | 0.3.0
* Added camera pan direction choice.