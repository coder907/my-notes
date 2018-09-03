import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { GuiService } from '../../services/gui.service';
import { take } from 'rxjs/operators';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  {

  constructor(
    private __router: Router,
    private __guiService: GuiService,
  ) {}

  async navigate(link: string) {
    this.__router.navigate([link]);

    const isHandset = (await this.__guiService.isHandset$.pipe(take(1)).toPromise()).matches; // TODO: does this really make sense?

    if (isHandset) {
      this.__guiService.closeSidenav();
    }
  }
}
