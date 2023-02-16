import {
  trigger,
  animate,
  transition,
  style,
  query,
} from '@angular/animations';

const DURATION = '0.3s';
export const fadeAnimation = trigger('fadeAnimation', [
  transition('* => *', [
    query(':enter', [style({ opacity: 0, position: 'absolute' })], {
      optional: true,
    }),
    query(
      ':leave',
      [
        style({ opacity: 1 }),
        animate(DURATION, style({ opacity: 0, position: 'absolute' })),
      ],
      { optional: true }
    ),
    query(
      ':enter',
      [
        style({ opacity: 0 }),
        animate(DURATION, style({ opacity: 1, position: 'relative' })),
      ],
      { optional: true }
    ),
  ]),
]);
