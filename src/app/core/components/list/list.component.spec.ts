import { DebugElement } from '@angular/core';

import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { name } from 'src/app/shared/utils/test-util';
import * as guiTestUtil from 'src/app/shared/utils/gui-test-util';

// import { CoreMaterialModule } from '../../core-material.module';
import { CoreComponentsModule } from '../../core-components.module';
import { ListComponent } from './list.component';
import { ColumnFormat } from './models/column-format';



enum TestEnum {
  Value1,
  Value2,
  Value3,
}

const firstColumnWidth = 200;

const testColumnDefinitions = [
  {
    name: 'textColumn',
    description: 'Text Column',
    format: ColumnFormat.Text,
    width: `${firstColumnWidth}px`,
    sort: 'asc',
  },
  {
    name: 'datetimeColumn',
    description: 'Datetime Column',
    format: ColumnFormat.Datetime,
    sort: 'asc'
  },
  {
    name: 'enumColumn',
    description: 'Enum Column',
    format: ColumnFormat.Enum,
    enum: TestEnum,
  },
];

interface TestItem {
  id: number;
  textColumn: string;
  datetimeColumn: number;
  enumColumn: TestEnum;
}

const testItems: TestItem[] = [
  {
    id: 1,
    textColumn: 'Text 1',
    datetimeColumn: Date.now(),
    enumColumn: TestEnum.Value1,
  },
  {
    id: 2,
    textColumn: 'Text 2',
    datetimeColumn: Date.now(),
    enumColumn: TestEnum.Value2,
  },
  {
    id: 3,
    textColumn: 'Text 3',
    datetimeColumn: Date.now(),
    enumColumn: TestEnum.Value3,
  },
];

describe(name(ListComponent), () => {
  let component: ListComponent<TestItem>;
  let fixture: ComponentFixture<ListComponent<TestItem>>;
  let table: HTMLTableElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        // CoreMaterialModule,
        CoreComponentsModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent<ListComponent<TestItem>>(ListComponent);
    component = fixture.componentInstance;
    table = getTable().nativeElement;
  });

  it('Is created.', () => {
    expect(component).toBeTruthy();
  });

  function getTable(): DebugElement {
    return guiTestUtil.query(fixture.debugElement, 'table') as DebugElement;
  }

  function getNoItemsLabel(): DebugElement {
    return guiTestUtil.query(fixture.debugElement, '.list-no-items-container') as DebugElement;
  }

  function loadTestData(editedItem: TestItem = null) {
    component.columnDefinitions = testColumnDefinitions;
    component.items = testItems;
    component.editedItem = editedItem;
    fixture.detectChanges();
  }

  function loadEmptyData(noItemsLabel: string = null) {
    component.columnDefinitions = testColumnDefinitions;
    component.items = [];
    if (noItemsLabel) {
      component.noItemsLabel = noItemsLabel;
    }
    fixture.detectChanges();
  }

  function tableHeaderData(cellIndex: number, sanitize = true): string {
    let text = table.rows[0].cells[cellIndex].textContent;

    if (sanitize) {
      text = text.replace('arrow_downward', '');
      text = text.trim();
    }

    return text;
  }

  function tableBodyData(rowIndex: number, cellIndex: number, sanitize = true): string {
    let text = table.rows[rowIndex + 1].cells[cellIndex].textContent;

    if (sanitize) {
      text = text.trim();
    }

    return text;
  }

  function rowIsSelected(rowIndex: number): boolean {
    return table.rows[rowIndex + 1].classList.contains('list-row-selected');
  }

  it('Test data works.', () => {
    loadTestData();

    expect(table.rows.length).toEqual(4);
    expect(table.rows[0].cells.length).toEqual(3);

    expect(tableHeaderData(0)).toEqual(testColumnDefinitions[0].description);
    expect(tableHeaderData(1)).toEqual(testColumnDefinitions[1].description);
    expect(tableHeaderData(2)).toEqual(testColumnDefinitions[2].description);

    expect(tableBodyData(0, 0)).toEqual(testItems[0].textColumn);
    expect(tableBodyData(0, 1)).toEqual(component.formatDatetime(testItems[0].datetimeColumn));
    expect(tableBodyData(0, 2)).toEqual(component.formatEnum(testItems[0].enumColumn, testColumnDefinitions[2]));
    expect(tableBodyData(1, 0)).toEqual(testItems[1].textColumn);
    expect(tableBodyData(1, 1)).toEqual(component.formatDatetime(testItems[1].datetimeColumn));
    expect(tableBodyData(1, 2)).toEqual(component.formatEnum(testItems[1].enumColumn, testColumnDefinitions[2]));
    expect(tableBodyData(2, 0)).toEqual(testItems[2].textColumn);
    expect(tableBodyData(2, 1)).toEqual(component.formatDatetime(testItems[2].datetimeColumn));
    expect(tableBodyData(2, 2)).toEqual(component.formatEnum(testItems[2].enumColumn, testColumnDefinitions[2]));

    expect(getNoItemsLabel()).not.toBeTruthy();
  });

  it('Emtpy data works.', () => {
    loadEmptyData();

    expect(getNoItemsLabel()).toBeTruthy();
  });

  it('Emtpy data with custom no items label works.', () => {
    const noItemsLabel = 'No items';
    loadEmptyData(noItemsLabel);

    const noItemsLabelElement = getNoItemsLabel();
    expect(noItemsLabelElement).toBeTruthy();
    expect(noItemsLabelElement.nativeElement.textContent.trim()).toEqual(noItemsLabel);
  });

  it('Column width works.', () => {
    loadTestData();

    expect(table.rows[0].cells[0].offsetWidth).toEqual(firstColumnWidth);
  });

  it('Start editing event emits.', (done) => {
    loadTestData();

    component.startEditing.subscribe((id: number) => {
      expect(id).toEqual(testItems[0].id);
      done();
    });

    guiTestUtil.dblclick(table.rows[1].cells[0]);
  });

  it('Setting edited item works.', () => {
    const index = 0;
    loadTestData(testItems[index]);

    expect(rowIsSelected(index)).toEqual(true);
  });
});
