/// <reference types="arcgis-js-api" />
declare const require: any;

export class MapHome extends HTMLElement {
  private _viewDiv: HTMLDivElement | null = null;
  private _mapView: __esri.MapView | null = null;
  private _geojsonLayer: __esri.GeoJSONLayer | null = null;
  private _initialized = false;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback(): void {
    this.shadowRoot!.innerHTML = `
      <link
        rel="stylesheet"
        href="https://js.arcgis.com/4.32/esri/themes/light/main.css"
      />
      <style>
        :host {
          display: block;
          margin-top: 1rem;
        }
        #viewDiv {
          width: 100%;
          height: 400px;
          border: 1px solid #ccc;
        }
      </style>
      <div id="viewDiv"></div>
    `;

    requestAnimationFrame(() => {
      this._viewDiv = this.shadowRoot!.querySelector("#viewDiv");
      if (!this._viewDiv) {
        console.error("map-home: #viewDiv not found");
        return;
      }

      require(
        [
          "esri/Map",
          "esri/views/MapView",
          "esri/layers/GeoJSONLayer",
        ],
        (
          EsriMap: typeof __esri.Map,
          MapView: typeof __esri.MapView,
          GeoJSONLayer: typeof __esri.GeoJSONLayer
        ) => {
          const map = new EsriMap({ basemap: "streets-navigation-vector" });
          this._mapView = new MapView({
            container: this._viewDiv as HTMLDivElement,
            map: map,
            center: [-118.805, 34.027],
            zoom: 11,
          });

          this._mapView.when(() => {
            if (!this._initialized) {
              this._initialized = true;
              // Add the initial static /cars.geojson layer
              this._geojsonLayer = new GeoJSONLayer({
                url: "/cars.geojson",
                outFields: ["*"],
                popupTemplate: {
                  title: "Car #{id}: {make} {model}",
                  content:
                    "<b>Year:</b> {year}<br>" +
                    "<b>Color:</b> {color}<br>" +
                    "<b>Price:</b> $ {price}",
                },
              });
              map.add(this._geojsonLayer);

              // Listen for “cars-updated” (in‐memory changes)
              window.addEventListener(
                "cars-updated",
                this._onCarsUpdated.bind(this) as EventListener
              );
            }

            // ─────────── HERE ───────────
            // Every time the user clicks on the map, emit “map-click”
            this._mapView?.on("click", (event: __esri.ViewClickEvent) => {
              if (event.mapPoint) {
                const { latitude, longitude } = event.mapPoint;
                this.dispatchEvent(
                  new CustomEvent("map-click", {
                    detail: { latitude, longitude },
                    bubbles: true,
                    composed: true,
                  })
                );
              }
            });
            // ─────────────────────────────
          });
        }
      );
    });
  }

  disconnectedCallback(): void {
    if (this._mapView) {
      this._mapView.destroy();
      this._mapView = null;
    }
    this._geojsonLayer = null;
    window.removeEventListener(
      "cars-updated",
      this._onCarsUpdated as EventListener
    );
  }

  private _onCarsUpdated(evt: any) {
    const featureCollection = evt.detail;
    if (!featureCollection || typeof featureCollection !== "object") {
      console.warn("map-home: invalid cars-updated detail");
      return;
    }
    if (!this._mapView) {
      console.warn("map-home: mapView not ready");
      return;
    }

    if (this._geojsonLayer) {
      this._mapView.map.remove(this._geojsonLayer);
      this._geojsonLayer = null;
    }

    const blob = new Blob([JSON.stringify(featureCollection)], {
      type: "application/json",
    });
    const blobUrl = URL.createObjectURL(blob);

    require(["esri/layers/GeoJSONLayer"], (GeoJSONLayer: typeof __esri.GeoJSONLayer) => {
      this._geojsonLayer = new GeoJSONLayer({
        url: blobUrl,
        outFields: ["*"],
        popupTemplate: {
          title: "Car #{id}: {make} {model}",
          content:
            "<b>Year:</b> {year}<br>" +
            "<b>Color:</b> {color}<br>" +
            "<b>Price:</b> $ {price}",
        },
      });
      this._mapView!.map.add(this._geojsonLayer!);
    });
  }
}

customElements.define("map-home", MapHome);
