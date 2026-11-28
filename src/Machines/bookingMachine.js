import { createMachine, assign, fromPromise } from 'xstate';
import { fetchCountries } from '../utils/api';

const fillCountries = {
  initial: 'loading',
  states: {
    loading: {
      invoke: {
        id: 'getCountries',
        src: fromPromise(() => fetchCountries()),
        onDone: {
          target: 'success',
          actions: assign({
            countries: ({ event }) => event.output,
          }),
        },
        onError: {
          target: 'failure',
          actions: assign({
            error: ({ event }) =>
              event.error?.message || 'No se pudieron cargar los países.',
          }),
        },
      },
    },
    success: {},
    failure: {
      on: {
        RETRY: {
          target: 'loading',
          actions: assign({ error: '' }),
        },
      },
    },
  },
};

const bookingMachine = createMachine(
    {
      id: 'buy plane tickets',
      initial: 'initial',
      context: {
        passengers: [],
        selectedCountry: '',
        countries: [],
        error: '',
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
            cancel: "initial",
          },
          ...fillCountries,
        },
        passengers: {
          on: {
            DONE: {
              target: 'tickets',
              guard: "moreThanOnePassenger",
            },
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
          after: {
            20000: {
              target: 'initial',
              actions: 'clearContext',
            }
          },
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
      guards: {
        moreThanOnePassenger: ({ context }) => { return context.passengers.length > 0; }
      },
    }
  );

export default bookingMachine;