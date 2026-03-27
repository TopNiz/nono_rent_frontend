import { NonoBase } from "./NonoBase.js";
export declare class NonoTable extends NonoBase {
    static styles: CSSStyleSheet;
    private table;
    constructor();
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    private updateTable;
}
//# sourceMappingURL=NonoTable.d.ts.map