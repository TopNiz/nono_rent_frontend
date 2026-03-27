var _a;
export class NonoBase extends HTMLElement {
    static css(strings, ...values) {
        const style = new CSSStyleSheet();
        style.replaceSync(String.raw(strings, ...values));
        return style;
    }
    static html(strings, ...values) {
        const template = document.createElement('template');
        template.innerHTML = String.raw(strings, ...values);
        return template.content;
    }
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.adoptedStyleSheets = [_a.baseStyles];
    }
}
_a = NonoBase;
(() => {
    _a.baseStyles = new CSSStyleSheet();
    _a.baseStyles.replaceSync(`
      :host {
        --primary-color: #007bff;
        --secondary-color: #6c757d;
        --success-color: #28a745;
        --danger-color: #dc3545;
        --warning-color: #ffc107;
        --info-color: #17a2b8;
        --light-color: #f8f9fa;
        --dark-color: #343a40;
        --font-family: 'Arial', sans-serif;
        --font-size-base: 14px;
        --border-radius: 4px;
        --spacing-xs: 4px;
        --spacing-sm: 8px;
        --spacing-md: 16px;
        --spacing-lg: 24px;
        --spacing-xl: 32px;
      }

      * {
        box-sizing: border-box;
      }

      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
    `);
})();
//# sourceMappingURL=NonoBase.js.map