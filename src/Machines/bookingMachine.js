import { createMachine } from 'xstate';

const bookingMachine = createMachine(
  {
    id: 'buy plane tickets',
    initial: 'initial',
    states: {
      initial: {
        on: {
          START: {
            target: 'search',
            actions: 'printInitial',
          },
        },
      },
      search: {
        entry: 'printEntry',
        exit: 'printExit',
        on: {
          CONTINUE: 'passengers',
          CANCEL: 'initial',
        },
      },
      passengers: {
        on: {
          DONE: 'tickets',
          CANCEL: 'initial',
        },
      },
      tickets: {
        on: {
          FINISH: 'initial',
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