import { NonoBase } from "./NonoBase.js";
export declare class NonoTextarea extends NonoBase {
    static styles: CSSStyleSheet;
    private textarea;
    private label;
    private error;
    private container;
    constructor();
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    private updateTextarea;
    private addEventListeners;
    get value(): string;
    set value(val: string);
}
//# sourceMappingURL=NonoTextarea.d.ts.map