import {
  Component,
  ChangeDetectionStrategy
} from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/services/auth.service';
import { GuiService } from '../../services/utility/gui.service';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {

  constructor(
    public readonly authService: AuthService,
    public readonly guiService: GuiService,
    private readonly router: Router,
  ) { }

  navigate(link: string) {
    this.router.navigate([link]);

    if (!this.guiService.isWidescreen) {
      this.guiService.closeSidenav();
    }
  }
}
