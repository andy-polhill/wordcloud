'use strict';

class MetadataView {

  constructor(element) {
    this.element = element;
    this.tmpl = Hogan.compile(document.getElementById('meta-template').textContent);
    document.addEventListener(TOPIC_SELECT_EVENT, this.render.bind(this));
  }

  render(evt) {
    this.element.innerHTML = this.tmpl.render(evt.detail);
  }
}
