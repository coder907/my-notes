import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of, BehaviorSubject } from 'rxjs';

import { TestUtil, name } from '../../../../shared/test-util';
import { MaterialModule } from '../../../material.module';
import { AppComponent } from './app.component';
import { PostComponent } from '../post/post.component';
import { ListComponent } from '../list/list.component';
import { DblClickOrPressDirective } from '../../../../shared/directives/dblclickorpress.directive';
import { FixHeaderDirective } from '../list/directives/fix-header.directive';
import { Item } from '../../models/item';
import { ItemService } from '../../services/item.service';



class ItemServiceStub {
  nextId = 4;

  items = [
    { id: '1', text: 'Text 1', added: new Date().getTime(), updated: new Date().getTime() },
    { id: '2', text: 'Text 2', added: new Date().getTime(), updated: new Date().getTime() },
    { id: '3', text: 'Text 3', added: new Date().getTime(), updated: new Date().getTime() },
  ] as Item[];

  items$ = new BehaviorSubject<Item[]>(this.items);

  getItems(): Observable<Item[]> {
    return this.items$.asObservable();
  }

  getItem(id: string): Observable<Item> {
    return of(this.items.find(item => item.id === id));
  }

  addItem(text: string): void {
    this.items = this.items.concat([{
        id: '' + (this.nextId++),
        text,
        added: new Date().getTime(),
        updated: new Date().getTime(),
      }
    ]);

    this.items$.next(this.items);
  }

  updateItem(id: string, text: string): void {
    const itemForUpdate = this.items.find(item => item.id === id);
    itemForUpdate.text = text;
    itemForUpdate.updated = new Date().getTime();

    this.items$.next(this.items);
  }

  removeItem(id: string): void {
    this.items.splice(
      this.items.findIndex(item => item.id === id),
      1
    );

    this.items$.next(this.items);
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

  it(name(ItemServiceStub) + ' works correctly.', () => {
    expect(itemService).toBeDefined();

    let itemsCount = TestUtil.getObservableLength(itemService.getItems());
    expect(itemsCount).toBe(3, 'Initial state.');

    // Add item
    itemService.addItem('Text 4');

    itemsCount = TestUtil.getObservableLength(itemService.getItems());
    expect(itemsCount).toBe(4, 'Add item.');

    // Update item
    const editId = '1';
    const editText = 'Text 1 edited.';

    itemService.updateItem(editId, editText);

    itemsCount = TestUtil.getObservableLength(itemService.getItems());
    expect(itemsCount).toBe(4, 'Update item.');

    const editedItem = TestUtil.getObservableObject(itemService.getItem(editId));
    expect(editedItem.text).toBe(editText, 'Update item.');

    // Remove item
    itemService.removeItem('1');

    itemsCount = TestUtil.getObservableLength(itemService.getItems());
    expect(itemsCount).toBe(3, 'Remove item.');
  });

  it('Initial state is correct.', () => {
    fixture.detectChanges();

    const itemsCount = TestUtil.getObservableLength(itemService.getItems());
    expect(itemsCount).toBe(3, 'Initial storage item count.');

    const table: HTMLTableElement = fixture.nativeElement.querySelector('table');
    expect(table).toBeDefined();
    expect(table.rows.length - 1).toBe(3, 'Initial table item count.');

    const item1: Item = TestUtil.getObservableObject(itemService.getItem('1'));
    const tdItem1 = TestUtil.getElementByTextContent(fixture.nativeElement, 'td', item1.text);
    expect(tdItem1).toBeDefined();

    const item2: Item = TestUtil.getObservableObject(itemService.getItem('2'));
    const tdItem2 = TestUtil.getElementByTextContent(fixture.nativeElement, 'td', item2.text);
    expect(tdItem2).toBeDefined();

    const item3: Item = TestUtil.getObservableObject(itemService.getItem('3'));
    const tdItem3 = TestUtil.getElementByTextContent(fixture.nativeElement, 'td', item3.text);
    expect(tdItem3).toBeDefined();
  });

  it('Adding a note works correctly. [specification-features-notes-actions-adding-a-note]', () => {
    fixture.detectChanges();

    const textArea: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');
    expect(textArea).toBeDefined();
    textArea.click();

    const text = 'Newly added item.';
    textArea.value = text;

    const btnPost = TestUtil.getElementByTextContent(fixture.nativeElement, 'button', 'Post');
    btnPost.click();

    const addedItem: Item = TestUtil.getObservableObject(itemService.getItem('4'));
    expect(addedItem.text).toBe(text, 'Added item text.');

    const itemsCount = TestUtil.getObservableLength(itemService.getItems());
    expect(itemsCount).toBe(4, 'Storage item count after add.');

    fixture.detectChanges();

    const table: HTMLTableElement = fixture.nativeElement.querySelector('table');
    expect(table.rows.length - 1).toBe(4, 'Table item count after add.');
  });

  it('Updating a note works correctly. [specification-features-notes-actions-updating-a-note]', () => {
    fixture.detectChanges();

    let item1: Item = TestUtil.getObservableObject(itemService.getItem('1'));
    let tdItem1 = TestUtil.getElementByTextContent(fixture.nativeElement, 'td', item1.text);
    expect(tdItem1.textContent.trim()).toBe(item1.text, 'Select table cell.');

    TestUtil.dblclick(tdItem1);
    fixture.detectChanges();

    const textArea: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');
    const newText = textArea.value + ' (edited)';
    textArea.value = newText;

    const btnPost = TestUtil.getElementByTextContent(fixture.nativeElement, 'button', 'Post');
    btnPost.click();
    fixture.detectChanges();

    const itemsCount = TestUtil.getObservableLength(itemService.getItems());
    expect(itemsCount).toBe(3, 'Storage item count after update.');

    item1 = TestUtil.getObservableObject(itemService.getItem('1'));
    expect(item1.text).toBe(newText, 'Updated item text.');

    tdItem1 = TestUtil.getElementByTextContent(fixture.nativeElement, 'td', item1.text);
    expect(tdItem1.textContent.trim()).toBe(newText, 'Select updated table cell.');
  });

  it('Removing a note works correctly. [specification-features-notes-actions-removing-a-note]', () => {
    fixture.detectChanges();

    const item1: Item = TestUtil.getObservableObject(itemService.getItem('1'));
    const tdItem1 = TestUtil.getElementByTextContent(fixture.nativeElement, 'td', item1.text);
    expect(tdItem1.textContent.trim()).toBe(item1.text, 'Select table cell.');

    TestUtil.dblclick(tdItem1);
    fixture.detectChanges();

    const btnDelete = TestUtil.getElementByTextContent(fixture.nativeElement, 'button', 'delete');
    btnDelete.click();
    fixture.detectChanges();

    const itemsCount = TestUtil.getObservableLength(itemService.getItems());
    expect(itemsCount).toBe(2, 'Storage item count after remove.');
  });

});
