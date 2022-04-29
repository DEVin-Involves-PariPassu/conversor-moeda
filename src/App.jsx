import { useState } from 'react';
import './App.css';
import Form from './components/Form'
import Highlight from './components/Highlight'
import { multiply } from './util/math'

function App() {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async ({
    value,
    coin
  }) => {
    const res = await fetch(`https://economia.awesomeapi.com.br/json/last/${coin}-BRL`)

    const data = await res.json();

    if(!res.ok) {
      setError(data.message)
      return;
    }

    const result = multiply(value, data[`${coin}BRL`].ask).toFixed(2)

    setValue(result);
  }

  return (
    <>
      <Form onSubmit={handleSubmit} />
      <Highlight value={value} />
      {error && <div role="alert">{error}</div>}

    </>
  );
}

export default App;
