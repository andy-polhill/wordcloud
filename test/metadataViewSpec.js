'use strict';

const TOPIC_SELECT_EVENT = 'topic:selected';
var Hogan;

describe('MetadataView', function() {

  var metadataView, container;

  beforeEach(function() {
    Hogan = jasmine.createSpyObj('Hogan', ['compile']);
    spyOn(MetadataView.prototype, 'render');
    container = document.createElement('div');
    document.body.appendChild(container);
    metadataView = new MetadataView(container, "");
  });

  describe('#constructor', function() {
    it('should call render when constructed', function() {
      expect(MetadataView.prototype.render.calls.count()).toEqual(1);
    });
    it('should call render when a topic is selected', function() {
      document.dispatchEvent(new CustomEvent(TOPIC_SELECT_EVENT, {}));
      expect(MetadataView.prototype.render.calls.count()).toEqual(2);
    });
  });
});
