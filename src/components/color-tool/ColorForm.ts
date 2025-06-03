import type { NewColor } from "../../models/colors";

export class ColorForm extends HTMLElement {
  #stylesheetElement: HTMLStyleElement;
  #templateElement: HTMLTemplateElement;
  #onSubmitColor: ((color: NewColor) => void) | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // 1) Create a <style> for the form
    this.#stylesheetElement = document.createElement("style");
    this.#stylesheetElement.textContent = `
      :host {
        display: block;
        font-family: sans-serif;
      }
      .form-group {
        margin-bottom: 0.5rem;
      }
      label {
        display: block;
        font-size: 0.9rem;
        margin-bottom: 0.2rem;
      }
      input[type="text"] {
        width: 100%;
        padding: 0.25rem;
        box-sizing: border-box;
      }
      button {
        margin-top: 0.5rem;
        padding: 0.4rem 0.8rem;
        font-size: 0.9rem;
        cursor: pointer;
      }
    `;

    // 2) Create a <template> for the form’s HTML
    this.#templateElement = document.createElement("template");
    this.#templateElement.innerHTML = `
      <form>
        <div class="form-group">
          <label for="color-name">Name:</label>
          <input
            type="text"
            id="color-name"
            required
            placeholder="Enter color name"
          />
        </div>
        <div class="form-group">
          <label for="color-hexcode">Hexcode:</label>
          <input
            type="text"
            id="color-hexcode"
            required
            placeholder="Enter color hexcode (e.g. #FF0000)"
          />
        </div>
        <button type="submit">Add Color</button>
      </form>
    `;
  }

  connectedCallback() {
    this.render();
  }

  // Expose a setter so <color-home> can assign a callback
  set onSubmitColor(callback: (color: NewColor) => void) {
    this.#onSubmitColor = callback;
  }

  #setupEventListeners() {
    if (!this.shadowRoot) return;
    const form = this.shadowRoot.querySelector<HTMLFormElement>("form");
    if (form) {
      form.addEventListener("submit", this.#handleSubmit);
    }
  }

  #handleSubmit = (event: Event) => {
    event.preventDefault();
    if (!this.#onSubmitColor) return;

    // **IMPORTANT**: Query inputs from the shadow DOM, not document
    const nameInput = this.shadowRoot!.querySelector<HTMLInputElement>("#color-name");
    const hexInput = this.shadowRoot!.querySelector<HTMLInputElement>("#color-hexcode");

    if (!nameInput || !hexInput) return;

    const name = nameInput.value.trim();
    const hexCode = hexInput.value.trim();
    if (!name || !hexCode) return;

    this.#onSubmitColor({ name, hexCode });

    // Clear & focus
    nameInput.value = "";
    hexInput.value = "";
    nameInput.focus();
  };

  render() {
    if (!this.shadowRoot) return;

    // 1) Clear out anything already inside shadowRoot
    this.shadowRoot.innerHTML = "";

    // 2) Append our <style> and <template> content
    this.shadowRoot.appendChild(this.#stylesheetElement);
    this.shadowRoot.appendChild(this.#templateElement.content.cloneNode(true));

    // 3) Wire up the event listener on the newly-inserted <form>
    this.#setupEventListeners();
  }
}

// **Register under the exact tag name "color-form"**
window.customElements.define("color-form", ColorForm);
