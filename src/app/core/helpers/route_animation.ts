import {
  trigger,
  animate,
  transition,
  style,
  query,
} from '@angular/animations';

const FADDING_EFFECT = '0.2s';
export const fadeAnimation = trigger('fadeAnimation', [
  transition('* => *', [
    query(':enter', [style({ opacity: 0, position: 'absolute' })], {
      optional: true,
    }),
    query(
      ':leave',
      [
        style({ opacity: 1 }),
        animate(FADDING_EFFECT, style({ opacity: 0, position: 'absolute' })),
      ],
      { optional: true }
    ),
    query(
      ':enter',
      [
        style({ opacity: 0 }),
        animate(FADDING_EFFECT, style({ opacity: 1, position: 'relative' })),
      ],
      { optional: true }
    ),
  ]),
]);
