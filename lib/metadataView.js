'use strict';

/**
 * Class to render topic data to the DOM
 * @class MetadataView
 */
class MetadataView {

  static get META_TEMPLATE_ID() { return 'meta-template' };

  /**
   * @constructor
   * @param {Object} element: The element to render to
   */
  constructor(element, template) {
    if(typeof element !== 'object') throw 'Please provide container element';
    if(!element instanceof String) throw 'Please provide a template';
    this.element = element;
    this.tmpl = Hogan.compile(template);
    document.addEventListener(TOPIC_SELECT_EVENT, this.render.bind(this));
    this.render({}); //render blank view
  }

  /**
   * Adds a topic to the word cloud
   * @method render
   * @param {Object} evt: The event that triggered the show call
   */
  render(evt) {
    this.element.innerHTML = this.tmpl.render(evt.detail);
  }
}
