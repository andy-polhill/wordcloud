'use strict';

//FIXME: Size grouping doesn't create all six sizes
//FIXME: Constants On global, but acessible on test, how in ES6?
//FIXME: Multiple repaints issue
//FIXME: Change default aspect ratio to be more word friendly


const POSITIVE_SENTIMENT_THRESHOLD = 60;
const NEGATIVE_SENTIMENT_THRESHOLD = 40;
const TOTAL_FONT_SIZES = 6;
const MAX_TEXT_SIZE = 12; //vw
const MIN_TEXT_SIZE = 1; //vw
const SPIRAL_STEP = 1; //lower is more dense but less performant
const TOPIC_SELECT_EVENT = 'topic:selected';

const POSITIVE_STYLE = 'positive';
const NEGATIVE_STYLE = 'negative';

class WordCloud {

  constructor(element, topics) {

    if(!topics) throw 'Please provide word cloud topics';
    if(!element) throw 'Please provide container element';

    this.collisions = 0;

    this.container = document.createElementNS('http://www.w3.org/2000/svg','svg');
    this.container.setAttributeNS(null, 'x', 0);
    this.container.setAttributeNS(null, 'y', 0);
    this.container.setAttributeNS(null, 'width', '100%');
    this.container.setAttributeNS(null, 'height', '100%');

    this.container.addEventListener('click', this.delegateClick.bind(this));

    element.appendChild(this.container);

    //sort topics by volume, highest first
    this.topics = topics.sort((a,b) => b.volume - a.volume);

    if(this.topics.length) {
      const range = this.topics[0].volume -
          this.topics[this.topics.length - 1].volume;
      //FIXME: const
      this.groupSize = Math.ceil(range / TOTAL_FONT_SIZES);
      this.fontIncrement = ((MAX_TEXT_SIZE - MIN_TEXT_SIZE) / TOTAL_FONT_SIZES);

      //create text element for each topic
      this.topics.forEach(this.addTopic, this);
    }

    //gives us a top level idea of performance
    console.log('collisions:' + this.collisions);
  }

  addTopic(topicData, count) {
    var topic = new Topic(topicData, count);

    //calculate group
    var group = Math.min(Math.ceil(topicData.volume / this.groupSize),
        TOTAL_FONT_SIZES);
    var fontSize = MIN_TEXT_SIZE + (this.fontIncrement * group);
    topic.text.style.fontSize = parseInt(fontSize) + 'vw';

    var angle = (360 / this.topics.length) * count;
    var pos = this.createPosition(angle, count);

    topic.text.setAttributeNS(null, 'x', pos.x + '%');
    topic.text.setAttributeNS(null, 'y', pos.y + '%');

    this.container.appendChild(topic.text);

    var textItems = this.container.querySelectorAll('text');

    while(this.detectCollision(textItems, topic.text)) {
      this.collisions++;
      var pos = this.createPosition(angle, count++);
      topic.text.setAttributeNS(null, 'x', pos.x + '%');
      topic.text.setAttributeNS(null, 'y', pos.y + '%');
    }
  }

  delegateClick(evt) {
    if(evt.target.tagName === 'text') {
      var event = new CustomEvent(TOPIC_SELECT_EVENT, {
        'detail': this.topics.find((a) => a.id
            === evt.target.getAttribute('uid'))
      });
      document.dispatchEvent(event);
    }
  }

  createPosition(angle, count) {
    var x = 50;
    var y = 50;
    if(count > 0) {
      x += ( (count * SPIRAL_STEP)) * Math.cos(angle);
      y += ( (count * SPIRAL_STEP)) * Math.sin(angle);
    }
    return {x: parseInt(x), y: parseInt(y)};
  }

  detectCollision(textItems, candidate) {
    var itemArray = Array.from(textItems);
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
