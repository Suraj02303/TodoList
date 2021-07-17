// This is enter point to the react framework
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App'; // Main parent app

// the below code will access the div with id = root form index.html file
ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);


//* <App/> is a component which is being loaded from App.js file*/
