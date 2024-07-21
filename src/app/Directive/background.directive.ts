import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBackground]'
})
export class BackgroundDirective implements OnInit{

  constructor(private element:ElementRef,private renderer:Renderer2) { }

  ngOnInit(): void {
    this.renderer.setStyle(this.element.nativeElement, 'width', '20vh');
    this.renderer.setStyle(this.element.nativeElement, 'margin-top', '-6%');
    this.renderer.setStyle(this.element.nativeElement, 'margin', '0% -52vh');
    this.renderer.setStyle(this.element.nativeElement, 'padding', '20vh 129vh');
    this.renderer.setStyle(this.element.nativeElement, 'color', 'rgb(0, 0, 0)');
    this.renderer.setStyle(this.element.nativeElement, 'background-color', 'white');
    this.renderer.setStyle(this.element.nativeElement, 'height', '100%');
    this.renderer.setStyle(this.element.nativeElement, 'text-align', 'left');
    

  }
  }
  

