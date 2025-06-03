// src/components/color-tool/color-lists.ts
import type { Color } from "../../models/colors";

export class ColorList extends HTMLElement {
  #colors: Color[] = [];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  // Whenever someone does colorListEl.colors = [...], we re-render:
  set colors(value: Color[]) {
    this.#colors = value ?? [];
    this.render();
  }

  get colors(): Color[] {
    return this.#colors;
  }

  connectedCallback() {
    this.render();
  }

  private normalizeHex(raw: string): string {
    // Trim whitespace and force uppercase
    const trimmed = raw.trim().toUpperCase();

    // If it already starts with "#", just return it.
    if (trimmed.startsWith("#")) {
      return trimmed;
    }

    // Otherwise prepend "#"
    return "#" + trimmed;
  }

  render() {
    if (!this.shadowRoot) {
      return;
    }

    // Build each <li> so that the swatch always has a valid "#RRGGBB"
    const itemsHtml = this.#colors
      .map((c) => {
        const safeHex = this.normalizeHex(c.hexCode);
        return `
          <li>
            <span
              class="swatch"
              style="background-color: ${safeHex}"
            ></span>
            ${c.name.toUpperCase()} — ${safeHex}
          </li>
        `;
      })
      .join("");

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: sans-serif;
        }
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        li {
          display: flex;
          align-items: center;
          margin: 0.25rem 0;
          font-size: 0.95rem;
        }
        .swatch {
          display: inline-block;
          width: 1rem;
          height: 1rem;
          margin-right: 0.5rem;
          border: 1px solid #aaa;
        }
      </style>
      <ul>
        ${itemsHtml}
      </ul>
    `;
  }
}

customElements.define("color-list", ColorList);
