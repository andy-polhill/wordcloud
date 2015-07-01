'use strict';

const TOPIC_SELECT_EVENT = 'topic:selected';

describe('Topic', function() {

  var topic;

  beforeEach(function() {
    topic = new Topic({
      position: {x: 0, y: 0}
    }, {
      id: 'topicId',
      sentimentScore: WordCloud.POSITIVE_SENTIMENT_THRESHOLD
    });
  });

  describe('#constructor', function() {
    it('should create an svg text node', function() {
      expect(topic.text.constructor).toEqual(SVGTextElement)
    });
  });

  describe('#setPosition', function() {
    it('should set position of the text node', function() {
      topic.setPosition({x: 10, y: 20});
      expect(topic.text.getAttribute('x')).toEqual('10%')
      expect(topic.text.getAttribute('y')).toEqual('20%')
    });
  });

  describe('#determineStyle', function() {
    it('should return postive class when sentiment exceeds threshold', function() {
      expect(Topic.determineStyle(Topic.POSITIVE_SENTIMENT_THRESHOLD + 1))
        .toEqual(Topic.POSITIVE_STYLE);
    });
    it('should return negative class when sentiment less than threshold', function() {
      expect(Topic.determineStyle(Topic.NEGATIVE_SENTIMENT_THRESHOLD - 1))
        .toEqual(Topic.NEGATIVE_STYLE);
    });
    it('should return neutral class when sentiment is between positive and negative thresholds', function() {
      expect(Topic.determineStyle(Topic.NEGATIVE_SENTIMENT_THRESHOLD + 1))
        .toEqual(Topic.NEUTRAL_STYLE);
    })
  });
});
