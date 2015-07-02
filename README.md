[![Build Status](https://travis-ci.org/thatguynamedandy/wordcloud.svg)](https://travis-ci.org/thatguynamedandy/wordcloud)

#Intro
A basic word cloud implementation, Using some ES6 syntax via Babel preprocessor, and templating wih Hogan.

#Installation

    npm install
    gulp
    //and navigate to http://localhost:3000

#Tests

    npm test

#Demo

  http://thatguynamedandy.github.com/wordcloud

##Things I would do with more time
  * ES6 Module loading
  * Template precompilation
  * Find out if there is a way to determine tag location before appending to the DOM
    * This will help with performance and cut down on repaints
    * One alternative may be to predict text size and location
  * Deal with collision to container bounds
  * Improve test coverage
  * Make a Base wordcloud class that is polymorphic and then create a Browser/Server extension of the class
  * Create a minified version of compiled scripts 

_Not currently what I would define as "production ready", but I'm running out of time to burn on it._
