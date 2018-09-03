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
import { GuiService } from '../../services/gui.service';
import { NoteService } from '../../services/note.service';



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
    private __snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.guiService.init(this.__sidenav, this.__snackBar);
  }

  signOut() {
    this.authService.signOut();
  }

  showAbout() {
    this.guiService.showNotification('Updated: 03.09.2018 12:30');
  }
}
