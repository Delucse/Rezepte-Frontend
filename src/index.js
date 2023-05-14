import React from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import store from './store';
import { snackbarMessage } from './actions/messageActions';

import './index.css';

import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('delucse');
const root = createRoot(container);
root.render(
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA, https://betterprogramming.pub/let-users-know-when-you-have-updated-your-service-worker-in-create-react-app-b0c2701995b3
const updateServiceWorker = (serviceWorkerRegistration) => {
    const registrationWaiting = serviceWorkerRegistration.waiting;
    if (registrationWaiting) {
        registrationWaiting.postMessage({ type: 'SKIP_WAITING' });
        registrationWaiting.addEventListener('statechange', (e) => {
            if (e.target.state === 'activated') {
                window.location.reload();
            }
        });
    }
};

serviceWorkerRegistration.register({
    onUpdate: (registration) =>
        store.dispatch(
            snackbarMessage(
                <div
                    onClick={() => updateServiceWorker(registration)}
                    style={{
                        margin: '-14px',
                        padding: '14px',
                        cursor: 'pointer',
                    }}
                >
                    Eine neue Version ist verfügbar - jetzt aktualisieren!
                </div>,
                `updateApp`
            )
        ),
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
