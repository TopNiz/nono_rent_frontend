import { NonoBase } from "./NonoBase.js";
export class NonoTextarea extends NonoBase {
    constructor() {
        super();
        this.shadowRoot.adoptedStyleSheets.push(NonoTextarea.styles);
        this.container = document.createElement("div");
        this.container.classList.add("nono-textarea-container");
        this.label = document.createElement("label");
        this.textarea = document.createElement("textarea");
        this.error = document.createElement("span");
        this.error.classList.add("error");
        this.container.appendChild(this.label);
        this.container.appendChild(this.textarea);
        this.container.appendChild(this.error);
        this.shadowRoot.appendChild(this.container);
        this.updateTextarea();
        this.addEventListeners();
    }
    static get observedAttributes() {
        return [
            "label",
            "placeholder",
            "required",
            "value",
            "rows",
            "cols",
            "error",
        ];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.updateTextarea();
        }
    }
    updateTextarea() {
        const label = this.getAttribute("label") || "";
        const placeholder = this.getAttribute("placeholder") || "";
        const required = this.hasAttribute("required");
        const value = this.getAttribute("value") || "";
        const rows = parseInt(this.getAttribute("rows") || "4");
        const cols = parseInt(this.getAttribute("cols") || "50");
        const error = this.getAttribute("error") || "";
        this.label.textContent = label;
        this.textarea.placeholder = placeholder;
        this.textarea.required = required;
        this.textarea.value = value;
        this.textarea.rows = rows;
        this.textarea.cols = cols;
        this.error.textContent = error;
        this.error.style.display = error ? "block" : "none";
    }
    addEventListeners() {
        this.textarea.addEventListener("input", () => {
            this.dispatchEvent(new CustomEvent("input", { detail: { value: this.textarea.value } }));
        });
        this.textarea.addEventListener("change", () => {
            this.dispatchEvent(new CustomEvent("change", { detail: { value: this.textarea.value } }));
        });
    }
    get value() {
        return this.textarea.value;
    }
    set value(val) {
        this.textarea.value = val;
        this.setAttribute("value", val);
    }
}
NonoTextarea.styles = NonoBase.css `
    .nono-textarea-container {
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

    textarea {
      font-family: var(--font-family);
      font-size: var(--font-size-base);
      padding: var(--spacing-sm);
      border: 1px solid #ccc;
      border-radius: var(--border-radius);
      outline: none;
      transition: border-color 0.2s;
      resize: vertical;
    }

    textarea:focus {
      border-color: var(--primary-color);
    }

    textarea:invalid {
      border-color: var(--danger-color);
    }

    .error {
      font-family: var(--font-family);
      font-size: 12px;
      color: var(--danger-color);
      display: none;
    }
  `;
customElements.define("nono-textarea", NonoTextarea);
//# sourceMappingURL=NonoTextarea.js.map