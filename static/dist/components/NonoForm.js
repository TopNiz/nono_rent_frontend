import { NonoBase } from './NonoBase.js';
export class NonoForm extends NonoBase {
    constructor() {
        super();
        this.shadowRoot.adoptedStyleSheets.push(NonoForm.styles);
        this.form = document.createElement('form');
        this.form.classList.add('nono-form');
        this.shadowRoot.appendChild(this.form);
        this.addEventListeners();
    }
    addEventListeners() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.dispatchEvent(new CustomEvent('submit'));
        });
    }
    submit() {
        this.form.requestSubmit();
    }
}
NonoForm.styles = NonoBase.css `
    .nono-form {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
    }

    .nono-form ::slotted(*) {
      width: 100%;
    }
  `;
customElements.define('nono-form', NonoForm);
//# sourceMappingURL=NonoForm.js.map