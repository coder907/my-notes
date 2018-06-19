# Technical Specification

This document intentionally avoids terms such as "SHOULD", "MAY" or "MUST", and just describes the Application and its behavior as it is. Statements and/or paragraphs are mapped to automated tests, whenever applicable.



## Definitions

### General
 - Application: My Notes.
 - User: A user of the Application.
 - Property: An attribute of an object.
 - Note: A text note with Properties

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

### Notes

#### General

##### Properties

A Note has the following Properties:

1. id (unique identifier).
2. added (creation timestamp).
3. modified (modification timestamp).
4. text (content).



#### Actions

##### Adding a Note

1. Click on the Textarea.
2. Type in the desired text.
3. Click Post Button.
4. A new Note is created and added to the Storage and the List.

[Test: specification-features-notes-actions-adding-a-note](src/app/core/components/main/app.component.spec.ts)

##### Updating a Note

1. Doubleclick on the desired Note in the List.
2. Edit the Note in the Textarea.
3. Click Post Button.
4. The Note is updated and changes synced to Storage and reflected in the List.

##### Removing a Note

1. Doubleclick on the desired Note in the List.
2. Click Delete Tool.
3. The Note is removed from Storage and List.

##### Sorting Notes

1. Click on the desired List header to sort Notes by that Property.
2. Up-arrow (↑) means that the List is sorted in ascending order by the Property.
3. Down-arrow (↓) means that the List is sorted in decending order by the Property.
4. Absence of an arrow means that the List is sorted in no particular order with regard to the Property.
