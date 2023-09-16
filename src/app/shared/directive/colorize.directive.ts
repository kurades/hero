import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appColorize]'
})
export class ColorizeDirective implements OnInit {
  @Input() colorValue = '';
  constructor (private host: ElementRef) {}

  ngOnInit (): void {
    console.count(this.colorValue)
    this.host.nativeElement.style.backgroundColor = this.stringToColour(
      this.colorValue
    );
  }
  stringToColour (str: string): string {
    let hash = 0;
    str.split('').forEach(char => {
      hash = char.charCodeAt(0) + ((hash << 5) - hash);
    });
    let colour = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      colour += value.toString(16).padStart(2, '0');
    }
    return colour;
  }
}
