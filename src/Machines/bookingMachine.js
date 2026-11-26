import { createMachine, assign } from 'xstate';

const bookingMachine = createMachine(
  {
    id: 'buy plane tickets',
    initial: 'initial',
    context: {
      passengers: [],
      selectedCountry: '',
    },
    states: {
      initial: {
        on: {
          START: {
            target: 'search',
          },
        },
      },
      search: {
        on: {
          CONTINUE: {
            target: 'passengers',
            actions: assign({
              selectedCountry: ({ event }) => event.selectedCountry,
            }),
          },
          CANCEL: {
            target: 'initial',
            actions: assign({
              passengers: [],
              selectedCountry: '',
            }),
          },
        },
      },
      passengers: {
        on: {
          DONE: 'tickets',
          CANCEL: {
            target: 'initial',
            actions: assign({
              passengers: [],
              selectedCountry: '',
            }),
          },
          ADD: {
            target: 'passengers',
            actions: assign({
              passengers: ({ context, event }) => [
                ...context.passengers,
                event.NewPassenger,
              ],
            }),
          },
        },
      },
      tickets: {
        on: {
          FINISH: {
            target: 'initial',
            actions: assign({
              passengers: [],
              selectedCountry: '',
            }),
          },
        },
      },
    },
  },
  {
    actions: {
      printInitial: () => {
        console.log('Iniciando la compra de boletos de avión...');
      },
      printEntry: () => {
        console.log('Iniciando el estado de búsqueda...');
      },
      printExit: () => {
        console.log('Saliendo del estado de búsqueda...');
      }
    },
  }
);

export default bookingMachine;