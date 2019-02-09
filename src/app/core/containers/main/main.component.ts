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
import { map } from 'rxjs/operators';

import { AuthService } from '../../../auth/services/auth-service';
import { NoteService } from '../../../notes/services/note.service';
import { GuiService } from '../../services/gui.service';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MainComponent implements OnInit {

  isRemoveButtonVisible$: Observable<boolean>;

  @ViewChild('sidenav')
  private sidenav: MatSidenav;

  constructor(
    public guiService: GuiService,
    public authService: AuthService,
    public noteService: NoteService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.guiService.init(this.sidenav, this.snackBar);

    this.isRemoveButtonVisible$ = this.noteService.editedNote$.pipe(
      map((editedNote) => {
        if (editedNote) {
          return true;

        } else {
          return false;
        }
      })
    );
  }

  removeEditedItem() {
    const url = this.router.url;

    if (url === '/notes') {
      this.noteService.removeEditedNote();
    }
  }

  showAbout() {
    this.guiService.showNotification('Updated: 17.10.2018 21:35');
  }
}
