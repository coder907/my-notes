import {
  Component,
  OnDestroy,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';

import { Subscription } from 'rxjs';

import { NoteService } from '../../services/note.service';
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
    public readonly noteService: NoteService,
    public readonly guiService: GuiService,
  ) {
    this.isHandsetSubscription = guiService.isHandset$.subscribe(
      (isHandset) => {
        this.updateListDefinition(isHandset);
        this.updateColumnDefinitions(isHandset);
      }
    );
  }

  updateListDefinition(isHandset: boolean) {
    let height: string;

    if (isHandset) {
      height = 'calc(73vh - 74px)';
    } else {
      height = 'calc(80vh - 88px)';
    }

    this.listDefinition = {
      height,
    };
  }

  updateColumnDefinitions(isHandset: boolean) {
    const columnDefinitions: ColumnDefinition[] = [];

    if (!isHandset) {
      columnDefinitions.push({
        name: 'createdTs',
        description: 'Created',
        format: ColumnFormat.Datetime,
        width: '15%',
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
    this.noteService.addOrUpdateNote(text);
  }

  ngOnInit() {
    this.noteService.startSync();
  }

  ngOnDestroy() {
    this.noteService.stopEditing();
    this.unsubscribeAll();
  }

  unsubscribeAll() {
    if (this.isHandsetSubscription !== null) {
      this.isHandsetSubscription.unsubscribe();
    }
  }
}
