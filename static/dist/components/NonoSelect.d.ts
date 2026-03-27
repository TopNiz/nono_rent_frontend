import { NonoBase } from "./NonoBase.js";
export declare class NonoSelect extends NonoBase {
    static styles: CSSStyleSheet;
    private select;
    private label;
    private error;
    private container;
    constructor();
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    private updateSelect;
    private addEventListeners;
    get value(): string;
    set value(val: string);
}
//# sourceMappingURL=NonoSelect.d.ts.map