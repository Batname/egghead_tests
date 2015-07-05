/* Start application point */

import 'babel/polyfill';
import React from 'react';
import App from './components/App';
import FastClick from 'fastclick';


let path = decodeURI(window.location.pathname);

function run(){
  let props = {
    path: path
  };
  let element = React.createElement(App, props);
  React.render(element, document.getElementById('main'));
  console.log('ITS React');
}

// Run the application when both DOM is ready
// and page content is loaded
Promise.all([
  new Promise((resolve) => {
    if(window.addEventListener) {
      window.addEventListener('DOMContentLoaded', resolve);
    } else {
      window.attachEvent('onload', resolve);
    }
  }).then(() => FastClick.attach(document.body))
]).then(run);
