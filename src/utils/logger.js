const Logger = {
  log: (message, ...args) => console.log(`🌍 AtlasQuest:`, message, ...args),
  error: (message, ...args) =>
    console.error(`❌ AtlasQuest:`, message, ...args),
  warn: (message, ...args) => console.warn(`⚠️ AtlasQuest:`, message, ...args),
  success: (message, ...args) =>
    console.log(`✅ AtlasQuest:`, message, ...args),
};
