'use strict';

class Topic {

  constructor(topicData) {

    var styleClass = NEUTRAL_STYLE;
    if(topicData.sentimentScore > POSITIVE_SENTIMENT_THRESHOLD) {
      styleClass = POSITIVE_STYLE
    }
    if(topicData.sentimentScore < NEGATIVE_SENTIMENT_THRESHOLD) {
      styleClass = NEGATIVE_STYLE
    }

    this.text = document.createElementNS('http://www.w3.org/2000/svg','text');
    this.text.style.textAnchor = 'middle';
    this.text.style.alignmentBaseline = 'middle';
    this.text.setAttribute('uid', topicData.id);
    this.text.setAttribute('class', styleClass);
    this.text.textContent = topicData.label;
  }
};
