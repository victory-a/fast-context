import React, { useState } from 'react';
function useStoreData() {
  const store = useState({
    first: '',
    last: '',
  });

  return store;
}

type UseStoreDataReturnType = ReturnType<typeof useStoreData>;

const StoreContext = React.createContext<UseStoreDataReturnType | null>(null);
const TextInput = ({ value }: { value: 'first' | 'last' }) => {
  const [store, setStore] = React.useContext(StoreContext)!;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    return setStore({ ...store, [value]: e.target.value });
  }

  return (
    <div className='field'>
      {value}: <input value={store[value]} onChange={handleChange} />
    </div>
  );
};

const Display = ({ value }: { value: 'first' | 'last' }) => {
  const [store] = React.useContext(StoreContext)!;

  return (
    <div className='value'>
      {value}: {store[value]}
    </div>
  );
};

const FormContainer = React.memo(() => {
  return (
    <div className='container'>
      <h5>FormContainer</h5>
      <TextInput value='first' />
      <TextInput value='last' />
    </div>
  );
});

const DisplayContainer = React.memo(() => {
  return (
    <div className='container'>
      <h5>DisplayContainer</h5>
      <Display value='first' />
      <Display value='last' />
    </div>
  );
});

const ContentContainer = React.memo(() => {
  return (
    <div className='container'>
      <h5>ContentContainer</h5>
      <FormContainer />
      <DisplayContainer />
    </div>
  );
});

function App() {
  const store = useState({
    first: '',
    last: '',
  });

  return (
    <StoreContext.Provider value={store}>
      <div className='container'>
        <h5>App</h5>
        <ContentContainer />
      </div>
    </StoreContext.Provider>
  );
}

export default App;
