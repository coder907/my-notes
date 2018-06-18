# Technical Specification

## Definitions

### General
 - Note: A text note with properties

### User Interface 
 - Click: A mouse click, or a tap on touch devices.
 - Doubleclick: A mouse double-click, or a (long) press on touch devices.
 - Post Button: The button labeled 'Post'.
 - Clear Button: The button labeled 'Clear'.
 - Textarea: The textarea labeled 'Enter a new note'.
 - List: The list that displays Notes.
 - Delete Tool: The 'Delete' toolbar item (trash bin icon).

### Backend
 - Storage: Selected storage provider.



## Features

### Notes management

#### Adding a new Note

1. Click on the Textarea.
2. Type in the desired text.
3. Click Post Button.
4. A new Note is created and added to Storage.

#### Updating a Note

1. Doubleclick on the desired Note in the List.
2. Edit the Note in the Textarea.
3. Click Post Button.
4. The Note is updated and changes synced to Storage.

#### Removing a Note

1. Doubleclick on the desired Note in the List.
2. Click Delete Tool
3. The Note is removed
