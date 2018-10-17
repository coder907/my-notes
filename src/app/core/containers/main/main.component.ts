import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ViewChild,
} from '@angular/core';

import { Router } from '@angular/router';

import {
  MatSidenav,
  MatSnackBar
} from '@angular/material';

import { Observable } from 'rxjs';

import { AuthService } from '../../../auth/services/auth-service';
import { NoteService } from '../../../notes/services/note.service';
import { TagService } from '../../../tags/services/tag.service';
import { GuiService } from '../../services/gui.service';

import { combineLatest } from 'rxjs';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MainComponent implements OnInit {

  isRemoveButtonVisible$: Observable<boolean>;

  @ViewChild('sidenav')
  private __sidenav: MatSidenav;

  constructor(
    public guiService: GuiService,
    public authService: AuthService,
    public __noteService: NoteService,
    public __tagService: TagService,
    private __router: Router,
    private __snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.guiService.init(this.__sidenav, this.__snackBar);

    this.isRemoveButtonVisible$ = combineLatest(
      this.__noteService.editedNote$,
      this.__tagService.editedTag$,

      (editedNote, editedTag) => {
        if (editedNote || editedTag) {
          return true;

        } else {
          return false;
        }
      }
    );
  }

  removeEditedItem() {
    const url = this.__router.url;

    if (url === '/notes') {
      this.__noteService.removeEditedNote();

    } else if (url === '/tags') {
      this.__tagService.removeEditedTag();
    }
  }

  showAbout() {
    this.guiService.showNotification('Updated: 17.10.2018 21:35');
  }
}
