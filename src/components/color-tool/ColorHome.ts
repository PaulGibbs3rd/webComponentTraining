import type { Color, NewColor } from "../../models/colors";
import { ColorList } from "./color-list"; // make sure this path is correct
import { ColorForm } from "./ColorForm"; // this ensures the custom element <color-form> is defined

export class ColorHome extends HTMLElement {
  #colors: Color[] = [];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.#loadColors();
    this.render();
  }

  #loadColors() {
    // In a real app you might fetch(...) from a server
    this.#colors = [
      { id: 1, name: "red", hexCode: "#FF0000" },
      { id: 2, name: "green", hexCode: "#00FF00" },
      { id: 3, name: "blue", hexCode: "#0000FF" },
    ];
  }

  render() {
    if (!this.shadowRoot) return;

    // STEP 1: Insert both <color-form> and <color-list> into our shadow DOM
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 1rem;
          font-family: sans-serif;
          border: 1px solid #ddd;
          border-radius: 4px;
          max-width: 300px;
        }
        h2 {
          margin: 0 0 0.5rem 0;
          color: #003366;
          font-size: 1.25rem;
        }
        color-form {
          margin-bottom: 1rem;
          display: block;
        }
      </style>

      <header>
        <h2>Color Tool</h2>
      </header>

      <!-- Insert the form -->
      <color-form></color-form>

      <!-- Insert the list -->
      <color-list></color-list>
    `;

    // STEP 2: Populate <color-list>
    const colorListEl = this.shadowRoot.querySelector("color-list") as ColorList | null;
    if (colorListEl) {
      colorListEl.colors = this.#colors;
    }

    // STEP 3: Hook up the form’s onSubmit callback
    customElements.whenDefined("color-form").then(() => {
      const colorFormEl = this.shadowRoot!.querySelector("color-form") as
        | (HTMLElement & { onSubmitColor?: (color: NewColor) => void })
        | null;
      if (colorFormEl) {
        colorFormEl.onSubmitColor = (newColor: NewColor) => {
          this.#colors.push({
            id: Math.max(0, ...this.#colors.map((c) => c.id)) + 1,
            name: newColor.name,
            hexCode: newColor.hexCode,
          });
          this.render();
        };
      }
    });
  }
}

customElements.define("color-home", ColorHome);
