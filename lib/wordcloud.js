'use strict';

//FIXME: On global, but acessible on test, how in ES6?
const POSITIVE_SENTIMENT_THRESHOLD = 60;
const NEGATIVE_SENTIMENT_THRESHOLD = 40;
const POSITIVE_STYLE = 'positive';
const NEGATIVE_STYLE = 'negative';

class WordCloud {

  constructor(element, topics) {

    if(!topics) throw 'Please provide word cloud topics';
    if(!element) throw 'Please provide container element';

    this.container = Snap(element);

    this.container = document.createElementNS('http://www.w3.org/2000/svg','svg');
    this.container.setAttributeNS(null,'x',0);
    this.container.setAttributeNS(null,'y',0);
    this.container.setAttributeNS(null,'width', '100%');
    this.container.setAttributeNS(null,'height', '100%');

    this.snap = Snap(this.container);

    //sort topics by volume, highest first
    this.topics = topics.sort((a,b) => b.volume - a.volume);

    //create text element for each topic
    this.topics.forEach(this.addTopic, this);

    element.appendChild(this.container)

  }

  addTopic(topic) {

    var styleClass = '';
    if(topic.sentimentScore > POSITIVE_SENTIMENT_THRESHOLD) {
      styleClass = POSITIVE_STYLE
    }
    if(topic.sentimentScore < NEGATIVE_SENTIMENT_THRESHOLD) {
      styleClass = NEGATIVE_STYLE
    }

    var text = this.snap.text('50%', '50%', topic.label);
    text.attr({
      uid: topic.id,
      class: styleClass
    });
  }

}
