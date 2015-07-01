'use strict';

/**
 * Creates and wraps SVG text required for topic
 * @class Topic
 */
class Topic {

  /**
   * @constructor
   * @param {Object} opts: The generated attributes required for the word cloud
   * @param {Object} topicData: The raw topic data
   */
  constructor(opts, topicData) {
    this.text = document.createElementNS('http://www.w3.org/2000/svg','text');
    this.text.style.textAnchor = 'middle';
    this.text.style.alignmentBaseline = 'middle';
    this.text.setAttribute('uid', topicData.id);
    this.text.setAttribute('class', Topic.determineStyle(topicData.sentimentScore));
    this.text.textContent = topicData.label;
    this.text.style.fontSize = opts.fontSize;
    this.setPosition(opts.position);
  }

  /**
   * Set the position of the text element
   * @method
   * @param {Object} position: Coordinates of the text item
   */
  setPosition(position) {
    this.text.setAttributeNS(null, 'x', position.x + '%');
    this.text.setAttributeNS(null, 'y', position.y + '%');
  }

  /**
   * Determine what class to apply depending on setiment
   * @static
   * @method
   * @param {Number} sentiment: Numerical sentiment value
   * @return {String} The class to apply
   */
  static determineStyle(sentiment) {
    var styleClass = NEUTRAL_STYLE;
    if(sentiment > POSITIVE_SENTIMENT_THRESHOLD) {
      styleClass = POSITIVE_STYLE
    }
    if(sentiment < NEGATIVE_SENTIMENT_THRESHOLD) {
      styleClass = NEGATIVE_STYLE
    }
    return styleClass;
  }
};
