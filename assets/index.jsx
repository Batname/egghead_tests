import React from 'react';

// import styles
// http://davidwalsh.name/add-rules-stylesheets
import insertRules from './helpers/style_loader.js';
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

let TwitsFeed = React.createClass({
  render: function(){
    return (
            <div className="tweetFeed">
              <div className="timeLine"></div>
            </div>
            )
  }
})

let Twits = React.createClass({
  render: function() {
    return (
        <div className="twits">
          <div className="statList">
            <div className="statList__item">
              <div cclassNamelass="status">
                <div className="title">Tweets</div>
                <div className="count totalTweets"></div>
              </div>
            </div>
            <div className="statList__item">
              <div className="status">
                <div className="title">Photos</div>
                <div className="count totalPhotos"></div>
              </div>
            </div>
            <div className="statList__item">
              <div className="status">
                <div className="title">Favourites</div>
                <div className="count totalFavourites"></div>
              </div>
            </div>
          </div>
        </div>
    );
  }
});
// generators experements

React.render(<div className="calculator-main"><Twits /><TwitsFeed /><Calculator /><CalculatorResult /></div>, document.getElementById("main"));

import generator from './helpers/generator';
generator();