class AtlasQuest {
  constructor() {
    this.init();
  }

  async init() {
    Logger.log("AtlasQuest starting...");

    // Wait for Google Maps to load
    await this.waitForMaps();

    // Initialize components
    UI.init();
    Observer.init();

    // Connect toggle to load data
    UI.toggle.addEventListener("click", () => {
      if (UI.isVisible && Observer.currentLocation) {
        Observer.loadLocationData(Observer.currentLocation);
      }
    });

    Logger.success("AtlasQuest ready!");
  }

  async waitForMaps() {
    return new Promise((resolve) => {
      const check = () => {
        if (
          document.querySelector("#searchboxinput") ||
          document.querySelector('[data-value="Search"]')
        ) {
          resolve();
        } else {
          setTimeout(check, 500);
        }
      };
      check();
    });
  }
}

// Start the extension
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => new AtlasQuest());
} else {
  new AtlasQuest();
}
