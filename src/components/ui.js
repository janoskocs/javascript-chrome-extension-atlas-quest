const UI = {
  overlay: null,
  toggle: null,
  isVisible: false,

  init() {
    this.createToggle();
    this.createOverlay();
  },

  createToggle() {
    this.toggle = document.createElement("button");
    this.toggle.className = "atlas-toggle";
    this.toggle.innerHTML = "🌍";
    this.toggle.onclick = () => this.toggleOverlay();
    document.body.appendChild(this.toggle);
  },

  createOverlay() {
    this.overlay = document.createElement("div");
    this.overlay.className = "atlas-overlay";
    document.body.appendChild(this.overlay);
  },

  showToggle() {
    this.toggle?.classList.add("show");
  },

  hideToggle() {
    this.toggle?.classList.remove("show");
  },

  toggleOverlay() {
    if (this.isVisible) {
      this.hideOverlay();
    } else {
      this.showOverlay();
    }
  },

  showOverlay() {
    this.isVisible = true;
    this.overlay?.classList.add("show");
  },

  hideOverlay() {
    this.isVisible = false;
    this.overlay?.classList.remove("show");
  },

  showLoading(location) {
    this.overlay.innerHTML = `
      <div class="atlas-header">
        <h2 class="atlas-title">${location}</h2>
      </div>
      <div class="atlas-content">
        <div class="atlas-loading">
          <div class="atlas-spinner"></div>
          <p>Loading location data...</p>
        </div>
      </div>
    `;
  },

  showError(message) {
    const content = this.overlay.querySelector(".atlas-content");
    if (content) {
      content.innerHTML = `
        <div class="atlas-error">
          <p>❌ ${message}</p>
          <button onclick="window.location.reload()">Retry</button>
        </div>
      `;
    }
  },

  showData(data, location) {
    const industries = data.mainIndustries?.length
      ? data.mainIndustries
          .map((i) => `<span class="atlas-tag">${i}</span>`)
          .join("")
      : '<span class="atlas-tag">No data</span>';

    this.overlay.innerHTML = `
      <div class="atlas-header">
        <h2 class="atlas-title">${data.cityName || location}</h2>
      </div>
      <div class="atlas-content">
        <div class="atlas-section">
          <h4>👥 Demographics</h4>
          <div class="atlas-stat"><strong>Population:</strong> ${
            data.population || "N/A"
          }</div>
          <div class="atlas-stat"><strong>Demonym:</strong> ${
            data.demonym || "N/A"
          }</div>
          ${
            data.founded
              ? `<div class="atlas-stat"><strong>Founded:</strong> ${data.founded}</div>`
              : ""
          }
        </div>

        <div class="atlas-section">
          <h4>💰 Economy</h4>
          ${
            data.gdp
              ? `<div class="atlas-stat"><strong>GDP:</strong> ${
                  data.gdp.amount || "N/A"
                } ${data.gdp.currency || ""}</div>`
              : ""
          }
          ${
            data.averageSalary
              ? `<div class="atlas-stat"><strong>Avg Salary:</strong> ${
                  data.averageSalary.amount || "N/A"
                } ${data.averageSalary.currency || ""}</div>`
              : ""
          }
        </div>

        <div class="atlas-section">
          <h4>🏭 Industries</h4>
          <div class="atlas-industries">${industries}</div>
        </div>
      </div>
    `;
  },
};
