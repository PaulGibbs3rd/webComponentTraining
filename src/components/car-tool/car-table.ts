// src/components/car-tool/car-table.ts
import type { Car } from "../../models/cars";

export class CarTable extends HTMLElement {
  #cars: Car[] = [];
  #editCarId: number = -1;
  #styleElement: HTMLStyleElement;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.#styleElement = document.createElement("style");
    this.#styleElement.textContent = `
      :host {
        display: block;
        font-family: sans-serif;
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      th, td {
        padding: 0.5rem;
        text-align: left;
        border: 1px solid #ccc;
      }
      th {
        background-color: #f0f0f0;
        font-weight: bold;
      }
      button {
        margin-right: 0.5rem;
        padding: 0.25rem 0.5rem;
        border: none;
        border-radius: 3px;
        cursor: pointer;
      }
      button.delete-btn {
        background-color: #e74c3c;
        color: white;
      }
      button.delete-btn:hover {
        background-color: #c0392b;
      }
      button.edit-btn {
        background-color: #3498db;
        color: white;
      }
      button.edit-btn:hover {
        background-color: #2980b9;
      }
      button.save-btn {
        background-color: #2ecc71;
        color: white;
      }
      button.save-btn:hover {
        background-color: #27ae60;
      }
      button.cancel-btn {
        background-color: #95a5a6;
        color: white;
      }
      button.cancel-btn:hover {
        background-color: #7f8c8d;
      }
      input {
        width: 100%;
        box-sizing: border-box;
        padding: 0.25rem;
      }
    `;
  }

  set cars(value: Car[]) {
    this.#cars = Array.isArray(value) ? value : [];
    this.render();
  }
  get cars(): Car[] {
    return this.#cars;
  }

  set editCarId(value: number) {
    this.#editCarId = typeof value === "number" ? value : -1;
    this.render();
  }
  get editCarId(): number {
    return this.#editCarId;
  }

  connectedCallback() {
    this.render();
  }

  private render() {
    if (!this.shadowRoot) {
      return;
    }
    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(this.#styleElement);

    const rowsHtml = this.#cars
      .map((car) => {
        if (car.id === this.#editCarId) {
          // EDIT MODE
          return `
            <tr data-id="${car.id}" class="edit-row">
              <td>${String(car.id).padStart(2, "0")}</td>
              <td><input type="text" name="make" value="${car.make}" /></td>
              <td><input type="text" name="model" value="${car.model}" /></td>
              <td><input type="number" name="year" value="${car.year}" /></td>
              <td><input type="text" name="color" value="${car.color}" /></td>
              <td><input type="number" name="price" value="${car.price}" /></td>
              <td>
                <button class="save-btn" data-id="${car.id}">Save Car</button>
                <button class="cancel-btn" data-id="${car.id}">Cancel Car</button>
              </td>
            </tr>
          `;
        } else {
          // READ‐ONLY MODE
          return `
            <tr data-id="${car.id}">
              <td>${String(car.id).padStart(2, "0")}</td>
              <td>${escapeHtml(car.make)}</td>
              <td>${escapeHtml(car.model)}</td>
              <td>${car.year}</td>
              <td>${escapeHtml(car.color)}</td>
              <td>$${car.price}</td>
              <td>
                <button class="edit-btn" data-id="${car.id}">Edit</button>
                <button class="delete-btn" data-id="${car.id}">Delete</button>
              </td>
            </tr>
          `;
        }
      })
      .join("");

    const tableEle = document.createElement("table");
    tableEle.innerHTML = `
      <thead>
        <tr>
          <th>ID</th>
          <th>Make</th>
          <th>Model</th>
          <th>Year</th>
          <th>Color</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${rowsHtml}
      </tbody>
    `;
    this.shadowRoot.appendChild(tableEle);

    // DELETE
    this.shadowRoot
      .querySelectorAll("button.delete-btn")
      .forEach((btn) => {
        btn.addEventListener("click", (evt) => {
          const id = Number(
            (evt.currentTarget as HTMLElement).getAttribute("data-id")
          );
          this.dispatchEvent(
            new CustomEvent<number>("car-delete", {
              detail: id,
              bubbles: true,
              composed: true,
            })
          );
        });
      });

    // EDIT
    this.shadowRoot
      .querySelectorAll("button.edit-btn")
      .forEach((btn) => {
        btn.addEventListener("click", (evt) => {
          const id = Number(
            (evt.currentTarget as HTMLElement).getAttribute("data-id")
          );
          this.dispatchEvent(
            new CustomEvent<number>("car-edit-request", {
              detail: id,
              bubbles: true,
              composed: true,
            })
          );
        });
      });

    // SAVE
    this.shadowRoot
      .querySelectorAll("button.save-btn")
      .forEach((btn) => {
        btn.addEventListener("click", (evt) => {
          const id = Number(
            (evt.currentTarget as HTMLElement).getAttribute("data-id")
          );
          const row = this.shadowRoot!.querySelector(
            `tr[data-id="${id}"].edit-row`
          ) as HTMLTableRowElement | null;
          if (!row) {
            return;
          }
          const updatedCar: Car = {
            id,
            make: (row.querySelector('input[name="make"]') as HTMLInputElement)
              .value,
            model: (row.querySelector('input[name="model"]') as HTMLInputElement)
              .value,
            year: Number(
              (row.querySelector('input[name="year"]') as HTMLInputElement)
                .value
            ),
            color: (row.querySelector('input[name="color"]') as HTMLInputElement)
              .value,
            price: Number(
              (row.querySelector('input[name="price"]') as HTMLInputElement)
                .value
            ),
          };
          this.dispatchEvent(
            new CustomEvent<Car>("car-save", {
              detail: updatedCar,
              bubbles: true,
              composed: true,
            })
          );
        });
      });

    // CANCEL
    this.shadowRoot
      .querySelectorAll("button.cancel-btn")
      .forEach((btn) => {
        btn.addEventListener("click", () => {
          this.dispatchEvent(
            new CustomEvent<void>("car-cancel", {
              bubbles: true,
              composed: true,
            })
          );
        });
      });
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

customElements.define("car-table", CarTable);
