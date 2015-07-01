'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

/**
 * Class to render topic data to the DOM
 * @class MetadataView
 */

var MetadataView = (function () {

    /**
     * @constructor
     * @param {Object} element: The element to render to
     */

    function MetadataView(element, template) {
        _classCallCheck(this, MetadataView);

        if (typeof element !== 'object') throw 'Please provide container element';
        if (!element instanceof String) throw 'Please provide a template';
        this.element = element;
        this.tmpl = Hogan.compile(template);
        document.addEventListener(TOPIC_SELECT_EVENT, this.render.bind(this));
        this.render({}); //render blank view
    }

    _createClass(MetadataView, [{
        key: 'render',

        /**
         * Adds a topic to the word cloud
         * @method render
         * @param {Object} evt: The event that triggered the show call
         */
        value: function render(evt) {
            this.element.innerHTML = this.tmpl.render(evt.detail);
        }
    }], [{
        key: 'META_TEMPLATE_ID',
        get: function get() {
            return 'meta-template';
        }
    }]);

    return MetadataView;
})();

'use strict';

/**
 * Creates and wraps SVG text required for topic
 * @class Topic
 */

var Topic = (function () {

    /**
     * @constructor
     * @param {Object} opts: The generated attributes required for the word cloud
     * @param {Object} topicData: The raw topic data
     */

    function Topic(opts, topicData) {
        _classCallCheck(this, Topic);

        this.text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        this.text.style.textAnchor = 'middle';
        this.text.style.alignmentBaseline = 'middle';
        this.text.setAttribute('uid', topicData.id);
        this.text.setAttribute('class', Topic.determineStyle(topicData.sentimentScore));
        this.text.textContent = topicData.label;
        this.text.style.fontSize = opts.fontSize;
        this.setPosition(opts.position);
    }

    _createClass(Topic, [{
        key: 'setPosition',

        /**
         * Set the position of the text element
         * @method
         * @param {Object} position: Coordinates of the text item
         */
        value: function setPosition(position) {
            this.text.setAttributeNS(null, 'x', position.x + '%');
            this.text.setAttributeNS(null, 'y', position.y + '%');
        }
    }], [{
        key: 'determineStyle',

        /**
         * Determine what class to apply depending on setiment
         * @static
         * @method
         * @param {Number} sentiment: Numerical sentiment value
         * @return {String} The class to apply
         */
        value: function determineStyle(sentiment) {
            var styleClass = Topic.NEUTRAL_STYLE;
            if (sentiment > Topic.POSITIVE_SENTIMENT_THRESHOLD) {
                styleClass = Topic.POSITIVE_STYLE;
            }
            if (sentiment < Topic.NEGATIVE_SENTIMENT_THRESHOLD) {
                styleClass = Topic.NEGATIVE_STYLE;
            }
            return styleClass;
        }
    }, {
        key: 'POSITIVE_SENTIMENT_THRESHOLD',
        get: function get() {
            return 60;
        }
    }, {
        key: 'NEGATIVE_SENTIMENT_THRESHOLD',
        get: function get() {
            return 40;
        }
    }, {
        key: 'NEUTRAL_STYLE',
        get: function get() {
            return 'neutral';
        }
    }, {
        key: 'POSITIVE_STYLE',
        get: function get() {
            return 'positive';
        }
    }, {
        key: 'NEGATIVE_STYLE',
        get: function get() {
            return 'negative';
        }
    }]);

    return Topic;
})();

;

var TOPICS = [{
    'id': '1751295897__Berlin',
    'label': 'Berlin',
    'volume': 165,
    'type': 'topic',
    'sentiment': {
        'negative': 3,
        'neutral': 133,
        'positive': 29
    },
    'sentimentScore': 65,
    'burst': 13,
    'days': [{
        'date': '2014-06-06T00:00:00.000+0000',
        'volume': 22
    }, {
        'date': '2014-06-04T00:00:00.000+0000',
        'volume': 43
    }, {
        'date': '2014-06-09T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-07T00:00:00.000+0000',
        'volume': 12
    }, {
        'date': '2014-06-08T00:00:00.000+0000',
        'volume': 11
    }, {
        'date': '2014-06-03T00:00:00.000+0000',
        'volume': 39
    }, {
        'date': '2014-06-05T00:00:00.000+0000',
        'volume': 38
    }],
    'pageType': {
        'blog': 17,
        'facebook': 56,
        'forum': 22,
        'general': 5,
        'image': 0,
        'news': 26,
        'review': 1,
        'twitter': 35,
        'video': 3
    },
    'queries': [{
        'id': 1751295897,
        'name': 'Berghain',
        'volume': 165
    }]
}, {
    'id': '1751295897__DJ',
    'label': 'DJ',
    'volume': 48,
    'type': 'topic',
    'sentiment': {
        'neutral': 46,
        'positive': 2
    },
    'sentimentScore': 54,
    'burst': 29,
    'days': [{
        'date': '2014-06-06T00:00:00.000+0000',
        'volume': 4
    }, {
        'date': '2014-06-04T00:00:00.000+0000',
        'volume': 10
    }, {
        'date': '2014-06-09T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-07T00:00:00.000+0000',
        'volume': 11
    }, {
        'date': '2014-06-08T00:00:00.000+0000',
        'volume': 3
    }, {
        'date': '2014-06-03T00:00:00.000+0000',
        'volume': 12
    }, {
        'date': '2014-06-05T00:00:00.000+0000',
        'volume': 8
    }],
    'pageType': {
        'blog': 4,
        'facebook': 13,
        'forum': 8,
        'general': 1,
        'image': 0,
        'news': 7,
        'review': 1,
        'twitter': 13,
        'video': 1
    },
    'queries': [{
        'id': 1751295897,
        'name': 'Berghain',
        'volume': 48
    }]
}, {
    'id': '1751295897__Ostgut Ton',
    'label': 'Ostgut Ton',
    'volume': 24,
    'type': 'topic',
    'sentiment': {
        'neutral': 22,
        'positive': 2
    },
    'sentimentScore': 58,
    'burst': 25,
    'days': [{
        'date': '2014-06-06T00:00:00.000+0000',
        'volume': 4
    }, {
        'date': '2014-06-04T00:00:00.000+0000',
        'volume': 3
    }, {
        'date': '2014-06-07T00:00:00.000+0000',
        'volume': 4
    }, {
        'date': '2014-06-09T00:00:00.000+0000',
        'volume': 1
    }, {
        'date': '2014-06-08T00:00:00.000+0000',
        'volume': 1
    }, {
        'date': '2014-06-03T00:00:00.000+0000',
        'volume': 5
    }, {
        'date': '2014-06-05T00:00:00.000+0000',
        'volume': 6
    }],
    'pageType': {
        'blog': 4,
        'facebook': 5,
        'forum': 2,
        'general': 3,
        'image': 0,
        'news': 8,
        'review': 1,
        'twitter': 0,
        'video': 1
    },
    'queries': [{
        'id': 1751295897,
        'name': 'Berghain',
        'volume': 24
    }]
}, {
    'id': '1751295897__Hammered',
    'label': 'Hammered',
    'volume': 48,
    'type': 'topic',
    'sentiment': {
        'neutral': 18,
        'negative': 30
    },
    'sentimentScore': 20,
    'burst': 5,
    'days': [{
        'date': '2014-06-06T00:00:00.000+0000',
        'volume': 1
    }, {
        'date': '2014-06-04T00:00:00.000+0000',
        'volume': 8
    }, {
        'date': '2014-06-09T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-07T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-08T00:00:00.000+0000',
        'volume': 1
    }, {
        'date': '2014-06-03T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-05T00:00:00.000+0000',
        'volume': 8
    }],
    'pageType': {
        'blog': 0,
        'facebook': 3,
        'forum': 0,
        'general': 0,
        'image': 0,
        'news': 0,
        'review': 0,
        'twitter': 15,
        'video': 0
    },
    'queries': [{
        'id': 1751295897,
        'name': 'Berghain',
        'volume': 18
    }]
}, {
    'id': '1751295897__Code',
    'label': 'Code',
    'volume': 16,
    'type': 'topic',
    'sentiment': {
        'neutral': 13,
        'positive': 3
    },
    'sentimentScore': 68,
    'burst': 25,
    'days': [{
        'date': '2014-06-06T00:00:00.000+0000',
        'volume': 5
    }, {
        'date': '2014-06-04T00:00:00.000+0000',
        'volume': 2
    }, {
        'date': '2014-06-07T00:00:00.000+0000',
        'volume': 2
    }, {
        'date': '2014-06-09T00:00:00.000+0000',
        'volume': 1
    }, {
        'date': '2014-06-08T00:00:00.000+0000',
        'volume': 1
    }, {
        'date': '2014-06-03T00:00:00.000+0000',
        'volume': 3
    }, {
        'date': '2014-06-05T00:00:00.000+0000',
        'volume': 2
    }],
    'pageType': {
        'blog': 2,
        'facebook': 5,
        'forum': 2,
        'general': 2,
        'image': 0,
        'news': 5,
        'review': 0,
        'twitter': 0,
        'video': 0
    },
    'queries': [{
        'id': 1751295897,
        'name': 'Berghain',
        'volume': 16
    }]
}, {
    'id': '1751295897__Quantified Drunk',
    'label': 'Quantified Drunk',
    'volume': 14,
    'type': 'topic',
    'sentiment': {
        'neutral': 14
    },
    'sentimentScore': 50,
    'burst': 7,
    'days': [{
        'date': '2014-06-06T00:00:00.000+0000',
        'volume': 1
    }, {
        'date': '2014-06-04T00:00:00.000+0000',
        'volume': 8
    }, {
        'date': '2014-06-09T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-07T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-08T00:00:00.000+0000',
        'volume': 1
    }, {
        'date': '2014-06-03T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-05T00:00:00.000+0000',
        'volume': 4
    }],
    'pageType': {
        'blog': 0,
        'facebook': 3,
        'forum': 0,
        'general': 0,
        'image': 0,
        'news': 0,
        'review': 0,
        'twitter': 11,
        'video': 0
    },
    'queries': [{
        'id': 1751295897,
        'name': 'Berghain',
        'volume': 14
    }]
}, {
    'id': '1751295897__Berghain resident',
    'label': 'Berghain resident',
    'volume': 13,
    'type': 'topic',
    'sentiment': {
        'neutral': 10,
        'positive': 3
    },
    'sentimentScore': 73,
    'burst': 0,
    'days': [{
        'date': '2014-06-06T00:00:00.000+0000',
        'volume': 3
    }, {
        'date': '2014-06-04T00:00:00.000+0000',
        'volume': 5
    }, {
        'date': '2014-06-09T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-07T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-08T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-03T00:00:00.000+0000',
        'volume': 2
    }, {
        'date': '2014-06-05T00:00:00.000+0000',
        'volume': 3
    }],
    'pageType': {
        'blog': 2,
        'facebook': 1,
        'forum': 3,
        'general': 2,
        'image': 0,
        'news': 4,
        'review': 0,
        'twitter': 0,
        'video': 1
    },
    'queries': [{
        'id': 1751295897,
        'name': 'Berghain',
        'volume': 13
    }]
}, {
    'id': '1751295897__San Soda\'s Panorama Bar',
    'label': 'San Soda\'s Panorama Bar',
    'volume': 13,
    'type': 'topic',
    'sentiment': {
        'neutral': 13
    },
    'sentimentScore': 50,
    'burst': 15,
    'days': [{
        'date': '2014-06-06T00:00:00.000+0000',
        'volume': 3
    }, {
        'date': '2014-06-04T00:00:00.000+0000',
        'volume': 1
    }, {
        'date': '2014-06-09T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-07T00:00:00.000+0000',
        'volume': 1
    }, {
        'date': '2014-06-08T00:00:00.000+0000',
        'volume': 1
    }, {
        'date': '2014-06-03T00:00:00.000+0000',
        'volume': 3
    }, {
        'date': '2014-06-05T00:00:00.000+0000',
        'volume': 4
    }],
    'pageType': {
        'blog': 0,
        'facebook': 3,
        'forum': 1,
        'general': 0,
        'image': 0,
        'news': 1,
        'review': 0,
        'twitter': 8,
        'video': 0
    },
    'queries': [{
        'id': 1751295897,
        'name': 'Berghain',
        'volume': 13
    }]
}, {
    'id': '1751295897__Germany',
    'label': 'Germany',
    'volume': 13,
    'type': 'topic',
    'sentiment': {
        'neutral': 9,
        'positive': 4
    },
    'sentimentScore': 80,
    'burst': 7,
    'days': [{
        'date': '2014-06-06T00:00:00.000+0000',
        'volume': 1
    }, {
        'date': '2014-06-04T00:00:00.000+0000',
        'volume': 5
    }, {
        'date': '2014-06-09T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-07T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-08T00:00:00.000+0000',
        'volume': 1
    }, {
        'date': '2014-06-03T00:00:00.000+0000',
        'volume': 5
    }, {
        'date': '2014-06-05T00:00:00.000+0000',
        'volume': 1
    }],
    'pageType': {
        'blog': 3,
        'facebook': 5,
        'forum': 1,
        'general': 0,
        'image': 0,
        'news': 3,
        'review': 0,
        'twitter': 1,
        'video': 0
    },
    'queries': [{
        'id': 1751295897,
        'name': 'Berghain',
        'volume': 13
    }]
}, {
    'id': '1751295897__Amsterdam',
    'label': 'Amsterdam',
    'volume': 12,
    'type': 'topic',
    'sentiment': {
        'neutral': 7,
        'positive': 5
    },
    'sentimentScore': 91,
    'burst': 25,
    'days': [{
        'date': '2014-06-06T00:00:00.000+0000',
        'volume': 1
    }, {
        'date': '2014-06-04T00:00:00.000+0000',
        'volume': 2
    }, {
        'date': '2014-06-09T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-07T00:00:00.000+0000',
        'volume': 3
    }, {
        'date': '2014-06-08T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-03T00:00:00.000+0000',
        'volume': 2
    }, {
        'date': '2014-06-05T00:00:00.000+0000',
        'volume': 4
    }],
    'pageType': {
        'blog': 1,
        'facebook': 4,
        'forum': 2,
        'general': 2,
        'image': 0,
        'news': 2,
        'review': 1,
        'twitter': 0,
        'video': 0
    },
    'queries': [{
        'id': 1751295897,
        'name': 'Berghain',
        'volume': 12
    }]
}, {
    'id': '1751295897__Kantine am Berghain',
    'label': 'Kantine am Berghain',
    'volume': 11,
    'type': 'topic',
    'sentiment': {
        'neutral': 10,
        'positive': 1
    },
    'sentimentScore': 59,
    'burst': 27,
    'days': [{
        'date': '2014-06-06T00:00:00.000+0000',
        'volume': 2
    }, {
        'date': '2014-06-04T00:00:00.000+0000',
        'volume': 2
    }, {
        'date': '2014-06-09T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-07T00:00:00.000+0000',
        'volume': 2
    }, {
        'date': '2014-06-08T00:00:00.000+0000',
        'volume': 1
    }, {
        'date': '2014-06-03T00:00:00.000+0000',
        'volume': 1
    }, {
        'date': '2014-06-05T00:00:00.000+0000',
        'volume': 3
    }],
    'pageType': {
        'blog': 0,
        'facebook': 8,
        'forum': 0,
        'general': 0,
        'image': 0,
        'news': 1,
        'review': 0,
        'twitter': 2,
        'video': 0
    },
    'queries': [{
        'id': 1751295897,
        'name': 'Berghain',
        'volume': 11
    }]
}, {
    'id': '1751295897__London',
    'label': 'London',
    'volume': 11,
    'type': 'topic',
    'sentiment': {
        'neutral': 8,
        'positive': 3
    },
    'sentimentScore': 77,
    'burst': 9,
    'days': [{
        'date': '2014-06-06T00:00:00.000+0000',
        'volume': 1
    }, {
        'date': '2014-06-04T00:00:00.000+0000',
        'volume': 2
    }, {
        'date': '2014-06-09T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-07T00:00:00.000+0000',
        'volume': 1
    }, {
        'date': '2014-06-08T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-03T00:00:00.000+0000',
        'volume': 5
    }, {
        'date': '2014-06-05T00:00:00.000+0000',
        'volume': 2
    }],
    'pageType': {
        'blog': 1,
        'facebook': 5,
        'forum': 1,
        'general': 1,
        'image': 0,
        'news': 2,
        'review': 0,
        'twitter': 1,
        'video': 0
    },
    'queries': [{
        'id': 1751295897,
        'name': 'Berghain',
        'volume': 11
    }]
}, {
    'id': '1751295897__UK',
    'label': 'UK',
    'volume': 8,
    'type': 'topic',
    'sentiment': {
        'neutral': 8
    },
    'sentimentScore': 50,
    'burst': 50,
    'days': [{
        'date': '2014-06-06T00:00:00.000+0000',
        'volume': 1
    }, {
        'date': '2014-06-04T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-09T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-07T00:00:00.000+0000',
        'volume': 2
    }, {
        'date': '2014-06-08T00:00:00.000+0000',
        'volume': 2
    }, {
        'date': '2014-06-03T00:00:00.000+0000',
        'volume': 3
    }, {
        'date': '2014-06-05T00:00:00.000+0000',
        'volume': 0
    }],
    'pageType': {
        'blog': 3,
        'facebook': 3,
        'forum': 2,
        'general': 0,
        'image': 0,
        'news': 0,
        'review': 0,
        'twitter': 0,
        'video': 0
    },
    'queries': [{
        'id': 1751295897,
        'name': 'Berghain',
        'volume': 8
    }]
}, {
    'id': '1751295897__Marcel Dettmann',
    'label': 'Marcel Dettmann',
    'volume': 8,
    'type': 'topic',
    'sentiment': {
        'neutral': 5,
        'positive': 3
    },
    'sentimentScore': 87,
    'burst': 12,
    'days': [{
        'date': '2014-06-06T00:00:00.000+0000',
        'volume': 1
    }, {
        'date': '2014-06-04T00:00:00.000+0000',
        'volume': 4
    }, {
        'date': '2014-06-09T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-07T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-08T00:00:00.000+0000',
        'volume': 1
    }, {
        'date': '2014-06-03T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-05T00:00:00.000+0000',
        'volume': 2
    }],
    'pageType': {
        'blog': 1,
        'facebook': 1,
        'forum': 2,
        'general': 1,
        'image': 0,
        'news': 2,
        'review': 0,
        'twitter': 0,
        'video': 1
    },
    'queries': [{
        'id': 1751295897,
        'name': 'Berghain',
        'volume': 8
    }]
}, {
    'id': '1751295897__Disco',
    'label': 'Disco',
    'volume': 8,
    'type': 'topic',
    'sentiment': {
        'neutral': 8
    },
    'sentimentScore': 50,
    'burst': 50,
    'days': [{
        'date': '2014-06-06T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-04T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-09T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-07T00:00:00.000+0000',
        'volume': 3
    }, {
        'date': '2014-06-08T00:00:00.000+0000',
        'volume': 1
    }, {
        'date': '2014-06-03T00:00:00.000+0000',
        'volume': 4
    }, {
        'date': '2014-06-05T00:00:00.000+0000',
        'volume': 0
    }],
    'pageType': {
        'blog': 2,
        'facebook': 5,
        'forum': 1,
        'general': 0,
        'image': 0,
        'news': 0,
        'review': 0,
        'twitter': 0,
        'video': 0
    },
    'queries': [{
        'id': 1751295897,
        'name': 'Berghain',
        'volume': 8
    }]
}, {
    'id': '1751295897__Barcelona',
    'label': 'Barcelona',
    'volume': 7,
    'type': 'topic',
    'sentiment': {
        'neutral': 7
    },
    'sentimentScore': 50,
    'burst': 0,
    'days': [{
        'date': '2014-06-06T00:00:00.000+0000',
        'volume': 3
    }, {
        'date': '2014-06-04T00:00:00.000+0000',
        'volume': 2
    }, {
        'date': '2014-06-09T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-07T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-08T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-03T00:00:00.000+0000',
        'volume': 2
    }, {
        'date': '2014-06-05T00:00:00.000+0000',
        'volume': 0
    }],
    'pageType': {
        'blog': 0,
        'facebook': 5,
        'forum': 0,
        'general': 0,
        'image': 0,
        'news': 2,
        'review': 0,
        'twitter': 0,
        'video': 0
    },
    'queries': [{
        'id': 1751295897,
        'name': 'Berghain',
        'volume': 7
    }]
}, {
    'id': '1751295897__Watergate',
    'label': 'Watergate',
    'volume': 7,
    'type': 'topic',
    'sentiment': {
        'neutral': 6,
        'positive': 1
    },
    'sentimentScore': 64,
    'burst': 14,
    'days': [{
        'date': '2014-06-06T00:00:00.000+0000',
        'volume': 2
    }, {
        'date': '2014-06-04T00:00:00.000+0000',
        'volume': 2
    }, {
        'date': '2014-06-09T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-07T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-08T00:00:00.000+0000',
        'volume': 1
    }, {
        'date': '2014-06-03T00:00:00.000+0000',
        'volume': 1
    }, {
        'date': '2014-06-05T00:00:00.000+0000',
        'volume': 1
    }],
    'pageType': {
        'blog': 1,
        'facebook': 3,
        'forum': 1,
        'general': 0,
        'image': 0,
        'news': 0,
        'review': 0,
        'twitter': 2,
        'video': 0
    },
    'queries': [{
        'id': 1751295897,
        'name': 'Berghain',
        'volume': 7
    }]
}, {
    'id': '1751295897__debut LP',
    'label': 'debut LP',
    'volume': 6,
    'type': 'topic',
    'sentiment': {
        'neutral': 3,
        'positive': 3
    },
    'sentimentScore': 100,
    'burst': 33,
    'days': [{
        'date': '2014-06-06T00:00:00.000+0000',
        'volume': 1
    }, {
        'date': '2014-06-04T00:00:00.000+0000',
        'volume': 2
    }, {
        'date': '2014-06-09T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-07T00:00:00.000+0000',
        'volume': 1
    }, {
        'date': '2014-06-08T00:00:00.000+0000',
        'volume': 1
    }, {
        'date': '2014-06-03T00:00:00.000+0000',
        'volume': 1
    }, {
        'date': '2014-06-05T00:00:00.000+0000',
        'volume': 0
    }],
    'pageType': {
        'blog': 0,
        'facebook': 3,
        'forum': 1,
        'general': 0,
        'image': 0,
        'news': 2,
        'review': 0,
        'twitter': 0,
        'video': 0
    },
    'queries': [{
        'id': 1751295897,
        'name': 'Berghain',
        'volume': 6
    }]
}, {
    'id': '1751295897__Patrick GrÃ¤ser',
    'label': 'Patrick GrÃ¤ser',
    'volume': 6,
    'type': 'topic',
    'sentiment': {
        'neutral': 3,
        'positive': 3
    },
    'sentimentScore': 100,
    'burst': 0,
    'days': [{
        'date': '2014-06-06T00:00:00.000+0000',
        'volume': 2
    }, {
        'date': '2014-06-04T00:00:00.000+0000',
        'volume': 1
    }, {
        'date': '2014-06-09T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-07T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-08T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-03T00:00:00.000+0000',
        'volume': 2
    }, {
        'date': '2014-06-05T00:00:00.000+0000',
        'volume': 1
    }],
    'pageType': {
        'blog': 1,
        'facebook': 0,
        'forum': 1,
        'general': 1,
        'image': 0,
        'news': 3,
        'review': 0,
        'twitter': 0,
        'video': 0
    },
    'queries': [{
        'id': 1751295897,
        'name': 'Berghain',
        'volume': 6
    }]
}, {
    'id': '1751295897__Panorama Bar in Berlin',
    'label': 'Panorama Bar in Berlin',
    'volume': 6,
    'type': 'topic',
    'sentiment': {
        'neutral': 4,
        'positive': 2
    },
    'sentimentScore': 83,
    'burst': 50,
    'days': [{
        'date': '2014-06-06T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-04T00:00:00.000+0000',
        'volume': 1
    }, {
        'date': '2014-06-09T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-07T00:00:00.000+0000',
        'volume': 2
    }, {
        'date': '2014-06-08T00:00:00.000+0000',
        'volume': 1
    }, {
        'date': '2014-06-03T00:00:00.000+0000',
        'volume': 1
    }, {
        'date': '2014-06-05T00:00:00.000+0000',
        'volume': 1
    }],
    'pageType': {
        'blog': 0,
        'facebook': 5,
        'forum': 0,
        'general': 0,
        'image': 0,
        'news': 1,
        'review': 0,
        'twitter': 0,
        'video': 0
    },
    'queries': [{
        'id': 1751295897,
        'name': 'Berghain',
        'volume': 6
    }]
}, {
    'id': '1751295897__legendary nightclub',
    'label': 'legendary nightclub',
    'volume': 6,
    'type': 'topic',
    'sentiment': {
        'positive': 6
    },
    'sentimentScore': 150,
    'burst': 0,
    'days': [{
        'date': '2014-06-06T00:00:00.000+0000',
        'volume': 1
    }, {
        'date': '2014-06-04T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-09T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-07T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-08T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-03T00:00:00.000+0000',
        'volume': 5
    }, {
        'date': '2014-06-05T00:00:00.000+0000',
        'volume': 0
    }],
    'pageType': {
        'blog': 1,
        'facebook': 3,
        'forum': 0,
        'general': 0,
        'image': 0,
        'news': 0,
        'review': 0,
        'twitter': 0,
        'video': 2
    },
    'queries': [{
        'id': 1751295897,
        'name': 'Berghain',
        'volume': 6
    }]
}, {
    'id': '1751295897__Ben Klock',
    'label': 'Ben Klock',
    'volume': 5,
    'type': 'topic',
    'sentiment': {
        'neutral': 5
    },
    'sentimentScore': 50,
    'burst': 20,
    'days': [{
        'date': '2014-06-06T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-04T00:00:00.000+0000',
        'volume': 3
    }, {
        'date': '2014-06-09T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-07T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-08T00:00:00.000+0000',
        'volume': 1
    }, {
        'date': '2014-06-03T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-05T00:00:00.000+0000',
        'volume': 1
    }],
    'pageType': {
        'blog': 0,
        'facebook': 1,
        'forum': 2,
        'general': 0,
        'image': 0,
        'news': 2,
        'review': 0,
        'twitter': 0,
        'video': 0
    },
    'queries': [{
        'id': 1751295897,
        'name': 'Berghain',
        'volume': 5
    }]
}, {
    'id': '1751295897__Mixes',
    'label': 'Mixes',
    'volume': 5,
    'type': 'topic',
    'sentiment': {
        'neutral': 5
    },
    'sentimentScore': 50,
    'burst': 60,
    'days': [{
        'date': '2014-06-06T00:00:00.000+0000',
        'volume': 1
    }, {
        'date': '2014-06-04T00:00:00.000+0000',
        'volume': 1
    }, {
        'date': '2014-06-09T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-07T00:00:00.000+0000',
        'volume': 3
    }, {
        'date': '2014-06-08T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-03T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-05T00:00:00.000+0000',
        'volume': 0
    }],
    'pageType': {
        'blog': 0,
        'facebook': 0,
        'forum': 5,
        'general': 0,
        'image': 0,
        'news': 0,
        'review': 0,
        'twitter': 0,
        'video': 0
    },
    'queries': [{
        'id': 1751295897,
        'name': 'Berghain',
        'volume': 5
    }]
}, {
    'id': '1751295897__Panorama Bar Music',
    'label': 'Panorama Bar Music',
    'volume': 5,
    'type': 'topic',
    'sentiment': {
        'neutral': 5
    },
    'sentimentScore': 50,
    'burst': 0,
    'days': [{
        'date': '2014-06-06T00:00:00.000+0000',
        'volume': 2
    }, {
        'date': '2014-06-04T00:00:00.000+0000',
        'volume': 1
    }, {
        'date': '2014-06-09T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-07T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-08T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-03T00:00:00.000+0000',
        'volume': 2
    }, {
        'date': '2014-06-05T00:00:00.000+0000',
        'volume': 0
    }],
    'pageType': {
        'blog': 0,
        'facebook': 3,
        'forum': 0,
        'general': 0,
        'image': 0,
        'news': 0,
        'review': 0,
        'twitter': 2,
        'video': 0
    },
    'queries': [{
        'id': 1751295897,
        'name': 'Berghain',
        'volume': 5
    }]
}, {
    'id': '1751295897__Terrace Sundae',
    'label': 'Terrace Sundae',
    'volume': 5,
    'type': 'topic',
    'sentiment': {
        'neutral': 5
    },
    'sentimentScore': 50,
    'burst': 0,
    'days': [{
        'date': '2014-06-06T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-04T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-09T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-07T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-08T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-03T00:00:00.000+0000',
        'volume': 2
    }, {
        'date': '2014-06-05T00:00:00.000+0000',
        'volume': 3
    }],
    'pageType': {
        'blog': 2,
        'facebook': 0,
        'forum': 2,
        'general': 1,
        'image': 0,
        'news': 0,
        'review': 0,
        'twitter': 0,
        'video': 0
    },
    'queries': [{
        'id': 1751295897,
        'name': 'Berghain',
        'volume': 5
    }]
}, {
    'id': '1751295897__Jun',
    'label': 'Jun',
    'volume': 5,
    'type': 'topic',
    'sentiment': {
        'neutral': 5
    },
    'sentimentScore': 50,
    'burst': 0,
    'days': [{
        'date': '2014-06-06T00:00:00.000+0000',
        'volume': 3
    }, {
        'date': '2014-06-04T00:00:00.000+0000',
        'volume': 1
    }, {
        'date': '2014-06-09T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-07T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-08T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-03T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-05T00:00:00.000+0000',
        'volume': 1
    }],
    'pageType': {
        'blog': 1,
        'facebook': 3,
        'forum': 0,
        'general': 0,
        'image': 0,
        'news': 0,
        'review': 0,
        'twitter': 1,
        'video': 0
    },
    'queries': [{
        'id': 1751295897,
        'name': 'Berghain',
        'volume': 5
    }]
}, {
    'id': '1751295897__Live set',
    'label': 'Live set',
    'volume': 4,
    'type': 'topic',
    'sentiment': {
        'neutral': 3,
        'positive': 1
    },
    'sentimentScore': 75,
    'burst': 50,
    'days': [{
        'date': '2014-06-06T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-04T00:00:00.000+0000',
        'volume': 2
    }, {
        'date': '2014-06-09T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-07T00:00:00.000+0000',
        'volume': 1
    }, {
        'date': '2014-06-08T00:00:00.000+0000',
        'volume': 1
    }, {
        'date': '2014-06-03T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-05T00:00:00.000+0000',
        'volume': 0
    }],
    'pageType': {
        'blog': 0,
        'facebook': 4,
        'forum': 0,
        'general': 0,
        'image': 0,
        'news': 0,
        'review': 0,
        'twitter': 0,
        'video': 0
    },
    'queries': [{
        'id': 1751295897,
        'name': 'Berghain',
        'volume': 4
    }]
}, {
    'id': '1751295897__dance music',
    'label': 'dance music',
    'volume': 4,
    'type': 'topic',
    'sentiment': {
        'neutral': 4
    },
    'sentimentScore': 50,
    'burst': 0,
    'days': [{
        'date': '2014-06-06T00:00:00.000+0000',
        'volume': 2
    }, {
        'date': '2014-06-04T00:00:00.000+0000',
        'volume': 1
    }, {
        'date': '2014-06-09T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-07T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-08T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-03T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-05T00:00:00.000+0000',
        'volume': 1
    }],
    'pageType': {
        'blog': 1,
        'facebook': 0,
        'forum': 1,
        'general': 0,
        'image': 0,
        'news': 1,
        'review': 0,
        'twitter': 1,
        'video': 0
    },
    'queries': [{
        'id': 1751295897,
        'name': 'Berghain',
        'volume': 4
    }]
}, {
    'id': '1751295897__club culture',
    'label': 'club culture',
    'volume': 3,
    'type': 'topic',
    'sentiment': {
        'neutral': 3
    },
    'sentimentScore': 50,
    'burst': 0,
    'days': [{
        'date': '2014-06-06T00:00:00.000+0000',
        'volume': 1
    }, {
        'date': '2014-06-04T00:00:00.000+0000',
        'volume': 1
    }, {
        'date': '2014-06-09T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-07T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-08T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-03T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-05T00:00:00.000+0000',
        'volume': 1
    }],
    'pageType': {
        'blog': 0,
        'facebook': 0,
        'forum': 1,
        'general': 0,
        'image': 0,
        'news': 2,
        'review': 0,
        'twitter': 0,
        'video': 0
    },
    'queries': [{
        'id': 1751295897,
        'name': 'Berghain',
        'volume': 3
    }]
}, {
    'id': '1751295897__D/B Presents',
    'label': 'D/B Presents',
    'volume': 3,
    'type': 'topic',
    'sentiment': {
        'neutral': 3
    },
    'sentimentScore': 50,
    'burst': 33,
    'days': [{
        'date': '2014-06-06T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-04T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-09T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-07T00:00:00.000+0000',
        'volume': 0
    }, {
        'date': '2014-06-08T00:00:00.000+0000',
        'volume': 1
    }, {
        'date': '2014-06-03T00:00:00.000+0000',
        'volume': 2
    }, {
        'date': '2014-06-05T00:00:00.000+0000',
        'volume': 0
    }],
    'pageType': {
        'blog': 3,
        'facebook': 0,
        'forum': 0,
        'general': 0,
        'image': 0,
        'news': 0,
        'review': 0,
        'twitter': 0,
        'video': 0
    },
    'queries': [{
        'id': 1751295897,
        'name': 'Berghain',
        'volume': 3
    }]
}];

'use strict';

/**
 * Creates wordclouds
 * @class WordCloud
 */

var WordCloud = (function () {

    /**
     * @constructor
     * @param {Object} element: The element to put the cloud in
     * @param {Array} topics: Array of the topics
     */

    function WordCloud(element, topics) {
        _classCallCheck(this, WordCloud);

        if (!topics instanceof Array) throw 'Please provide an array of topics';
        if (typeof element !== 'object') throw 'Please provide container element';

        this.totalCollisions = 0;
        this.container = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.container.setAttributeNS(null, 'width', '100%');
        this.container.setAttributeNS(null, 'height', '100%');
        this.container.addEventListener('click', this.selectTopic.bind(this));
        element.appendChild(this.container);

        this.topics = topics.sort(function (a, b) {
            return b.volume - a.volume;
        });

        if (this.topics.length) {
            var fontSizeRange = this.topics[0].volume - this.topics[this.topics.length - 1].volume;
            this.groupSize = Math.ceil(fontSizeRange / WordCloud.TOTAL_FONT_SIZES);
            this.topics.forEach(this.addTopic, this);
        }

        //gives us a top level idea of performance
        console.log('collisions:' + this.totalCollisions);
    }

    _createClass(WordCloud, [{
        key: 'addTopic',

        /**
         * Adds a topic to the word cloud
         * @method addTopic
         * @private
         * @param {Object} topicData: Data about the topic to add
         * @param {Number} count: Numerical index of topic in cloud
         */
        value: function addTopic(topicData, count) {
            var fontGroup = Math.min(Math.ceil(topicData.volume / this.groupSize), WordCloud.TOTAL_FONT_SIZES);
            var fontSize = (WordCloud.MIN_TEXT_SIZE + WordCloud.FONT_INCREMENT * fontGroup).toFixed(2) + 'vw';
            var spiralAngle = WordCloud.CLOUD_ROTATION / this.topics.length * count;
            var position = WordCloud.createPosition(spiralAngle, count);

            var topic = new Topic({
                fontSize: fontSize,
                position: position
            }, topicData);

            this.container.appendChild(topic.text);

            var textItems = this.container.querySelectorAll('text');
            var collisions = 0;

            while (WordCloud.detectCollision(textItems, topic.text) && collisions < WordCloud.MAX_COLLISIONS_PER_ITEM) {
                topic.setPosition(WordCloud.createPosition(spiralAngle, count++));
                collisions++;
            }

            if (collisions === WordCloud.MAX_COLLISIONS_PER_ITEM) {
                //recursion safeguard
                this.container.removeChild(topic.text);
                console.warn(topicData.label + ' could not be contained in the tag cloud');
            }
            this.totalCollisions += collisions;
        }
    }, {
        key: 'selectTopic',

        /**
         * User selects a topic in the cloud
         * @method addTopic
         * @param {Event} evt: The delegated click event from the user
         */
        value: function selectTopic(evt) {
            if (evt.target.tagName === 'text') {
                document.dispatchEvent(new CustomEvent(TOPIC_SELECT_EVENT, {
                    'detail': this.topics.find(function (a) {
                        return a.id === evt.target.getAttribute('uid');
                    })
                }));
            }
        }
    }], [{
        key: 'createPosition',

        /**
         * Educated guess at a suitable position
         * @method createPosition
         * @static
         * @param {Number} angle: Current angle in spiral loop
         * @param {Number} count: Current index of item
         * @return {Object} The cooridinates to set
         */
        value: function createPosition(angle, count) {
            var x = 50;
            var y = 50;
            if (count > 0) {
                x += count * WordCloud.SPIRAL_STEP_X * Math.cos(angle);
                y += count * WordCloud.SPIRAL_STEP_Y * Math.sin(angle);
            }
            return { x: parseInt(x), y: parseInt(y) };
        }
    }, {
        key: 'detectCollision',

        /**
         * Educated guess at a suitable position
         * @method detectCollision
         * @static
         * @param {DOMCollection} textItems: DOM items to test agains
         * @param {Object} candidate: Current candidate item
         * @param {Boolean} was there a collision
         */
        value: function detectCollision(textItems, candidate) {
            return Array.from(textItems).some(WordCloud.boundsConflict.bind(WordCloud, candidate));
        }
    }, {
        key: 'boundsConflict',

        /**
         * Determines wether two text items collide
         * @method boundsConflict
         * @static
         * @param {Object} textItemA: First item to compare
         * @param {Object} textItemB: Second item to compare
         */
        value: function boundsConflict(textItemA, textItemB) {
            var a = textItemA.getBoundingClientRect();
            var b = textItemB.getBoundingClientRect();
            return textItemB.getAttribute('uid') != textItemA.getAttribute('uid') && !(a.left > b.right || a.right < b.left || a.top > b.bottom || a.bottom < b.top);
        }
    }, {
        key: 'MAX_TEXT_SIZE',
        get: function get() {
            return 8;
        }
    }, {
        key: 'TOTAL_FONT_SIZES',
        get: function get() {
            return 6;
        }
    }, {
        key: 'CLOUD_ROTATION',
        get: function get() {
            return 720;
        }
    }, {
        key: 'MAX_COLLISIONS_PER_ITEM',
        get: function get() {
            return 50;
        }
    }, {
        key: 'MIN_TEXT_SIZE',
        //vw
        get: function get() {
            return 0.2;
        }
    }, {
        key: 'SPIRAL_STEP_X',
        //vw
        get: function get() {
            return 1;
        }
    }, {
        key: 'SPIRAL_STEP_Y',
        //lower is more dense but less performant
        get: function get() {
            return 1.2;
        }
    }, {
        key: 'FONT_INCREMENT',
        //lower is more dense but less performant
        get: function get() {
            return (WordCloud.MAX_TEXT_SIZE - WordCloud.MIN_TEXT_SIZE) / WordCloud.TOTAL_FONT_SIZES;
        }
    }]);

    return WordCloud;
})();
//# sourceMappingURL=wordcloud.js.map