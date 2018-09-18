import { animate, style, transition, trigger } from '@angular/animations';

export const fadeInAnimation = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('0.2s 2s ease-out', style({ opacity: 1 }))
  ])
]);
