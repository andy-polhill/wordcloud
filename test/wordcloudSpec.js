'use strict';

describe('Wordcloud', function() {

  var container;
  var topics = [
    {
      label: 'negative-1',
      id: 'a',
      sentimentScore: NEGATIVE_SENTIMENT_THRESHOLD - 1,
      volume: 20
    }, {
      label: 'positive-1',
      id: 'b',
      sentimentScore: POSITIVE_SENTIMENT_THRESHOLD + 1,
      volume: 223
    }, {
      label: 'neutral-1',
      id: 'c',
      sentimentScore: NEGATIVE_SENTIMENT_THRESHOLD + 1,
      volume: 87
    }, {
      label: 'negative-2',
      id: 'd',
      sentimentScore: NEGATIVE_SENTIMENT_THRESHOLD - 1,
      volume: 12
    }, {
      label: 'positive-2',
      id: 'e',
      sentimentScore: POSITIVE_SENTIMENT_THRESHOLD + 1,
      volume: 109
    }, {
      label: 'neutral-2',
      id: 'f',
      sentimentScore: NEGATIVE_SENTIMENT_THRESHOLD + 1,
      volume: 161
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
      var copiedTopics = Object.assign([], topics);
      new WordCloud(container, copiedTopics);
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

    it('should apply larger text sizes to most popular topics', function() {
      expect(parseInt(topic2Node.style.fontSize))
        .toBeGreaterThan(parseInt(topic1Node.style.fontSize));
      expect(parseInt(topic2Node.style.fontSize))
        .toBeGreaterThan(parseInt(topic3Node.style.fontSize));
      expect(parseInt(topic1Node.style.fontSize))
        .toBeLessThan(parseInt(topic3Node.style.fontSize));
    });

  });

});
