import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleChange } from '@angular/core';

import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  Observable,
  BehaviorSubject,
  of,
} from 'rxjs';

import {
  TestUtil,
  name
} from '../../../../shared/test-util';

import { MaterialModule } from '../../../material.module';
import { MainComponent } from './main.component';
import { PostComponent } from '../../components/post/post.component';
import { ListComponent } from '../../components/list/list.component';
import { FixHeaderDirective } from '../../components/list/directives/fix-header.directive';
import { DblClickOrPressDirective } from '../../../../shared/directives/dblclickorpress.directive';
import { Note } from '../../models/note';
import { NoteService } from '../../services/note.service';



class NoteServiceStub {
  private __nextId = 4;

  private __notes = [
    { id: '1', text: 'Text 1', added: new Date().getTime(), updated: new Date().getTime() },
    { id: '2', text: 'Text 2', added: new Date().getTime(), updated: new Date().getTime() },
    { id: '3', text: 'Text 3', added: new Date().getTime(), updated: new Date().getTime() },
  ] as Note[];

  private __notes$ = new BehaviorSubject<Note[]>(this.__notes);

  getNotes(): Observable<Note[]> {
    return this.__notes$.asObservable();
  }

  getNote(id: string): Observable<Note> {
    return of(this.__notes.find(note => note.id === id));
  }

  addNote(text: string): void {
    this.__notes = this.__notes.concat([{
        id: '' + (this.__nextId++),
        text,
        added: new Date().getTime(),
        updated: new Date().getTime(),
      }
    ]);

    this.__notes$.next(this.__notes);
  }

  updateNote(id: string, text: string): void {
    const noteForUpdate = this.__notes.find(note => note.id === id);
    noteForUpdate.text = text;
    noteForUpdate.updated = new Date().getTime();

    this.__notes$.next(this.__notes);
  }

  removeNote(id: string): void {
    this.__notes.splice(
      this.__notes.findIndex(note => note.id === id),
      1
    );

    this.__notes$.next(this.__notes);
  }
}

describe(name(MainComponent) + ' tests.', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let noteService: NoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MainComponent,
        PostComponent,
        ListComponent,
        DblClickOrPressDirective,
        FixHeaderDirective,
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
      ],
      providers: [
        {provide: NoteService, useClass: NoteServiceStub}
      ]
    });

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    noteService = TestBed.get(NoteService);
  });

  it(name(MainComponent) + ' is created.', () => {
    expect(component).toBeDefined();
  });

  it(name(NoteServiceStub) + ' works correctly.', () => {
    expect(noteService).toBeDefined();

    let notesCount = TestUtil.getObservableLength(noteService.getNotes());
    expect(notesCount).toBe(3, 'Initial state.');

    // Add note
    noteService.addNote('Text 4');

    notesCount = TestUtil.getObservableLength(noteService.getNotes());
    expect(notesCount).toBe(4, 'Add note.');

    // Update note
    const editId = '1';
    const editText = 'Text 1 edited.';

    noteService.updateNote(editId, editText);

    notesCount = TestUtil.getObservableLength(noteService.getNotes());
    expect(notesCount).toBe(4, 'Update note.');

    const editedNote = TestUtil.getObservableObject(noteService.getNote(editId));
    expect(editedNote.text).toBe(editText, 'Update note.');

    // Remove note
    noteService.removeNote('1');

    notesCount = TestUtil.getObservableLength(noteService.getNotes());
    expect(notesCount).toBe(3, 'Remove note.');
  });

  it('Initial state is correct.', () => {
    fixture.detectChanges();

    const notesCount = TestUtil.getObservableLength(noteService.getNotes());
    expect(notesCount).toBe(3, 'Initial storage note count.');

    const table: HTMLTableElement = fixture.nativeElement.querySelector('table');
    expect(table).toBeDefined();
    expect(table.rows.length - 1).toBe(3, 'Initial table note count.');

    const note1: Note = TestUtil.getObservableObject(noteService.getNote('1'));
    const tdNote1 = TestUtil.getElementByTextContent(fixture.nativeElement, 'td', note1.text);
    expect(tdNote1).toBeDefined();

    const note2: Note = TestUtil.getObservableObject(noteService.getNote('2'));
    const tdNote2 = TestUtil.getElementByTextContent(fixture.nativeElement, 'td', note2.text);
    expect(tdNote2).toBeDefined();

    const note3: Note = TestUtil.getObservableObject(noteService.getNote('3'));
    const tdNote3 = TestUtil.getElementByTextContent(fixture.nativeElement, 'td', note3.text);
    expect(tdNote3).toBeDefined();
  });

  it('Adding a note works correctly. [specification-features-notes-actions-adding-a-note]', () => {
    fixture.detectChanges();

    const textArea: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');
    expect(textArea).toBeDefined();
    textArea.click();

    const text = 'Newly added note.';
    textArea.value = text;

    const btnPost = TestUtil.getElementByTextContent(fixture.nativeElement, 'button', 'Post');
    btnPost.click();

    const addedNote: Note = TestUtil.getObservableObject(noteService.getNote('4'));
    expect(addedNote.text).toBe(text, 'Added note text.');

    const notesCount = TestUtil.getObservableLength(noteService.getNotes());
    expect(notesCount).toBe(4, 'Storage note count after add.');

    fixture.detectChanges();

    const table: HTMLTableElement = fixture.nativeElement.querySelector('table');
    expect(table.rows.length - 1).toBe(4, 'Table note count after add.');
  });

  it('Updating a note works correctly. [specification-features-notes-actions-updating-a-note]', () => {
    fixture.detectChanges();

    let note1: Note = TestUtil.getObservableObject(noteService.getNote('1'));
    let tdNote1 = TestUtil.getElementByTextContent(fixture.nativeElement, 'td', note1.text);
    expect(tdNote1.textContent.trim()).toBe(note1.text, 'Select table cell.');

    TestUtil.dblclick(tdNote1);
    fixture.detectChanges();

    const textArea: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');
    const newText = textArea.value + ' (edited)';
    textArea.value = newText;

    const btnPost = TestUtil.getElementByTextContent(fixture.nativeElement, 'button', 'Post');
    btnPost.click();
    fixture.detectChanges();

    const notesCount = TestUtil.getObservableLength(noteService.getNotes());
    expect(notesCount).toBe(3, 'Storage note count after update.');

    note1 = TestUtil.getObservableObject(noteService.getNote('1'));
    expect(note1.text).toBe(newText, 'Updated note text.');

    tdNote1 = TestUtil.getElementByTextContent(fixture.nativeElement, 'td', note1.text);
    expect(tdNote1.textContent.trim()).toBe(newText, 'Select updated table cell.');
  });

  it('Removing a note works correctly. [specification-features-notes-actions-removing-a-note]', () => {
    fixture.detectChanges();

    const note1: Note = TestUtil.getObservableObject(noteService.getNote('1'));
    const tdNote1 = TestUtil.getElementByTextContent(fixture.nativeElement, 'td', note1.text);
    expect(tdNote1.textContent.trim()).toBe(note1.text, 'Select table cell.');

    TestUtil.dblclick(tdNote1);
    fixture.detectChanges();

    const btnDelete = TestUtil.getElementByTextContent(fixture.nativeElement, 'button', 'delete');
    btnDelete.click();
    fixture.detectChanges();

    const notesCount = TestUtil.getObservableLength(noteService.getNotes());
    expect(notesCount).toBe(2, 'Storage note count after remove.');
  });

});
