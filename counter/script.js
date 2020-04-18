// Create a custom MyCounter element, extending the native HTMLElement class
class MyCounter extends HTMLElement {
  constructor() {
    // Inherit the methods of the HTML Element class
    super();
    // Create our own sub-DOM which prevents styles from leaking in/out
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  get count() {
    return this.getAttribute('count');
  }

  set count(val) {
    this.setAttribute('count', val);
  }

  static get observedAttributes() {
    return ['count'];
  }

  attributeChangedCallback(prop, oldVal, newVal) {
    if (prop === 'count') {
      this.render();
      let btn = this.shadow.querySelector('#btn');
      btn.addEventListener('click', this.inc.bind(this));
    }
  }

  inc() {
    this.count++;
  }

  connectedCallback() {
    this.render();
    let btn = this.shadow.querySelector('#btn');
    btn.addEventListener('click', this.inc.bind(this));
  }

  render() {
    this.shadow.innerHTML = `
      <h1>Counter</h1>
      ${this.count}
      <button id="btn">Increment</button>
    `;
  }
}

// Register the custom element
customElements.define('my-counter', MyCounter);
