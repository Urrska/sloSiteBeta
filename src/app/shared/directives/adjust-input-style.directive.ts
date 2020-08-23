import {Directive, Renderer2, ElementRef} from '@angular/core';

@Directive({
  selector: '[appAdjustInputStyle]'
})
export class AdjustInputStyleDirective {
  constructor(private renderer: Renderer2, private el: ElementRef) {

  }
}
