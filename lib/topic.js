'use strict';

/**
 * Creates and wraps SVG text required for topic
 * @class Topic
 */
class Topic {

  static get POSITIVE_SENTIMENT_THRESHOLD() { return 60 };
  static get NEGATIVE_SENTIMENT_THRESHOLD() { return 40 };
  static get NEUTRAL_STYLE() { return 'neutral' };
  static get POSITIVE_STYLE() { return 'positive' };
  static get NEGATIVE_STYLE() { return 'negative' };

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
    var styleClass = Topic.NEUTRAL_STYLE;
    if(sentiment > Topic.POSITIVE_SENTIMENT_THRESHOLD) {
      styleClass = Topic.POSITIVE_STYLE
    }
    if(sentiment < Topic.NEGATIVE_SENTIMENT_THRESHOLD) {
      styleClass = Topic.NEGATIVE_STYLE
    }
    return styleClass;
  }
};
