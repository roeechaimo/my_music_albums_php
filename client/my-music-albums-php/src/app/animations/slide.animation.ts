import { animate, state, style, transition, trigger } from '@angular/animations';
export const SLIDE_ANIMATION =
  trigger('slideAnimation', [
    state('inFromLeft', style({
      transform: 'translateX(0)'
    })),
    state('outFromLeft', style({
      transform: 'translateX(-110%)'
    })),
    state('inFromRight', style({
      transform: 'translateX(0)'
    })),
    state('outFromRight', style({
      transform: 'translateX(101%)'
    })),
    transition('outFromLeft => inFromLeft', animate('500ms ease-in-out')),
    transition('outFromRight => inFromRight', animate('500ms ease-in-out')),
    transition('inFromRight => outFromRight', animate('500ms ease-in-out'))
  ]);
