import {
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Router } from '@angular/router';

import { take } from 'rxjs/operators';

import { GuiService } from '../../services/gui.service';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
