import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { TestUtil, name } from '../../../../shared/test-util';
import { MaterialModule } from '../../../material.module';
import { AppComponent } from './app.component';
import { PostComponent } from '../post/post.component';
import { ListComponent } from '../list/list.component';
import { Item } from '../../models/item';
import { ItemService } from '../../services/item.service';



class ItemServiceStub {
  nextId = 4;

  items = [
    { id: '1', text: 'Text 1', added: new Date().getTime(), updated: new Date().getTime() },
    { id: '2', text: 'Text 2', added: new Date().getTime(), updated: new Date().getTime() },
    { id: '3', text: 'Text 3', added: new Date().getTime(), updated: new Date().getTime() },
  ] as Item[];

  items$ = of(this.items);

  getItems(): Observable<Item[]> {
    return this.items$;
  }

  getItem(id: string): Observable<Item> {
    return of(this.items.find(item => item.id === id));
  }

  addItem(text: string): void {
    this.items.push({
        id: '' + (this.nextId++),
        text,
        added: new Date().getTime(),
        updated: new Date().getTime(),
      } as Item
    );
  }

  updateItem(id: string, text: string): void {
    const itemForUpdate = this.items.find(item => item.id === id);
    itemForUpdate.text = text;
    itemForUpdate.updated = new Date().getTime();
  }

  removeItem(id: string): void {
    this.items.splice(
      this.items.findIndex(item => item.id === id),
      1
    );
  }
}

describe(name(AppComponent) + ' tests.', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let itemService: ItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        PostComponent,
        ListComponent
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
      ],
      providers: [
        {provide: ItemService, useClass: ItemServiceStub}
      ]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    itemService = TestBed.get(ItemService);
  });

  it(name(AppComponent) + ' is created.', () => {
    expect(component).toBeDefined();
  });

  it('Item service stub works correctly.', () => {
    expect(itemService).toBeDefined();

    let itemsCount: number;

    // Initial state
    itemService.getItems().subscribe(
      items => itemsCount = items.length,
      err => console.error('Error: ' + err),
    );
    expect(itemsCount).toBe(3, 'Initial state.');

    // Add item
    itemService.addItem('Text 4');

    itemService.getItems().subscribe(
      items => itemsCount = items.length,
      err => console.error('Error: ' + err),
    );

    expect(itemsCount).toBe(4, 'Add item.');

    // Update item
    const editId = '1';
    const editText = 'Text 1 edited.';
    let editedItem: Item;

    itemService.updateItem(editId, editText);

    itemService.getItems().subscribe(
      items => itemsCount = items.length,
      err => console.error('Error: ' + err),
    );

    expect(itemsCount).toBe(4, 'Update item.');

    itemService.getItem(editId).subscribe(
      item => editedItem = item,
      err => console.error('Error: ' + err),
    );

    expect(editedItem.text).toBe(editText, 'Update item.');

    // Remove item
    itemService.removeItem('1');

    itemService.getItems().subscribe(
      items => itemsCount = items.length,
      err => console.error('Error: ' + err),
    );

    expect(itemsCount).toBe(3, 'Remove item.');
  });

  it('Adding a note works correctly. [specification-features-notes-actions-adding-a-note]', () => {
    fixture.detectChanges();

    // Initial state
    let itemsCount: number;

    itemService.getItems().subscribe(
      items => itemsCount = items.length,
      err => console.error('Error: ' + err),
    );

    expect(itemsCount).toBe(3, 'Initial storage item count.');

    const table: HTMLTableElement = fixture.nativeElement.querySelector('table');
    expect(table).toBeDefined();
    expect(table.rows.length - 1).toBe(3, 'Initial table item count.');

    // Add item
    const textArea: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');
    expect(textArea).toBeDefined();
    textArea.click();

    const text = 'Newly added item.';
    textArea.value = text;

    const btnPost = TestUtil.getElementByTextContent(fixture.nativeElement, 'button', 'Post');
    btnPost.click();

    let addedItem: Item;

    itemService.getItem('4').subscribe(
      item => addedItem = item,
      err => console.error('Error: ' + err),
    );

    expect(addedItem.text).toBe(text, 'Added item text.');

    itemService.getItems().subscribe(
      items => itemsCount = items.length,
      err => console.error('Error: ' + err),
    );

    expect(itemsCount).toBe(4, 'Storage item count after add.');

    // TODO: changes need to be reflected in the list
    // fixture.detectChanges();
    // expect(table.rows.length - 1).toBe(4, 'Table item count after add.');
  });

});
