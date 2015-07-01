'use strict';

const TOPIC_SELECT_EVENT = 'topic:selected';

describe('Wordcloud', function() {

  var topics = [
    {
      label: 'negative-1',
      id: 'a',
      sentimentScore: Topic.NEGATIVE_SENTIMENT_THRESHOLD - 1,
      volume: 20
    }, {
      label: 'positive-1',
      id: 'b',
      sentimentScore: Topic.POSITIVE_SENTIMENT_THRESHOLD + 1,
      volume: 223
    }, {
      label: 'neutral-1',
      id: 'c',
      sentimentScore: Topic.NEGATIVE_SENTIMENT_THRESHOLD + 1,
      volume: 87
    }
  ];

  var wordCloud, container, topic1Node, topic2Node, topic3Node, wordCloud, topicNodes;

  beforeEach(function() {
    container = document.createElement('div');
    document.body.appendChild(container);
    //Clone the topics
    const copiedTopics = Object.assign([], topics);
    wordCloud = new WordCloud(container, copiedTopics);
    topic1Node = container.querySelector('[uid='+ topics[0].id +']');
    topic2Node = container.querySelector('[uid='+ topics[1].id +']');
    topic3Node = container.querySelector('[uid='+ topics[2].id +']');
    topicNodes = [topic1Node, topic2Node, topic3Node];

  });

  afterEach(function() {
    document.body.removeChild(container);
  });

  describe('#constructor', function() {

    describe('parameter checking', function() {
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

    it('should create an SVG', function() {
      expect(wordCloud.container.constructor).toEqual(SVGSVGElement);
    });
  });

  describe('#addTopic', function() {

    it('should create a text element for each topic', function() {
      topicNodes.forEach(function(topic, index) {
        expect(topic).not.toBe(null);
        expect(topic.textContent).toBe(topics[index].label);
      });
    });

    it('should apply positive and negative sentiment classes', function() {
      expect(topic1Node.getAttribute('class')).toContain(Topic.NEGATIVE_STYLE);
      expect(topic2Node.getAttribute('class')).toContain(Topic.POSITIVE_STYLE);
      expect(topic3Node.getAttribute('class')).toContain(Topic.NEUTRAL_STYLE);
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

  describe('#selectTopic', function() {
    it('should trigger an event when a tag is clicked', function() {
      var eventSpy = jasmine.createSpy();
      document.addEventListener(TOPIC_SELECT_EVENT, eventSpy);
      var event = new Event('click', { 'bubbles': true, 'cancelable': false });
      wordCloud.container.dispatchEvent(event);
      topic1Node.dispatchEvent(event);
      expect(eventSpy).toHaveBeenCalled();
      expect(eventSpy).toHaveBeenCalledWith(jasmine.objectContaining({
        detail: topics[0]
      }));
    });
  });

  describe('#createPosition', function() {
    it('should return position coordinates', function() {
      expect(WordCloud.createPosition(90, 1).x).toEqual(jasmine.any(Number));
      expect(WordCloud.createPosition(90, 1).x).toEqual(jasmine.any(Number));
    });
  });
});
