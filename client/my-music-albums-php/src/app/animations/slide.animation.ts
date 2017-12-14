import { animate, state, style, transition, trigger } from '@angular/animations';
export const SLIDE_ANIMATION =
  trigger('slideAnimation', [
    state('in', style({
      transform: 'translateX(0)'
    })),
    state('out', style({
      transform: 'translateX(-110%)'
    })),
    transition('out => in', animate('800ms ease-in-out'))
  ]);
