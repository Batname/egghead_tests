import React from 'react';

// import styles
// http://davidwalsh.name/add-rules-stylesheets
import insertRules from './helpers/style_loader.js'
import mainStyle from '!raw!sass!./sass/index.scss';
insertRules(mainStyle);


let Calculator = React.createClass({
  render: function() {
    return (
      <div className="calculator">
        <div>Calculator</div>
      </div>
    );
  }
});

let CalculatorResult = React.createClass({
  render: function() {
    return (
      <div className="calculator-result">
        <div>CalculatorResult</div>
      </div>
    );
  }
});

React.render(<div className="calculator-main"><Calculator /><CalculatorResult /></div>, document.getElementById("main"));