import { NonoBase } from './NonoBase.js';
export class NonoCheckbox extends NonoBase {
    constructor() {
        super();
        this.shadowRoot.adoptedStyleSheets.push(NonoCheckbox.styles);
        this.container = document.createElement('div');
        this.container.classList.add('nono-checkbox-container');
        this.checkbox = document.createElement('input');
        this.checkbox.type = 'checkbox';
        this.label = document.createElement('label');
        this.error = document.createElement('span');
        this.error.classList.add('error');
        this.container.appendChild(this.checkbox);
        this.container.appendChild(this.label);
        this.container.appendChild(this.error);
        this.shadowRoot.appendChild(this.container);
        this.updateCheckbox();
        this.addEventListeners();
    }
    static get observedAttributes() {
        return ['label', 'checked', 'required', 'error'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.updateCheckbox();
        }
    }
    updateCheckbox() {
        const label = this.getAttribute('label') || '';
        const checked = this.hasAttribute('checked');
        const required = this.hasAttribute('required');
        const error = this.getAttribute('error') || '';
        this.label.textContent = label;
        this.checkbox.checked = checked;
        this.checkbox.required = required;
        this.error.textContent = error;
        this.error.style.display = error ? 'block' : 'none';
    }
    addEventListeners() {
        this.checkbox.addEventListener('change', () => {
            this.dispatchEvent(new CustomEvent('change', { detail: { checked: this.checkbox.checked } }));
        });
    }
    get checked() {
        return this.checkbox.checked;
    }
    set checked(val) {
        this.checkbox.checked = val;
        if (val) {
            this.setAttribute('checked', '');
        }
        else {
            this.removeAttribute('checked');
        }
    }
}
NonoCheckbox.styles = NonoBase.css `
    .nono-checkbox-container {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
    }

    input[type="checkbox"] {
      width: 16px;
      height: 16px;
      cursor: pointer;
    }

    label {
      font-family: var(--font-family);
      font-size: var(--font-size-base);
      cursor: pointer;
      color: var(--dark-color);
    }

    .error {
      font-family: var(--font-family);
      font-size: 12px;
      color: var(--danger-color);
      display: none;
    }
  `;
customElements.define('nono-checkbox', NonoCheckbox);
//# sourceMappingURL=NonoCheckbox.js.map