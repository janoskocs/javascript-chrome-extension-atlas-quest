(() => {
  if (
    !window.location.hostname.endsWith("google.com") ||
    !window.location.pathname.startsWith("/maps")
  ) {
    return; // Exit early if not on Google Maps
  }
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  let lastCityName = null; // Keep track of the last city
  let canFetch = true; // Control when fetch can be called
  let isBoxClosed = false; // Track if info box is closed

  // Create or get the toggle button (circle) for reopening
  const getOrCreateToggleButton = () => {
    let toggle = document.getElementById("city-info-toggle");
    if (!toggle) {
      toggle = document.createElement("div");
      toggle.id = "city-info-toggle";
      Object.assign(toggle.style, {
        position: "fixed",
        top: "4rem",
        right: "20px",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        backgroundColor: "#007bff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        cursor: "pointer",
        zIndex: 10000,
        display: "none",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: "20px",
        userSelect: "none",
      });
      toggle.textContent = "+";
      toggle.title = "Show city info";
      document.body.appendChild(toggle);

      toggle.addEventListener("click", () => {
        isBoxClosed = false;
        toggle.style.display = "none";
        const box = document.getElementById("city-info-box");
        if (box) box.style.display = "block";

        // When reopened, fetch immediately for current city if any
        if (lastCityName) {
          if (canFetch) {
            canFetch = false;
            getCityData(lastCityName)
              .then(appendCityInfoBox)
              .finally(() => {
                setTimeout(() => {
                  canFetch = true;
                }, 10000);
              });
          }
        }
      });
    }
    return toggle;
  };

  const onUrlChange = (newPath) => {
    if (isBoxClosed) {
      // Do not fetch or update while box is closed
      return;
    }

    const segments = newPath.split("/");
    if (segments[3]) {
      const cityName = decodeURIComponent(segments[3]);
      if (cityName !== lastCityName) {
        lastCityName = cityName;

        if (!canFetch) {
          console.log("Fetch paused. Ignoring city:", cityName);
          return;
        }

        console.log("Detected city:", cityName);

        canFetch = false; // Pause fetches
        getCityData(cityName)
          .then(appendCityInfoBox)
          .finally(() => {
            // Allow fetches again after 10 seconds
            setTimeout(() => {
              canFetch = true;
            }, 10000);
          });
      }
    } else {
      lastCityName = null;
    }
  };

  const urlChanged = () => {
    const newPath = window.location.pathname;
    onUrlChange(newPath);
  };

  history.pushState = (...args) => {
    originalPushState.apply(history, args);
    urlChanged();
  };

  history.replaceState = (...args) => {
    originalReplaceState.apply(history, args);
    urlChanged();
  };

  window.addEventListener("popstate", () => urlChanged());

  const getCityData = (cityName) => {
    return fetch(`http://localhost:5050/api/v1/location?location=${cityName}`)
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error fetching city data:", error);
        return { cityName, population: "N/A", gdp: "N/A" };
      });
  };

  const appendCityInfoBox = (data) => {
    let box = document.getElementById("city-info-box");
    if (!box) {
      box = document.createElement("div");
      box.id = "city-info-box";
      Object.assign(box.style, {
        position: "fixed",
        top: "4rem",
        right: "20px",
        backgroundColor: "white",
        border: "1px solid #ccc",
        padding: "15px",
        zIndex: "9999",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        fontFamily: "Arial, sans-serif",
        maxWidth: "320px",
        lineHeight: "1.4",
        fontSize: "14px",
        color: "#333",
        borderRadius: "8px",
      });
      document.body.appendChild(box);
    }

    // Add close button
    const closeBtnHtml = `
      <button id="city-info-close-btn" title="Close city info"
        style="
          position: absolute;
          top: 8px;
          right: 8px;
          border: none;
          background: transparent;
          font-size: 20px;
          cursor: pointer;
          color: #888;
        ">×</button>
    `;

    box.innerHTML =
      closeBtnHtml +
      `
      <h3 style="margin-top:0;">${data.cityName || "City Info"}</h3>
      <p><strong>Population:</strong> ${data.population || "N/A"}</p>
      <p><strong>Founded:</strong> ${data.founded || "N/A"}</p>
      <p><strong>Demonym:</strong> ${data.demonym || "N/A"}</p>
      <p><strong>Main Industries:</strong></p>
      <ul style="margin: 0 0 10px 20px; padding: 0;">
        ${
          data.mainIndustries && data.mainIndustries.length > 0
            ? data.mainIndustries
                .map((industry) => `<li>${industry}</li>`)
                .join("")
            : "<li>N/A</li>"
        }
      </ul>
      <p><strong>GDP:</strong> ${data.gdp?.amount || "N/A"} ${
        data.gdp?.currency || ""
      } <br/>
         <em>GBP Equivalent:</em> ${data.gdp?.gbpEquivalent || "N/A"}</p>
      <p><strong>Average Salary:</strong> ${
        data.averageSalary?.amount || "N/A"
      } ${data.averageSalary?.currency || ""} <br/>
         <em>GBP Equivalent:</em> ${
           data.averageSalary?.gbpEquivalent || "N/A"
         }</p>
    `;

    // Add close event listener
    const closeBtn = document.getElementById("city-info-close-btn");
    closeBtn.onclick = () => {
      box.style.display = "none";
      isBoxClosed = true;
      // Show toggle button
      const toggle = getOrCreateToggleButton();
      toggle.style.display = "flex";
    };
  };
  urlChanged(); // Initial check on load
  getOrCreateToggleButton(); // Ensure toggle button is created
  console.log("City info extension loaded for Google Maps");
})();
