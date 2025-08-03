# 🌍 AtlasQuest Chrome Extension

A beautiful Chrome extension that automatically shows detailed location information when you click on places in Google Maps. Get instant access to population, GDP, industries, and more!

![AtlasQuest Demo](https://via.placeholder.com/600x300/667eea/ffffff?text=AtlasQuest+Demo)

## ✨ Features

- 🎯 **Automatic Detection** - Detects when you click on any city/country in Google Maps
- 🎨 **Beautiful UI** - Modern gradient overlay with smooth animations
- ⚡ **Smart Caching** - Prevents unnecessary API calls for previously viewed locations
- 📊 **Rich Data** - Shows population, GDP, industries, demographics, and more
- 🌍 **Toggle Button** - Floating button appears when a location is detected

## 🚀 Quick Start

### Prerequisites

1. **API Server** - You'll need the AtlasQuest API running locally first:

   ```
   👉 Set up the API: [AtlasQuest API Repository](YOUR_API_REPO_LINK_HERE)
   ```

2. **Google Chrome** - Extension works with Chrome/Chromium browsers

### Installation

1. **Clone this repository**

   ```bash
   git clone git@github.com:janoskocs/javascript-chrome-extension-atlas-quest.git
   cd javascript-chrome-extension-atlas-quest
   ```

2. **Load the extension in Chrome**

   - Open Chrome and go to `chrome://extensions/`
   - Enable **Developer mode** (toggle in top right)
   - Click **Load unpacked**
   - Select the `javascript-chrome-extension-atlas-quest` folder

3. **Verify installation**
   - You should see "AtlasQuest" in your extensions list
   - Make sure it's enabled ✅

## 🎮 How to Use

1. **Start your API server** (see API repository for setup)

2. **Navigate to Google Maps**

   ```
   https://www.google.com/maps
   ```

3. **Click on any location**

   - Search for a city (e.g., "London", "Tokyo", "New York")
   - Click on the place marker
   - Or click on any location pin

4. **See the magic happen!**
   - A floating 🌍 button will appear
   - Click it to see detailed location information
   - Beautiful overlay slides in with all the data

## 📁 Project Structure

```
atlasquest-extension/
├── manifest.json           # Extension configuration
└── src/
    ├── utils/
    │   ├── cache.js        # Simple caching system
    │   └── logger.js       # Logging utilities
    ├── services/
    │   ├── locationExtractor.js  # URL/location parsing
    │   └── apiService.js         # API communication
    ├── styles/
    │   └── styles.css      # UI styling
    ├── components/
    │   ├── ui.js           # UI rendering & DOM manipulation
    │   └── observer.js     # Location change detection
    └── main.js            # Main application orchestrator
```

## 🛠️ Development

### Local Development

1. **Make changes** to any file in the `src/` directory

2. **Reload the extension**

   - Go to `chrome://extensions/`
   - Click the refresh icon ↻ on the AtlasQuest extension
   - Or use the keyboard shortcut `Ctrl+R` on the extensions page

3. **Test on Google Maps**
   - Refresh any open Google Maps tabs
   - Test your changes

### Debugging

- **Open DevTools** on any Google Maps page
- **Check the Console** for AtlasQuest messages:
  - `🌍 AtlasQuest: AtlasQuest starting...`
  - `🌍 AtlasQuest: New location detected: London`
  - `✅ AtlasQuest: AtlasQuest ready!`

### API Configuration

The extension connects to your local API server at:

```
http://localhost:5050/api/v1/location?location={locationName}
```

To change the API URL, edit `src/services/apiService.js`:

```javascript
const ApiService = {
  baseUrl: "http://localhost:5050/api/v1", // Change this
  // ...
};
```

## 🎨 Customisation

### Styling

Edit `styles.css` to customize the look:

- Change colors in `.atlas-overlay` background gradient
- Modify button size in `.atlas-toggle`
- Adjust animation speeds in transition properties

### Functionality

- **Cache settings**: Modify `src/utils/cache.js`
- **Location detection**: Update `src/services/locationExtractor.js`
- **UI layout**: Edit `src/components/ui.js`

## 🐛 Troubleshooting

### Extension not working?

1. ✅ Check that the API server is running on `http://localhost:5050`
2. ✅ Verify extension is enabled in `chrome://extensions/`
3. ✅ Refresh Google Maps page after loading extension
4. ✅ Check browser console for error messages

### Button not appearing?

1. 🔍 Try clicking on different locations in Google Maps
2. 🔍 Check console for location detection messages
3. 🔍 Make sure you're on `maps.google.com`, not other map sites

### API errors?

1. 🛠️ Ensure API server is running and accessible
2. 🛠️ Check network tab in DevTools for failed requests
3. 🛠️ Verify API endpoint returns valid JSON

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 🙏 Acknowledgments

- Uses Google Maps for location detection
- Modern Chrome Extension Manifest
- Clean, modular architecture

---

**Enjoy exploring the world with AtlasQuest! 🌍✨**
