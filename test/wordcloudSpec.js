describe('Wordcloud', function() {

  var container;

  beforeEach(function() {
    container = document.createElement('div');
    container.id = 'wodcloud';
    document.body.appendChild(container);
  });

  afterEach(function() {
    document.body.removeChild(container);
  });

  describe('Cloud creation', function() {

    it('should throw a warning if no data is provided', function() {
      expect(function() {
        new WordCloud();
      }).toThrow();
    });

    it('should throw a warning if no DOM element is provided', function() {
      expect(function() {
        new WordCloud({});
      }).toThrow();
    });

    it('should not throw a warning data and element are provided', function() {
      expect(function() {
        new WordCloud({}, document.getElementById('wordcloud')); 
      }).toThrow();
    });

    it('should create a text element for each topic', function() {

    });

  });

});
