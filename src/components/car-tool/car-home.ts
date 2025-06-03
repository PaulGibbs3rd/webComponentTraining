// src/components/car-tool/car-home.ts

import type { Car } from "../../models/cars";
import "./car-table";
import "./car-form";

export class CarHome extends HTMLElement {
  #cars: Car[] = [];
  #features: any[] = [];
  #editCarId: number = -1;
  #pendingCarData: Omit<Car, "id"> | null = null;
  #awaitingLocation = false;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.#loadInitialCars();
    this.render();

    window.addEventListener(
      "map-click",
      this.#handleMapClick.bind(this) as EventListener
    );
  }

  disconnectedCallback() {
    window.removeEventListener(
      "map-click",
      this.#handleMapClick as EventListener
    );
  }

  #loadInitialCars() {
    this.#cars = [
      {
        id: 1,
        make: "Toyota",
        model: "Highlander",
        year: 2003,
        color: "red",
        price: 400,
      },
      {
        id: 2,
        make: "Fiat",
        model: "500e",
        year: 2015,
        color: "grey",
        price: 6000,
      },
    ];

    this.#features = [
      {
        type: "Feature",
        properties: {
          id: 1,
          make: "Toyota",
          model: "Highlander",
          year: 2003,
          color: "red",
          price: 400,
        },
        geometry: {
          type: "Point",
          coordinates: [-118.805, 34.027],
        },
      },
      {
        type: "Feature",
        properties: {
          id: 2,
          make: "Fiat",
          model: "500e",
          year: 2015,
          color: "grey",
          price: 6000,
        },
        geometry: {
          type: "Point",
          coordinates: [-118.81, 34.022],
        },
      },
    ];
  }

  private render() {
    if (!this.shadowRoot) return;

    const statusLine = this.#awaitingLocation
      ? `<p class="status-text">
           Please click on the map to choose a location for the new car…
         </p>`
      : "";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 1rem;
          font-family: sans-serif;
          background: #f9f9f9;
          box-sizing: border-box;
        }

        /* tool-header sits at the top of this panel */
        tool-header {
          display: block;
          margin-bottom: 1rem;
        }

        .status-text {
          color: #007acc;
          margin: 0.5rem 0;
          font-style: italic;
        }

        car-form,
        car-table {
          display: block;
          margin-bottom: 1rem;
        }
      </style>

      <!-- 1) ToolHeader with an <img> projected into slot="logo" -->
      <tool-header header-text="Car Tool">
        <img slot="logo" src="/car-logo.png" alt="Car Logo" />
      </tool-header>

      <!-- 2) Show a status line if we are waiting for the map click -->
      ${statusLine}

      <!-- 3) The existing form & table -->
      <car-form></car-form>
      <car-table></car-table>
    `;

    // -------------------------------------------------------
    // Wire up <car-form> “car-add” event
    // -------------------------------------------------------
    const carFormEl = this.shadowRoot.querySelector("car-form");
    if (carFormEl) {
      carFormEl.removeEventListener(
        "car-add",
        this.#handleCarAdd as EventListener
      );
      carFormEl.addEventListener(
        "car-add",
        this.#handleCarAdd.bind(this) as EventListener
      );
    }

    // -------------------------------------------------------
    // Wire up <car-table> (delete, edit-request, save, cancel)
    // -------------------------------------------------------
    const carTableEl = this.shadowRoot.querySelector(
      "car-table"
    ) as (HTMLElement & { cars: Car[]; editCarId: number }) | null;

    if (carTableEl) {
      carTableEl.cars = this.#cars;
      carTableEl.editCarId = this.#editCarId;

      carTableEl.removeEventListener(
        "car-delete",
        this.#handleCarDelete as EventListener
      );
      carTableEl.removeEventListener(
        "car-edit-request",
        this.#handleCarEditRequest as EventListener
      );
      carTableEl.removeEventListener(
        "car-save",
        this.#handleCarSave as EventListener
      );
      carTableEl.removeEventListener(
        "car-cancel",
        this.#handleCarCancel as EventListener
      );

      carTableEl.addEventListener(
        "car-delete",
        this.#handleCarDelete.bind(this) as EventListener
      );
      carTableEl.addEventListener(
        "car-edit-request",
        this.#handleCarEditRequest.bind(this) as EventListener
      );
      carTableEl.addEventListener(
        "car-save",
        this.#handleCarSave.bind(this) as EventListener
      );
      carTableEl.addEventListener(
        "car-cancel",
        this.#handleCarCancel.bind(this) as EventListener
      );
    }
  }

  #handleCarAdd(evt: Event) {
    const customEvt = evt as CustomEvent<Omit<Car, "id">>;
    const { make, model, year, color, price } = customEvt.detail;

    this.#pendingCarData = { make, model, year, color, price };
    this.#awaitingLocation = true;
    this.render();
  }

  #handleMapClick(evt: Event) {
    const customEvt = evt as CustomEvent<{ latitude: number; longitude: number }>;
    const { latitude, longitude } = customEvt.detail;

    if (!this.#awaitingLocation || !this.#pendingCarData) {
      return;
    }

    const maxId = this.#cars.reduce((acc, c) => (c.id > acc ? c.id : acc), 0);
    const newCarId = maxId + 1;
    const newCar: Car = {
      id: newCarId,
      make: this.#pendingCarData.make,
      model: this.#pendingCarData.model,
      year: this.#pendingCarData.year,
      color: this.#pendingCarData.color,
      price: this.#pendingCarData.price,
    };

    this.#cars = [...this.#cars, newCar];

    const newFeature = {
      type: "Feature",
      properties: {
        id: newCarId,
        make: newCar.make,
        model: newCar.model,
        year: newCar.year,
        color: newCar.color,
        price: newCar.price,
      },
      geometry: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
    };
    this.#features = [...this.#features, newFeature];

    this.#pendingCarData = null;
    this.#awaitingLocation = false;

    this.render();
    this._dispatchCarsUpdated();
  }

  #handleCarDelete(evt: Event) {
    const customEvt = evt as CustomEvent<number>;
    const idToDelete = customEvt.detail;

    this.#cars = this.#cars.filter((car) => car.id !== idToDelete);
    this.#editCarId = -1;
    this.#features = this.#features.filter(
      (feat) => feat.properties.id !== idToDelete
    );

    this.#pendingCarData = null;
    this.#awaitingLocation = false;

    this.render();
    this._dispatchCarsUpdated();
  }

  #handleCarEditRequest(evt: Event) {
    const customEvt = evt as CustomEvent<number>;
    const idToEdit = customEvt.detail;
    this.#editCarId = idToEdit;
    this.render();
  }

  #handleCarSave(evt: Event) {
    const customEvt = evt as CustomEvent<Car>;
    const updatedCar = customEvt.detail;

    this.#cars = this.#cars.map((c) =>
      c.id === updatedCar.id ? updatedCar : c
    );

    this.#features = this.#features.map((feat) => {
      if (feat.properties.id === updatedCar.id) {
        return {
          ...feat,
          properties: {
            id: updatedCar.id,
            make: updatedCar.make,
            model: updatedCar.model,
            year: updatedCar.year,
            color: updatedCar.color,
            price: updatedCar.price,
          },
        };
      }
      return feat;
    });

    this.#editCarId = -1;
    this.render();
    this._dispatchCarsUpdated();
  }

  #handleCarCancel() {
    this.#editCarId = -1;
    this.render();
  }

  private _dispatchCarsUpdated() {
    const featureCollection = {
      type: "FeatureCollection",
      features: this.#features,
    };
    window.dispatchEvent(
      new CustomEvent("cars-updated", { detail: featureCollection })
    );
  }
}

customElements.define("car-home", CarHome);
