import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tooltip-overlay',
  templateUrl: './tooltip-overlay.component.html',
  styleUrls: ['./tooltip-overlay.component.scss']
})
export class TooltipOverlayComponent {
  @Input() text: string = '';

}



