'use strict';

//FIXME: Size grouping doesn't create all six sizes
//FIXME: Constants On global, but acessible on test, how in ES6?
//FIXME: Multiple repaints issue


const POSITIVE_SENTIMENT_THRESHOLD = 60;
const NEGATIVE_SENTIMENT_THRESHOLD = 40;
const POSITIVE_STYLE = 'positive';
const NEGATIVE_STYLE = 'negative';
const TOTAL_FONT_SIZES = 6;
const MAX_TEXT_SIZE = 18; //vw
const MIN_TEXT_SIZE = 10; //vw
const SPIRAL_STEP = 0.7; //lower is more dense but less performant

class WordCloud {

  constructor(element, topics) {

    if(!topics) throw 'Please provide word cloud topics';
    if(!element) throw 'Please provide container element';

    this.container = document.createElementNS('http://www.w3.org/2000/svg','svg');
    this.container.setAttributeNS(null, 'x', 0);
    this.container.setAttributeNS(null, 'y', 0);
    this.container.setAttributeNS(null, 'width', '100%');
    this.container.setAttributeNS(null, 'height', '100%');

    element.appendChild(this.container);

    //sort topics by volume, highest first
    this.topics = topics.sort((a,b) => b.volume - a.volume);

    const range = this.topics[0].volume -
        this.topics[this.topics.length - 1].volume;
    //FIXME: const
    this.groupSize = Math.ceil(range / TOTAL_FONT_SIZES);
    this.fontIncrement = (MAX_TEXT_SIZE - MIN_TEXT_SIZE) / TOTAL_FONT_SIZES;

    //create text element for each topic
    this.topics.forEach(this.addTopic, this);
  }

  addTopic(topic, count) {

    var styleClass = '';
    if(topic.sentimentScore > POSITIVE_SENTIMENT_THRESHOLD) {
      styleClass = POSITIVE_STYLE
    }
    if(topic.sentimentScore < NEGATIVE_SENTIMENT_THRESHOLD) {
      styleClass = NEGATIVE_STYLE
    }

    //calculate group
    var group = Math.min(Math.ceil(topic.volume / this.groupSize),
        TOTAL_FONT_SIZES);
    var fontSize = this.fontIncrement * group;

    var text = document.createElementNS('http://www.w3.org/2000/svg','text');
    text.style.fontSize = parseInt(fontSize) + 'vw';
    text.style.textAnchor = 'middle';
    text.style.alignmentBaseline = 'middle';
    text.setAttribute('uid', topic.id);
    text.setAttribute('class', styleClass);
    text.textContent = topic.label;

    var angle = (360 / this.topics.length) * count;
    var pos = this.createPosition(angle, count);

    text.setAttributeNS(null, 'x', pos.x + '%');
    text.setAttributeNS(null, 'y', pos.y + '%');

    this.container.appendChild(text);

    var textItems = this.container.querySelectorAll('text');
    while(this.detectCollision(textItems, text)) {
      console.log('collision');
      var pos = this.createPosition(angle, count++);
      text.setAttributeNS(null, 'x', pos.x + '%');
      text.setAttributeNS(null, 'y', pos.y + '%');

    }
  }

  createPosition(angle, count) {
    var x = 50;
    var y = 50;
    if(count > 0) {
      x += ( (count * SPIRAL_STEP)) * Math.cos(angle);
      y += ( (count * SPIRAL_STEP)) * Math.sin(angle);
    }
    return {x:parseInt(x), y:parseInt(y)};
  }

  detectCollision(textItems, candidate) {
    //URGH!!
    var itemArray =  Array.from(textItems);
    var a = candidate.getBoundingClientRect();

    var collision = false;
    itemArray.some(function(textItem) {
      var b = textItem.getBoundingClientRect();

      collision = textItem.getAttribute('uid') != candidate.getAttribute('uid') &&
          !(a.left > b.right ||
            a.right < b.left ||
            a.top > b.bottom ||
            a.bottom < b.top);
       return collision
      });
    return collision;
  }

}
