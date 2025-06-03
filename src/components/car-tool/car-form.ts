// car-form.ts
import type { Car } from "../../models/cars";

export class CarForm extends HTMLElement {
  #styleEl: HTMLStyleElement;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Basic styling for the form
    this.#styleEl = document.createElement("style");
    this.#styleEl.textContent = `
      :host {
        display: block;
      }
      form {
        margin: 1rem 0;
        padding: 1rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        background: #f9f9f9;
      }
      .form-group {
        margin-bottom: 0.5rem;
        display: flex;
        align-items: center;
      }
      label {
        display: inline-block;
        width: 80px;
        margin-right: 0.5rem;
      }
      input[type="text"], input[type="number"] {
        padding: 0.5rem;
        margin-right: 0.5rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        flex: 1;
      }
      button {
        padding: 0.5rem 1rem;
        background: #4CAF50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin-top: 0.5rem;
      }
      button:hover {
        background: #45a049;
      }        
    `;
  }

  connectedCallback() {
    this.render();
    this.#attachFormListener();
  }

  private render() {
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(this.#styleEl);

    // Form with Make, Model, Year, Color, Price
    this.shadowRoot.innerHTML += `
      <form id="car-form">
        <label>
          Make
          <input type="text" name="make" required />
        </label>
        <label>
          Model
          <input type="text" name="model" required />
        </label>
        <label>
          Year
          <input type="number" name="year" required min="1900" max="2099" step="1" />
        </label>
        <label>
          Color
          <input type="text" name="color" required />
        </label>
        <label>
          Price
          <input type="number" name="price" required min="0" step="1" />
        </label>
        <button type="submit">Add Car</button>
      </form>
    `;
  }

   #attachFormListener() {
    const form = this.shadowRoot!.querySelector(
      "form#car-form"
    ) as HTMLFormElement | null;
    if (!form) return;

    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const formData = new FormData(form);

      // Build a partial Car object (no id yet)
      const newCarData: Omit<Car, "id"> = {
        make: String(formData.get("make") ?? ""),
        model: String(formData.get("model") ?? ""),
        year: Number(formData.get("year") ?? 0),
        color: String(formData.get("color") ?? ""),
        price: Number(formData.get("price") ?? 0),
      };

      // Dispatch a CustomEvent so the parent <car-home> can catch it
      this.dispatchEvent(
        new CustomEvent("car-add", {
          detail: newCarData,
          bubbles: true,
          composed: true,
        })
      );

      // Clear the form fields after dispatching
      form.reset();
    });
  }
}

customElements.define("car-form", CarForm);
