import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
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
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesManagerComponent implements OnInit, OnDestroy  {

  listDefinition: ListDefinition;
  columnDefinitions: ColumnDefinition[];

  __isHandsetSubscription: Subscription;

  constructor(
    public noteService: NoteService,
    public guiService: GuiService,
  ) {
    this.__isHandsetSubscription = guiService.isHandset$.subscribe(
      (breakpointState) => {
        const isHandset = breakpointState.matches;

        this.__updateListDefinition(isHandset);
        this.__updateColumnDefinitions(isHandset);
      }
    );
  }

  __updateListDefinition(isHandset: boolean) {
    let height;

    if (isHandset) {
      height = 'calc(73vh - 74px)';
    } else {
      height = 'calc(80vh - 88px)';
    }

    this.listDefinition = {
      height,
    };
  }

  __updateColumnDefinitions(isHandset: boolean) {
    const columnDefinitions = [];

    if (!isHandset) {
      columnDefinitions.push({
        name: 'updated',
        description: 'Updated',
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

  ngOnInit() {
    this.noteService.startSync();
  }

  post(text: string) {
    this.noteService.addOrUpdateNote(text);
  }

  ngOnDestroy() {
    this.noteService.stopEditing();
    this.unsubscribeAll();
  }

  unsubscribeAll() {
    if (this.__isHandsetSubscription !== null) {
      this.__isHandsetSubscription.unsubscribe();
    }
  }
}
