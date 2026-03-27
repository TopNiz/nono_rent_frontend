import { NonoBase } from "./NonoBase.js";
export class NonoInput extends NonoBase {
    constructor() {
        super();
        this.shadowRoot.adoptedStyleSheets.push(NonoInput.styles);
        this.container = document.createElement("div");
        this.container.classList.add("nono-input-container");
        this.label = document.createElement("label");
        this.input = document.createElement("input");
        this.error = document.createElement("span");
        this.error.classList.add("error");
        this.container.appendChild(this.label);
        this.container.appendChild(this.input);
        this.container.appendChild(this.error);
        this.shadowRoot.appendChild(this.container);
        this.updateInput();
        this.addEventListeners();
    }
    static get observedAttributes() {
        return ["type", "label", "placeholder", "required", "value", "error"];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.updateInput();
        }
    }
    updateInput() {
        const type = this.getAttribute("type") || "text";
        const label = this.getAttribute("label") || "";
        const placeholder = this.getAttribute("placeholder") || "";
        const required = this.hasAttribute("required");
        const value = this.getAttribute("value") || "";
        const error = this.getAttribute("error") || "";
        this.input.type = type;
        this.input.placeholder = placeholder;
        this.input.required = required;
        this.input.value = value;
        this.label.textContent = label;
        this.error.textContent = error;
        this.error.style.display = error ? "block" : "none";
    }
    addEventListeners() {
        this.input.addEventListener("input", () => {
            this.dispatchEvent(new CustomEvent("input", { detail: { value: this.input.value } }));
        });
        this.input.addEventListener("change", () => {
            this.dispatchEvent(new CustomEvent("change", { detail: { value: this.input.value } }));
        });
    }
    get value() {
        return this.input.value;
    }
    set value(val) {
        this.input.value = val;
        this.setAttribute("value", val);
    }
}
NonoInput.styles = NonoBase.css `
    .nono-input-container {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);
    }

    label {
      font-family: var(--font-family);
      font-size: var(--font-size-base);
      font-weight: 500;
      color: var(--dark-color);
    }

    input {
      font-family: var(--font-family);
      font-size: var(--font-size-base);
      padding: var(--spacing-sm);
      border: 1px solid #ccc;
      border-radius: var(--border-radius);
      outline: none;
      transition: border-color 0.2s;
    }

    input:focus {
      border-color: var(--primary-color);
    }

    input:invalid {
      border-color: var(--danger-color);
    }

    .error {
      font-family: var(--font-family);
      font-size: 12px;
      color: var(--danger-color);
      display: none;
    }
  `;
customElements.define("nono-input", NonoInput);
//# sourceMappingURL=NonoInput.js.map