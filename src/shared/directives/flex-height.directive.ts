// import {
//   Directive,
//   ElementRef,
//   HostListener,
// } from '@angular/core';



// @Directive({
//   selector: '[appFlexHeight]'
// })
// export class FlexHeightDirective {

//   constructor(
//     private __element: ElementRef
//   ) {}

//   @HostListener('window:resize')
//   onResize() {
//     this.resize();
//   }

//   @HostListener('document:DOMContentLoaded')
//   onDOMContentLoaded() {
//     this.resize();
//   }

//   resize() {
//     const nativeElement = this.__element.nativeElement;
//     nativeElement.style.height = (document.body.offsetHeight - nativeElement.offsetTop) + 'px';
//   }
// }
