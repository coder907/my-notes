import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';

import { NoteService } from '../../services/note.service';
import { ColumnDefinition } from '../../../core/components/list/models/column-definition';
import { ColumnFormat } from '../../../core/components/list/models/column-format';
import { ListDefinition } from 'src/app/core/components/list/models/list-definition';



@Component({
  selector: 'app-notes-manager',
  templateUrl: './notes-manager.component.html',
  styleUrls: ['./notes-manager.component.scss'],
})
export class NotesManagerComponent implements OnInit, OnDestroy  {

  listDefinition: ListDefinition = {
    height: 'calc(80vh - 88px)',
  };

  columnDefinitions: ColumnDefinition[] = [
    {
      name: 'updated',
      description: 'Updated',
      format: ColumnFormat.Datetime,
      width: '15%',
    },
    {
      name: 'text',
      description: 'Text',
      format: ColumnFormat.Text,
    },
  ];

  constructor(
    public noteService: NoteService,
  ) {}

  ngOnInit() {
    this.noteService.startSync();
  }

  post(text: string) {
    this.noteService.addOrUpdateNote(text);
  }

  ngOnDestroy() {
    this.noteService.stopEditing();
  }
}
