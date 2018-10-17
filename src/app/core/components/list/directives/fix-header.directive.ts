import {
  Directive,
  ElementRef,
  OnInit,
} from '@angular/core';



@Directive({
  selector: '[appFixHeader]'
})
export class FixHeaderDirective implements OnInit {

  constructor(
    private __element: ElementRef
  ) {}

  ngOnInit () {
    const listContainer = this.__element.nativeElement.firstChild;

    const fixHeader = function () {
      const ths = listContainer.getElementsByTagName('th');

      for (let i = 0, len = ths.length; i < len; i++) {
        const thStyle = ths[i].style;

        if (thStyle.position !== 'relative') {
          thStyle.position = 'relative';
        }

        thStyle.top = listContainer.scrollTop + 'px';
      }
    };

    listContainer.onscroll = fixHeader;
    listContainer.onresize = fixHeader;
  }
}
