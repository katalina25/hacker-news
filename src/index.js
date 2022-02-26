import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import TimeAgo from 'javascript-time-ago'
import time from 'javascript-time-ago/locale/en-UG.json'

TimeAgo.addDefaultLocale(time)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

