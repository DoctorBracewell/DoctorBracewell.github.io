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
