'use strict';

const META_TEMPLATE_ID = 'meta-template';

/**
 * Class to render topic data to the DOM
 * @class MetadataView
 */
class MetadataView {

  /**
   * @constructor
   * @param {Object} element: The element to render to
   */
  constructor(element) {
    this.element = element;
    this.tmpl = Hogan.compile(document.getElementById(META_TEMPLATE_ID).textContent);
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
