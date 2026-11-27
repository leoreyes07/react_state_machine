import React, { useState } from 'react';
import './Search.css';

export const Search = ({ state, send }) => {
  const [flight, setFlight] = useState('');
  const isLoading = state.matches({ search: 'loading' });
  const hasFailed = state.matches({ search: 'failure' });

  const goToPassengers = () => {
    send({ type: 'CONTINUE', selectedCountry: flight });
  }

  const handleSelectChange = (event) => {
    setFlight(event.target.value);
  };

  const options = state.context.countries;

  return (
    <div className='Search'>
      <p className='Search-title title'>Busca tu destino</p>
      {isLoading && <p role='status'>Cargando países...</p>}
      {hasFailed && (
        <div role='alert'>
          <p>{state.context.error}</p>
          <button
            onClick={() => send({ type: 'RETRY' })}
            className='Search-continue button'
          >
            Reintentar
          </button>
        </div>
      )}
      {!isLoading && !hasFailed && (
        <>
          <select
            id='country'
            className='Search-select'
            value={flight}
            onChange={handleSelectChange}
          >
            <option value='' disabled>Escoge un país</option>
            {options.map((country) => (
              <option value={country} key={country}>
                {country}
              </option>
            ))}
          </select>
          <button
            onClick={goToPassengers}
            disabled={flight === ''}
            className='Search-continue button'
          >
            Continuar
          </button>
        </>
      )}
    </div>
  );
}; 