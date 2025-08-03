const Observer = {
  currentLocation: null,

  init() {
    // Watch for changes in Google Maps
    const observer = new MutationObserver(() => {
      this.checkLocation();
    });

    observer.observe(document, {
      childList: true,
      subtree: true,
    });

    // Also listen for clicks and URL changes
    document.addEventListener("click", () => {
      setTimeout(() => this.checkLocation(), 1000);
    });

    window.addEventListener("hashchange", () => {
      setTimeout(() => this.checkLocation(), 500);
    });

    // Initial check
    setTimeout(() => this.checkLocation(), 2000);
  },

  checkLocation() {
    const location = LocationExtractor.extract();

    if (location && location !== this.currentLocation) {
      Logger.log(`New location detected: ${location}`);
      this.currentLocation = location;
      UI.showToggle();

      if (UI.isVisible) {
        this.loadLocationData(location);
      }
    } else if (!location) {
      UI.hideToggle();
      UI.hideOverlay();
    }
  },

  async loadLocationData(location) {
    UI.showLoading(location);

    try {
      const data = await ApiService.fetchLocation(location);
      UI.showData(data, location);
    } catch (error) {
      Logger.error(`Failed to load location data: ${error.message}`);
      UI.showError(error.message);
    }
  },
};
