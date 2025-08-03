const LocationExtractor = {
  extract() {
    const url = window.location.href;

    // Try URL patterns
    const placeMatch = url.match(/\/maps\/place\/([^\/]+)/);
    if (placeMatch) {
      return this.clean(decodeURIComponent(placeMatch[1]));
    }

    const queryMatch = new URL(url).searchParams.get("q");
    if (queryMatch) {
      return this.clean(queryMatch);
    }

    // Try page title
    const title = document.title;
    if (title && title !== "Google Maps") {
      return this.clean(title.split("-")[0]);
    }

    return null;
  },

  clean(name) {
    return name.replace(/\+/g, " ").split(",")[0].trim();
  },
};
