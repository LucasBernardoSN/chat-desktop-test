import { throws } from 'assert';
import axios from 'axios';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Provider } from 'react-redux';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
import { SendFileTransmissionProvider } from './contexts/SendFileTransmissionContext';

import { globalStyles } from './globalCss';
import store from './reducers/store';
import { AppRoutes } from './routes/Routes';
import { DEV } from './services/config';

const persistor = persistStore(store);

function App() {
  const { getRootProps } = useDropzone({
    noClick: true,
    noKeyboard: true,
  });
  globalStyles();

  window.addEventListener('error', function (event) {
    axios.post('http://erosoft.com.br:3980/logerror', {
      tela: 'App',
      erro: {
        tempoDeExecucao:
          event.timeStamp / 1000 < 60
            ? event.timeStamp / 1000 + 's'
            : event.timeStamp / 1000 / 60 + 'min',
        mensagem: event.message,
        stack: event.error.stack,
      },
      sistema: 'EroChat',
      cnpj: localStorage.getItem('erochat-cnpj'),
      empresa: localStorage.getItem('erochat-empresa'),
      usuario: localStorage.getItem('erochat-usuario'),
      data: new Date(),
    });
  });

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <SendFileTransmissionProvider>
          <AppRoutes {...getRootProps} />
        </SendFileTransmissionProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
