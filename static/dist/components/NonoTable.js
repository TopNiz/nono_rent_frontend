import { NonoBase } from "./NonoBase.js";
export class NonoTable extends NonoBase {
    constructor() {
        super();
        this.shadowRoot.adoptedStyleSheets.push(NonoTable.styles);
        this.table = document.createElement("table");
        this.table.classList.add("nono-table");
        this.shadowRoot.appendChild(this.table);
        this.updateTable();
    }
    static get observedAttributes() {
        return ["headers", "data"];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.updateTable();
        }
    }
    updateTable() {
        const headers = JSON.parse(this.getAttribute("headers") || "[]");
        const data = JSON.parse(this.getAttribute("data") || "[]");
        this.table.innerHTML = "";
        if (headers.length > 0) {
            const thead = document.createElement("thead");
            const headerRow = document.createElement("tr");
            headers.forEach((header) => {
                const th = document.createElement("th");
                th.textContent = header;
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);
            this.table.appendChild(thead);
        }
        if (data.length > 0) {
            const tbody = document.createElement("tbody");
            data.forEach((row) => {
                const tr = document.createElement("tr");
                row.forEach((cell) => {
                    const td = document.createElement("td");
                    td.textContent = cell;
                    tr.appendChild(td);
                });
                tbody.appendChild(tr);
            });
            this.table.appendChild(tbody);
        }
    }
}
NonoTable.styles = NonoBase.css `
    .nono-table {
      width: 100%;
      border-collapse: collapse;
      font-family: var(--font-family);
      font-size: var(--font-size-base);
    }

    .nono-table th,
    .nono-table td {
      padding: var(--spacing-sm);
      border: 1px solid #ccc;
      text-align: left;
    }

    .nono-table th {
      background-color: var(--light-color);
      font-weight: 600;
    }

    .nono-table tr:nth-child(even) {
      background-color: var(--light-color);
    }
  `;
customElements.define("nono-table", NonoTable);
//# sourceMappingURL=NonoTable.js.map