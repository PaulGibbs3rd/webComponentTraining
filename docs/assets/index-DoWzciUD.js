var V=Object.defineProperty;var P=s=>{throw TypeError(s)};var Y=(s,a,t)=>a in s?V(s,a,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[a]=t;var S=(s,a,t)=>Y(s,typeof a!="symbol"?a+"":a,t),q=(s,a,t)=>a.has(s)||P("Cannot "+t);var i=(s,a,t)=>(q(s,a,"read from private field"),t?t.call(s):a.get(s)),c=(s,a,t)=>a.has(s)?P("Cannot add the same private member more than once"):a instanceof WeakSet?a.add(s):a.set(s,t),n=(s,a,t,r)=>(q(s,a,"write to private field"),r?r.call(s,t):a.set(s,t),t),h=(s,a,t)=>(q(s,a,"access private method"),t);(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();var C;class J extends HTMLElement{constructor(){super();c(this,C,[]);this.attachShadow({mode:"open"})}set colors(t){n(this,C,t??[]),this.render()}get colors(){return i(this,C)}connectedCallback(){this.render()}normalizeHex(t){const r=t.trim().toUpperCase();return r.startsWith("#")?r:"#"+r}render(){if(!this.shadowRoot)return;const t=i(this,C).map(r=>{const e=this.normalizeHex(r.hexCode);return`
          <li>
            <span
              class="swatch"
              style="background-color: ${e}"
            ></span>
            ${r.name.toUpperCase()} — ${e}
          </li>
        `}).join("");this.shadowRoot.innerHTML=`
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
        ${t}
      </ul>
    `}}C=new WeakMap;customElements.define("color-list",J);var v,T,z;class G extends HTMLElement{constructor(){super();c(this,T);c(this,v,[]);this.attachShadow({mode:"open"})}connectedCallback(){h(this,T,z).call(this),this.render()}render(){if(!this.shadowRoot)return;this.shadowRoot.innerHTML=`
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
    `;const t=this.shadowRoot.querySelector("color-list");t&&(t.colors=i(this,v)),customElements.whenDefined("color-form").then(()=>{const r=this.shadowRoot.querySelector("color-form");r&&(r.onSubmitColor=e=>{i(this,v).push({id:Math.max(0,...i(this,v).map(o=>o.id))+1,name:e.name,hexCode:e.hexCode}),this.render()})})}}v=new WeakMap,T=new WeakSet,z=function(){n(this,v,[{id:1,name:"red",hexCode:"#FF0000"},{id:2,name:"green",hexCode:"#00FF00"},{id:3,name:"blue",hexCode:"#0000FF"}])};customElements.define("color-home",G);var E,k,x;class B extends HTMLElement{constructor(){super();c(this,E,[]);c(this,k,-1);c(this,x);this.attachShadow({mode:"open"}),n(this,x,document.createElement("style")),i(this,x).textContent=`
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
    `}set cars(t){n(this,E,Array.isArray(t)?t:[]),this.render()}get cars(){return i(this,E)}set editCarId(t){n(this,k,typeof t=="number"?t:-1),this.render()}get editCarId(){return i(this,k)}connectedCallback(){this.render()}render(){if(!this.shadowRoot)return;this.shadowRoot.innerHTML="",this.shadowRoot.appendChild(i(this,x));const t=i(this,E).map(e=>e.id===i(this,k)?`
            <tr data-id="${e.id}" class="edit-row">
              <td>${String(e.id).padStart(2,"0")}</td>
              <td><input type="text" name="make" value="${e.make}" /></td>
              <td><input type="text" name="model" value="${e.model}" /></td>
              <td><input type="number" name="year" value="${e.year}" /></td>
              <td><input type="text" name="color" value="${e.color}" /></td>
              <td><input type="number" name="price" value="${e.price}" /></td>
              <td>
                <button class="save-btn" data-id="${e.id}">Save Car</button>
                <button class="cancel-btn" data-id="${e.id}">Cancel Car</button>
              </td>
            </tr>
          `:`
            <tr data-id="${e.id}">
              <td>${String(e.id).padStart(2,"0")}</td>
              <td>${H(e.make)}</td>
              <td>${H(e.model)}</td>
              <td>${e.year}</td>
              <td>${H(e.color)}</td>
              <td>$${e.price}</td>
              <td>
                <button class="edit-btn" data-id="${e.id}">Edit</button>
                <button class="delete-btn" data-id="${e.id}">Delete</button>
              </td>
            </tr>
          `).join(""),r=document.createElement("table");r.innerHTML=`
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
        ${t}
      </tbody>
    `,this.shadowRoot.appendChild(r),this.shadowRoot.querySelectorAll("button.delete-btn").forEach(e=>{e.addEventListener("click",o=>{const l=Number(o.currentTarget.getAttribute("data-id"));this.dispatchEvent(new CustomEvent("car-delete",{detail:l,bubbles:!0,composed:!0}))})}),this.shadowRoot.querySelectorAll("button.edit-btn").forEach(e=>{e.addEventListener("click",o=>{const l=Number(o.currentTarget.getAttribute("data-id"));this.dispatchEvent(new CustomEvent("car-edit-request",{detail:l,bubbles:!0,composed:!0}))})}),this.shadowRoot.querySelectorAll("button.save-btn").forEach(e=>{e.addEventListener("click",o=>{const l=Number(o.currentTarget.getAttribute("data-id")),m=this.shadowRoot.querySelector(`tr[data-id="${l}"].edit-row`);if(!m)return;const u={id:l,make:m.querySelector('input[name="make"]').value,model:m.querySelector('input[name="model"]').value,year:Number(m.querySelector('input[name="year"]').value),color:m.querySelector('input[name="color"]').value,price:Number(m.querySelector('input[name="price"]').value)};this.dispatchEvent(new CustomEvent("car-save",{detail:u,bubbles:!0,composed:!0}))})}),this.shadowRoot.querySelectorAll("button.cancel-btn").forEach(e=>{e.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("car-cancel",{bubbles:!0,composed:!0}))})})}}E=new WeakMap,k=new WeakMap,x=new WeakMap;function H(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}customElements.define("car-table",B);var L,_,U;class K extends HTMLElement{constructor(){super();c(this,_);c(this,L);this.attachShadow({mode:"open"}),n(this,L,document.createElement("style")),i(this,L).textContent=`
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
    `}connectedCallback(){this.render(),h(this,_,U).call(this)}render(){this.shadowRoot&&(this.shadowRoot.innerHTML="",this.shadowRoot.appendChild(i(this,L)),this.shadowRoot.innerHTML+=`
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
    `)}}L=new WeakMap,_=new WeakSet,U=function(){const t=this.shadowRoot.querySelector("form#car-form");t&&t.addEventListener("submit",r=>{r.preventDefault();const e=new FormData(t),o={make:String(e.get("make")??""),model:String(e.get("model")??""),year:Number(e.get("year")??0),color:String(e.get("color")??""),price:Number(e.get("price")??0)};this.dispatchEvent(new CustomEvent("car-add",{detail:o,bubbles:!0,composed:!0})),t.reset()})};customElements.define("car-form",K);var p,f,g,b,w,d,O,$,M,F,A,D,j;class W extends HTMLElement{constructor(){super();c(this,d);c(this,p,[]);c(this,f,[]);c(this,g,-1);c(this,b,null);c(this,w,!1);this.attachShadow({mode:"open"})}connectedCallback(){h(this,d,O).call(this),this.render(),window.addEventListener("map-click",h(this,d,M).bind(this))}disconnectedCallback(){window.removeEventListener("map-click",h(this,d,M))}render(){if(!this.shadowRoot)return;const t=i(this,w)?`<p class="status-text">
           Please click on the map to choose a location for the new car…
         </p>`:"";this.shadowRoot.innerHTML=`
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
      ${t}

      <!-- 3) The existing form & table -->
      <car-form></car-form>
      <car-table></car-table>
    `;const r=this.shadowRoot.querySelector("car-form");r&&(r.removeEventListener("car-add",h(this,d,$)),r.addEventListener("car-add",h(this,d,$).bind(this)));const e=this.shadowRoot.querySelector("car-table");e&&(e.cars=i(this,p),e.editCarId=i(this,g),e.removeEventListener("car-delete",h(this,d,F)),e.removeEventListener("car-edit-request",h(this,d,A)),e.removeEventListener("car-save",h(this,d,D)),e.removeEventListener("car-cancel",h(this,d,j)),e.addEventListener("car-delete",h(this,d,F).bind(this)),e.addEventListener("car-edit-request",h(this,d,A).bind(this)),e.addEventListener("car-save",h(this,d,D).bind(this)),e.addEventListener("car-cancel",h(this,d,j).bind(this)))}_dispatchCarsUpdated(){const t={type:"FeatureCollection",features:i(this,f)};window.dispatchEvent(new CustomEvent("cars-updated",{detail:t}))}}p=new WeakMap,f=new WeakMap,g=new WeakMap,b=new WeakMap,w=new WeakMap,d=new WeakSet,O=function(){n(this,p,[{id:1,make:"Toyota",model:"Highlander",year:2003,color:"red",price:400},{id:2,make:"Fiat",model:"500e",year:2015,color:"grey",price:6e3}]),n(this,f,[{type:"Feature",properties:{id:1,make:"Toyota",model:"Highlander",year:2003,color:"red",price:400},geometry:{type:"Point",coordinates:[-118.805,34.027]}},{type:"Feature",properties:{id:2,make:"Fiat",model:"500e",year:2015,color:"grey",price:6e3},geometry:{type:"Point",coordinates:[-118.81,34.022]}}])},$=function(t){const r=t,{make:e,model:o,year:l,color:m,price:u}=r.detail;n(this,b,{make:e,model:o,year:l,color:m,price:u}),n(this,w,!0),this.render()},M=function(t){const r=t,{latitude:e,longitude:o}=r.detail;if(!i(this,w)||!i(this,b))return;const m=i(this,p).reduce((I,N)=>N.id>I?N.id:I,0)+1,u={id:m,make:i(this,b).make,model:i(this,b).model,year:i(this,b).year,color:i(this,b).color,price:i(this,b).price};n(this,p,[...i(this,p),u]);const R={type:"Feature",properties:{id:m,make:u.make,model:u.model,year:u.year,color:u.color,price:u.price},geometry:{type:"Point",coordinates:[o,e]}};n(this,f,[...i(this,f),R]),n(this,b,null),n(this,w,!1),this.render(),this._dispatchCarsUpdated()},F=function(t){const e=t.detail;n(this,p,i(this,p).filter(o=>o.id!==e)),n(this,g,-1),n(this,f,i(this,f).filter(o=>o.properties.id!==e)),n(this,b,null),n(this,w,!1),this.render(),this._dispatchCarsUpdated()},A=function(t){const e=t.detail;n(this,g,e),this.render()},D=function(t){const e=t.detail;n(this,p,i(this,p).map(o=>o.id===e.id?e:o)),n(this,f,i(this,f).map(o=>o.properties.id===e.id?{...o,properties:{id:e.id,make:e.make,model:e.model,year:e.year,color:e.color,price:e.price}}:o)),n(this,g,-1),this.render(),this._dispatchCarsUpdated()},j=function(){n(this,g,-1),this.render()};customElements.define("car-home",W);var y;class Q extends HTMLElement{constructor(){super();c(this,y,"The tool");this.attachShadow({mode:"open"})}static get observedAttributes(){return["header-text"]}connectedCallback(){n(this,y,this.getAttribute("header-text")??"The Tool"),this.render()}attributeChangedCallback(t,r,e){r!==e&&e!==null&&(n(this,y,e),this.render())}get headerText(){return i(this,y)}set headerText(t){t?(this.setAttribute("header-text",t),n(this,y,t)):(this.removeAttribute("header-text"),n(this,y,""))}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
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
        <h1>${i(this,y)}</h1>

        <!-- (If you ever want a "secondary" slot for more controls, you could add it here) -->
        <!-- <slot name="actions"></slot> -->
      </header>
    `)}}y=new WeakMap;customElements.define("tool-header",Q);class X extends HTMLElement{constructor(){super();S(this,"_viewDiv",null);S(this,"_mapView",null);S(this,"_geojsonLayer",null);S(this,"_initialized",!1);this.attachShadow({mode:"open"})}connectedCallback(){this.shadowRoot.innerHTML=`
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
    `,requestAnimationFrame(()=>{if(this._viewDiv=this.shadowRoot.querySelector("#viewDiv"),!this._viewDiv){console.error("map-home: #viewDiv not found");return}require(["esri/Map","esri/views/MapView","esri/layers/GeoJSONLayer"],(t,r,e)=>{const o=new t({basemap:"streets-navigation-vector"});this._mapView=new r({container:this._viewDiv,map:o,center:[-118.805,34.027],zoom:11}),this._mapView.when(()=>{var l;this._initialized||(this._initialized=!0,this._geojsonLayer=new e({url:"/cars.geojson",outFields:["*"],popupTemplate:{title:"Car #{id}: {make} {model}",content:"<b>Year:</b> {year}<br><b>Color:</b> {color}<br><b>Price:</b> $ {price}"}}),o.add(this._geojsonLayer),window.addEventListener("cars-updated",this._onCarsUpdated.bind(this))),(l=this._mapView)==null||l.on("click",m=>{if(m.mapPoint){const{latitude:u,longitude:R}=m.mapPoint;this.dispatchEvent(new CustomEvent("map-click",{detail:{latitude:u,longitude:R},bubbles:!0,composed:!0}))}})})})})}disconnectedCallback(){this._mapView&&(this._mapView.destroy(),this._mapView=null),this._geojsonLayer=null,window.removeEventListener("cars-updated",this._onCarsUpdated)}_onCarsUpdated(t){const r=t.detail;if(!r||typeof r!="object"){console.warn("map-home: invalid cars-updated detail");return}if(!this._mapView){console.warn("map-home: mapView not ready");return}this._geojsonLayer&&(this._mapView.map.remove(this._geojsonLayer),this._geojsonLayer=null);const e=new Blob([JSON.stringify(r)],{type:"application/json"}),o=URL.createObjectURL(e);require(["esri/layers/GeoJSONLayer"],l=>{this._geojsonLayer=new l({url:o,outFields:["*"],popupTemplate:{title:"Car #{id}: {make} {model}",content:"<b>Year:</b> {year}<br><b>Color:</b> {color}<br><b>Price:</b> $ {price}"}}),this._mapView.map.add(this._geojsonLayer)})}}customElements.define("map-home",X);
