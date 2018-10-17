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
    public guiService: GuiService,
    private __router: Router,
  ) {}

  async navigate(link: string) {
    this.__router.navigate([link]);

    const isHandset = (await this.guiService.isHandset$.pipe(take(1)).toPromise()).matches; // TODO: does this really make sense?

    if (isHandset) {
      this.guiService.closeSidenav();
    }
  }
}
