import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ViewChild,
} from '@angular/core';

import {
  MatSidenav,
  MatSnackBar
} from '@angular/material';

import { AuthService } from '../../../auth/services/auth-service';
import { NoteService } from '../../services/note.service';
import { GuiService } from '../../services/gui.service';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MainComponent implements OnInit {


  @ViewChild('sidenav')
  private __sidenav: MatSidenav;

  constructor(
    public guiService: GuiService,
    public authService: AuthService,
    public noteService: NoteService,
    private __snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.guiService.init(this.__sidenav, this.__snackBar);
    this.noteService.startSync();
  }

  showAbout() {
    this.guiService.showNotification('Updated: 04.09.2018 20:01');
  }
}
