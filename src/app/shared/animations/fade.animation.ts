import { animate, query, style, transition, trigger } from "@angular/animations";

// Source: https://stackoverflow.com/questions/47805954/angular-5-fade-animation-during-routing-css
export const fadeAnimation = trigger('fadeAnimation', [
  transition('* => *', [
    query(':enter', [
      style({
        opacity: 0,
        // position: 'absolute',
        width: '100%',
        height: '100%'
      })
    ], { optional: true }),
    query(':leave', [
      style({
        opacity: 1,
        position: 'absolute',
        width: '100%',
        height: '100%'
      }),
      animate('250ms', style({ opacity: 0 }))
    ], { optional: true }),
    query(':enter', [
      style({
        opacity: 0,
        position: 'relative',
        width: '100%',
        height: '100%'
      }),
      animate('250ms', style({ opacity: 1 }))
    ], { optional: true })
  ])
]);
