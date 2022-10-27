import React from 'react';
import createfastContext from './createfastContext';

const { Provider, useStore } = createfastContext({
  first: '',
  last: '',
});

const TextInput = ({ value }: { value: 'first' | 'last' }) => {
  const [fieldValue, setStore] = useStore((store) => store[value]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    return setStore({ [value]: e.target.value });
  }

  return (
    <div className='field'>
      {value}: <input value={fieldValue} onChange={handleChange} />
    </div>
  );
};

const Display = ({ value }: { value: 'first' | 'last' }) => {
  const [fieldValue] = useStore((store) => store[value]);

  return (
    <div className='value'>
      {value}: {fieldValue}
    </div>
  );
};

const FormContainer = () => {
  return (
    <div className='container'>
      <h5>FormContainer</h5>
      <TextInput value='first' />
      <TextInput value='last' />
    </div>
  );
};

const DisplayContainer = () => {
  return (
    <div className='container'>
      <h5>DisplayContainer</h5>
      <Display value='first' />
      <Display value='last' />
    </div>
  );
};

const ContentContainer = () => {
  return (
    <div className='container'>
      <h5>ContentContainer</h5>
      <FormContainer />
      <DisplayContainer />
    </div>
  );
};

function App() {
  return (
    <Provider>
      <div className='container'>
        <h5>App</h5>
        <ContentContainer />
      </div>
    </Provider>
  );
}

export default App;
