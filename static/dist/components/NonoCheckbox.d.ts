import { NonoBase } from "./NonoBase.js";
export declare class NonoCheckbox extends NonoBase {
    static styles: CSSStyleSheet;
    private checkbox;
    private label;
    private error;
    private container;
    constructor();
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    private updateCheckbox;
    private addEventListeners;
    get checked(): boolean;
    set checked(val: boolean);
}
//# sourceMappingURL=NonoCheckbox.d.ts.map