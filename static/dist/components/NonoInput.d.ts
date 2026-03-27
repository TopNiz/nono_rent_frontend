import { NonoBase } from './NonoBase.js';
export declare class NonoInput extends NonoBase {
    static styles: CSSStyleSheet;
    private input;
    private label;
    private error;
    private container;
    constructor();
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    private updateInput;
    private addEventListeners;
    get value(): string;
    set value(val: string);
}
//# sourceMappingURL=NonoInput.d.ts.map