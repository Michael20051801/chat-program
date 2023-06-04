import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';

import { App } from './app/app';
import store from './store/store';

// This is the main page of the app (client), here I
//  am running the app, the project.
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // The strict mode is here in order to highlights potential
  //  issues in the app.
  <StrictMode>
    {/* Providing the store (global state) to the app. */}
    <Provider store={store}>
      {/* Returning the App module, there are all the code */}
      <App />
    </Provider>
  </StrictMode>
);
