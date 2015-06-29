import React from 'react';

// import styles
// http://davidwalsh.name/add-rules-stylesheets
import sheet from './helpers/style_loader.js'
import mainStyle from '!raw!sass!./sass/index.scss';
sheet.insertRule(mainStyle, 0);

React.render(<div>Hello</div>, document.getElementById("main"));