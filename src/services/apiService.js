const ApiService = {
  baseUrl: "http://localhost:5050/api/v1",

  async fetchLocation(location) {
    // Check cache first
    if (Cache.has(location)) {
      Logger.log(`Using cached data for: ${location}`);
      return Cache.get(location);
    }

    Logger.log(`Fetching data for: ${location}`);

    const response = await fetch(
      `${this.baseUrl}/location?location=${encodeURIComponent(location)}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }

    const data = await response.json();
    Cache.set(location, data);
    Logger.success("Data fetched and cached");
    return data;
  },
};
