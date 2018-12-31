import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';

// Highlight the list item when clicked
export const markedStateTrigger = trigger('markedState', [
  state('default', style({
    'border': '1px solid black',
    'background-color': 'transparent',
    'padding': '20px'
  })),
  state('marked', style({
    'border': '2px solid blue',
    'background-color': '#caeff9',
    'padding': '19px'
  })),
  transition('default => marked', [
    style({ // Starting styles
      'border': '2px solid black',
      'padding': '19px'
    }),
    animate('200ms ease-out', style({ // Goes big
      'transform': 'scale(1.05)'
    })),
    animate('200ms ease-out', style({ // Goes to normal position
      'transform': 'scale(1)'
    }))
  ]),
  transition('marked => default', [
    style({ // Starting styles
      'border': '1px solid blue',
      'padding': '20px'
    }),
    animate('300ms ease-out')
  ])
]);

// Sliding the list
export const itemStateTrigger = trigger('itemState', [
  transition(':enter', [
    animate('1000ms ease-out', keyframes([
      style({
        'opacity': 0,
        'transform': 'translateX(-100%)',
        offset: 0
      }),
      style({
        'opacity': 1,
        'transform': 'translateX(15%)',
        offset: 0.4
      }),
      style({
        'opacity': 1,
        'transform': 'translateX(0)',
        offset: 1
      }),
    ]))
  ]),
  transition(':leave', [
    animate('600ms ease-out', keyframes([
      style({
        'opacity': 1,
        'transform': 'translateX(0)',
        offset: 0
      }),
      style({
        'opacity': 1,
        'transform': 'translateX(-15%)',
        offset: 0.4
      }),
      style({
        'opacity': 0,
        'transform': 'translateX(100%)',
        offset: 1
      }),
    ]))
  ]),
  // Transitions to move the list element with the slideStateTrigger
  transition('slidUp => slidDown', [
    style({
      'transform': 'translateY(-100%)',
    }),
    animate('300ms ease-out', style({
      'transform': 'translateY(0)'
    }))
  ]),
  transition('slidDown => slidUp', [
    style({
      'transform': 'translateY(0)',
    }),
    animate('300ms ease-out', style({
      'transform': 'translateY(-100%)'
    }))
  ]),
]);

// Remember this is on block elements.
// Slide up and down the new item's form
export const slideStateTrigger = trigger('slideState', [
  transition(':enter', [
    style({
      // We are going to animate from not being there to slide it to position
      'transform': 'translateY(-100%)' // 0 is the final state
    }),
    animate('300ms ease-out', style({
      'transform': 'translateY(0)',
    }))
  ]),
  transition(':leave', [
    style({
      // We are going to animate from not being there to slide it to position
      'transform': 'translateY(0)' // 0 is the final state
    }),
    animate('300ms ease-out', style({
      'transform': 'translateY(-100%)',
    }))
  ])
]);

// Animate button depending on form state
export const buttonStateTrigger = trigger('buttonState', [
  state('valid', style({
    'background-color': 'lightgreen',
    'border-color': 'green',
    color: 'green'
  })),
  state('invalid', style({
    'background-color': 'red',
    'border-color': 'darkred',
    'color': 'white'
  })),
  transition('invalid => valid', [
    group([
      animate(100, style({
        'transform': 'scale(1.1)',
      })),
      animate(200, style({
        'background-color': 'lightgreen',
      }))
    ]),
    animate(200, style({
      'transform': 'scale(1)'
    }))
  ]),
  transition('valid => invalid', [
    group([
      animate(100, style({
        'transform': 'scale(1.1)',
      })),
      animate(200, style({
        'background-color': 'red',
      }))
    ]),
    animate(200, style({
      'transform': 'scale(1)'
    }))
  ])
]);
