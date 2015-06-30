'use strict';

describe('Wordcloud', function() {

  var container;
  var topics = [
    {
      label: 'negative-1',
      id: '1',
      'sentimentScore': NEGATIVE_SENTIMENT_THRESHOLD - 1
    }, {
      label: 'positive-1',
      id: '2',
      'sentimentScore': POSITIVE_SENTIMENT_THRESHOLD + 1
    }, {
      label: 'neutral-1',
      id: '3',
      'sentimentScore': NEGATIVE_SENTIMENT_THRESHOLD + 1
    }
  ];

  beforeEach(function() {
    container = document.createElement('div');
    container.id = 'wordcloud';
    document.body.appendChild(container);
  });

  afterEach(function() {
    document.body.removeChild(container);
  });

  describe('Parameter validation ', function() {

    it('should throw a warning if no data is provided', function() {
      expect(function() {
        new WordCloud(container);
      }).toThrow();
    });

    it('should throw a warning if no DOM element is provided', function() {
      expect(function() {
        new WordCloud(null, []);
      }).toThrow();
    });

    it('should not throw a warning when DOM element and data are provided', function() {
      expect(function() {
        new WordCloud(container, []);
      }).not.toThrow();
    });
  });

  describe('Cloud creation', function() {

    var topic1Node, topic2Node, topic3Node;

    beforeEach(function() {
      new WordCloud(container, topics);
      topic1Node = container.querySelector('[uid="'+ topics[0].id +'"]');
      topic2Node = container.querySelector('[uid="'+ topics[1].id +'"]');
      topic3Node = container.querySelector('[uid="'+ topics[2].id +'"]');
    });

    it('should create a text element for each topic', function() {
      //TIDY: repitition
      expect(topic1Node).not.toBe(null);
      expect(topic1Node.textContent).toBe(topics[0].label);
      expect(topic2Node).not.toBe(null)
      expect(topic2Node.textContent).toBe(topics[1].label)
      expect(topic3Node).not.toBe(null)
      expect(topic3Node.textContent).toBe(topics[2].label)
    });

    it('should apply positive and negative sentiment classes', function() {
      expect(topic1Node.getAttribute('class')).toContain(NEGATIVE_STYLE);
      expect(topic2Node.getAttribute('class')).toContain(POSITIVE_STYLE);
      expect(topic3Node.getAttribute('class')).not.toContain(POSITIVE_STYLE);
      expect(topic3Node.getAttribute('class')).not.toContain(NEGATIVE_STYLE);
    });

  });

});
