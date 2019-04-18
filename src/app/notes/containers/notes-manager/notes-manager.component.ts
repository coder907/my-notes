import {
  Component,
  OnDestroy,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';

import { Subscription } from 'rxjs';

import { NotesService } from '../../services/notes.service';
import { GuiService } from 'src/app/core/services/gui.service';
import { ColumnDefinition } from '../../../core/components/list/models/column-definition';
import { ColumnFormat } from '../../../core/components/list/models/column-format';
import { ListDefinition } from 'src/app/core/components/list/models/list-definition';



@Component({
  selector: 'app-notes-manager',
  templateUrl: './notes-manager.component.html',
  styleUrls: ['./notes-manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesManagerComponent implements OnInit, OnDestroy  {

  listDefinition: ListDefinition;
  columnDefinitions: ColumnDefinition[];

  isHandsetSubscription: Subscription;

  constructor(
    public readonly notesService: NotesService,
    public readonly guiService: GuiService,
    changeDetector: ChangeDetectorRef,
  ) {
    this.isHandsetSubscription = guiService.isHandset$.subscribe(
      (isHandset) => {
        this.updateListDefinition(isHandset);
        this.updateColumnDefinitions(isHandset);
        changeDetector.markForCheck();
      }
    );
  }

  updateListDefinition(isHandset: boolean) {
    let height: string;
    let hideHeader = false;

    if (isHandset) {
      height = 'calc(73vh - 74px)';
      hideHeader = true;
    } else {
      height = 'calc(80vh - 88px)';
    }

    this.listDefinition = {
      height,
      hideHeader,
    };
  }

  updateColumnDefinitions(isHandset: boolean) {
    const columnDefinitions: ColumnDefinition[] = [];

    if (!isHandset) {
      columnDefinitions.push({
        name: 'createdTs',
        description: 'Created',
        format: ColumnFormat.Datetime,
        width: '25%',
        sort: 'desc',
      });
    }

    columnDefinitions.push({
      name: 'text',
      description: 'Text',
      format: ColumnFormat.Text,
    });

    this.columnDefinitions = columnDefinitions;
  }

  save(text: string) {
    this.notesService.addOrUpdateNote(text);
  }

  ngOnInit() {
    this.notesService.syncNotes();
  }

  ngOnDestroy() {
    this.notesService.stopEditing();
    this.unsubscribeAll();
  }

  unsubscribeAll() {
    if (this.isHandsetSubscription) {
      this.isHandsetSubscription.unsubscribe();
    }
  }
}
