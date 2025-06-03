// src/components/shared/ToolHeader.ts

export class ToolHeader extends HTMLElement {
  static get observedAttributes() {
    return ["header-text"];
  }

  #headerText = "The tool";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.#headerText = this.getAttribute("header-text") ?? "The Tool";
    this.render();
  }

  attributeChangedCallback(
    _name: string,
    oldValue: string | null,
    newValue: string | null
  ) {
    if (oldValue !== newValue && newValue !== null) {
      this.#headerText = newValue;
      this.render();
    }
  }

  get headerText() {
    return this.#headerText;
  }
  set headerText(value: string) {
    if (value) {
      this.setAttribute("header-text", value);
      this.#headerText = value;
    } else {
      this.removeAttribute("header-text");
      this.#headerText = "";
    }
  }

  render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0;
          border-bottom: 1px solid #ddd;
        }
        /* If someone slotted an <img> into slot="logo", size it nicely */
        ::slotted(img[slot="logo"]) {
          width: 40px;
          height: auto;
          display: block;
        }
        h1 {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 600;
          color: #333;
        }
      </style>

      <header>
        <!-- Named slot for the logo -->
        <slot name="logo"></slot>

        <!-- Always render the h1 with header-text -->
        <h1>${this.#headerText}</h1>

        <!-- (If you ever want a "secondary" slot for more controls, you could add it here) -->
        <!-- <slot name="actions"></slot> -->
      </header>
    `;
  }
}

customElements.define("tool-header", ToolHeader);
