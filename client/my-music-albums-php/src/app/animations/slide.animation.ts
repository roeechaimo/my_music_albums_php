import { animate, state, style, transition, trigger } from '@angular/animations';
//@TODO - make animation work
export const SLIDE_ANIMATION =
  trigger('slideAnimation', [
    state('in', style({
      transform: 'translateY(0)'
    })),
    state('out', style({
      transform: 'translateY(500px)'
    })),
    transition('out => in', animate('800ms ease-in-out'))
  ]);
