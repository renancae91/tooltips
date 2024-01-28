import { ComponentRef, Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { ConnectionPositionPair, Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { TooltipOverlayComponent } from './tooltip-overlay.component';
import { ComponentPortal } from '@angular/cdk/portal';

@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective implements OnInit{
  @Input('tooltip') text = '';
  private overlayRef!: OverlayRef;
  private tooltipRef!: ComponentRef<TooltipOverlayComponent>;
  

  constructor(
    private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder,
    private elementRef: ElementRef,
    
  ) { }

  ngOnInit(): void {
    const positionStrategy = this.overlayPositionBuilder.flexibleConnectedTo(this.elementRef).withPositions([
      //baixo
      new ConnectionPositionPair(
        { originX: 'center', originY: 'bottom' },
        { overlayX: 'center', overlayY: 'top' },
        0,
        10
      ),
      //cima
      new ConnectionPositionPair(
        { originX: 'center', originY: 'top' },
        { overlayX: 'center', overlayY: 'bottom' },
        0,
        -10
      ),
      //esquerda
      new ConnectionPositionPair(
        { originX: 'start', originY: 'center' },
        { overlayX: 'end', overlayY: 'center' },
        -10,
        0
      ),
      //direita
      new ConnectionPositionPair(
        { originX: 'end', originY: 'center' },
        { overlayX: 'start', overlayY: 'center' },
        10,
        0
      ),
    ]);
    this.overlayRef = this.overlay.create({ positionStrategy });
  }
  // mostra a tooltip na tela
  @HostListener('mouseenter')
  show() { 
  const text = this.elementRef.nativeElement.innerText;
  if (text.length > 10) {
    this.tooltipRef = this.overlayRef.attach(new ComponentPortal(TooltipOverlayComponent));
    this.tooltipRef.instance.text = text;
  }
}
  //destrou a tooltip quando o mouse deixa o botão
  @HostListener('mouseout')
  hide() {
    if(this.tooltipRef){
      this.tooltipRef.destroy();
      this.overlayRef.detach();
    }
  }
}

