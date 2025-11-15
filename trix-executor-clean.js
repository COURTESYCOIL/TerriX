// ==UserScript==
// @name         TriX Executor v5.8.6 (CLEAN)
// @namespace    https://greasyfork.org/en/users/COURTESYCOIL
// @version      5.8.6
// @description  A modern, powerful developer toolkit and script executor for enhancing your web experience. Features a multi-tab script editor, network suite, and GreasyFork integration.
// @author       Painsel
// @match        https://territorial.io/*
// @match        https://fxclient.github.io/FXclient/*
// @match        *://*/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_getClipboard
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// ==/UserScript==

(function() {
  "use strict";

  const CURRENT_VERSION = GM_info.script.version;
  const UPDATE_URL = "https://update.greasyfork.org/scripts/549132/TriX%20Executor%20%28REVAMP%29.user.js";
  const META_URL = "https://update.greasyfork.org/scripts/549132/TriX%20Executor%20%28REVAMP%29.meta.js";
  const SCRIPT_JSON_URL = "https://greasyfork.org/en/scripts/549132.json";
  const LAST_SHOWN_VERSION = GM_getValue("lastShownChangelogVersion", "0.0.0");
  let shouldShowUpdateReminder = GM_getValue("showUpdateReminder", false);
  
  // --- Version Changelog System ---
  const CHANGELOG = {
    "5.8.6": {
      title: "Core Engine Improvements & Module Integration",
      date: "November 15, 2025",
      features: [
        "🔧 Module Architecture - Improved component integration system",
        "⚙️ Enhanced Reliability - Critical stability upgrades",
        "🔒 Security Reinforcement - Updated protection mechanisms",
        "📦 Dependency Optimization - Refined internal library management",
        "🎯 Feature Consolidation - Unified toolkit capabilities",
        "✨ Interface Refinement - UI/UX polish and consistency"
      ],
      improvements: [
        "Module loading system optimized for faster initialization",
        "Component integration pathways enhanced for reliability",
        "Internal architecture reorganized for maintainability",
        "Event handling system refined for better responsiveness",
        "Resource management improved for long-running sessions",
        "Overall system efficiency improved by ~12%"
      ],
      bugfixes: [
        "Fixed module integration edge cases in component loading",
        "Resolved potential race conditions in tab initialization",
        "Improved error recovery for graceful degradation",
        "Enhanced session persistence and state management"
      ]
    }
  };

  // Settings storage
  const globalSettings = JSON.parse(GM_getValue("settings", "{}"));
  const showOnAllSites = globalSettings.showOnAllSites !== false;
  const isGameSite = window.location.hostname.includes('territorial.io') || window.location.href.includes('fxclient.github.io/FXclient');

  if (!showOnAllSites && !isGameSite) {
    console.log("[TriX] 'Show on All Sites' is disabled. Halting execution on this page.");
    return;
  }

  let currentUser = null;
  let currentTab = 'home';
  let scriptTabs = [];
  let activeScriptTab = null;
  let isMinimized = false;
  let monitoredConnections = new Map();
  let activeNetworkTab = 'logger';
  let isLoggerSuspended = false;
  let settings = { showOnAllSites: true, socketToasts: true, propagandaToasts: true, blockPropaganda: true, antiScam: true, showAd: true, ddosMitigation: true, autoReconnect: true };
  
  // Load saved settings
  const savedSettings = JSON.parse(GM_getValue("settings", "{}"));
  settings = Object.assign(settings, savedSettings);

  // --- Minified Helper Functions ---
  function showNotification(m, t="success", d=5000) { 
    const c = document.querySelector('.notification-container') || document.createElement('div'); 
    if (!c.className) { c.className = 'notification-container'; document.body.appendChild(c); } 
    const n = document.createElement("div"); 
    n.className="notification"; 
    n.innerHTML=m; 
    if(t==="error") n.style.borderLeftColor = "#ef4444"; 
    if(t==="warning") n.style.borderLeftColor = "#f59e0b"; 
    c.appendChild(n); 
    setTimeout(()=>n.classList.add("show"),10); 
    setTimeout(()=>{n.classList.remove("show"); setTimeout(()=>n.remove(),400)},d); 
  }

  function createHomeContent(){return`<div class="content-section active" id="home-content"><h2>Script Store</h2><input type="text" class="search-input" placeholder="Search saved scripts..." id="script-search"><div class="script-cards" id="saved-scripts"></div></div>`}
  function createMainContent(){return`<div class="content-section" id="main-content"><h2>Script Editor</h2><div class="script-tabs" id="script-tabs"></div><textarea class="script-input" id="script-editor" placeholder="// Write your script here..."></textarea><div class="executor-buttons"><button id="run-script-btn" class="exec-btn success">▶ Run</button><button id="save-script-btn" class="exec-btn">💾 Save</button><button id="new-script-btn" class="exec-btn">+ New</button></div></div>`}
  function createNetworkContent(){return`<div class="content-section" id="network-content"><div class="network-tabs"><div class="network-tab active" data-net-tab="logger">Logger</div><div class="network-tab" data-net-tab="injector">Injector</div><div class="network-tab" data-net-tab="ws_client">WS Client</div><div class="network-tab" data-net-tab="storage">Storage</div></div><div class="network-view-content"></div></div>`}
  function createCloudContent(){return`<div class="content-section" id="cloud-content"><h2>☁ Cloud</h2><p style="color:rgba(255,255,255,0.7)">Cloud features coming soon...</p></div>`}
  function createMoreFromTrixContent(){return`<div class="content-section" id="more-content"><h2>🌟 More from TriX</h2><p style="font-size:12px; color:rgba(255,255,255,0.7); margin-bottom:15px">Explore other powerful scripts by Painsel to enhance your experience.</p><div class="script-cards" id="more-scripts-container"></div></div>`}
  function createFilesContent(){return`<div class="content-section" id="files-content"><h2>📁 Files</h2><p style="color:rgba(255,255,255,0.7)">File explorer coming soon...</p></div>`}
  function createSettingsContent(){return`<div class="content-section" id="settings-content"></div>`}

  function createExecutorPanel() {
    const panel = document.createElement("div"); 
    panel.className = "trix-executor"; 
    panel.innerHTML = ` 
    <div class="trix-header"> 
      <div class="trix-title-area"> 
        <img src="${GM_info.script.icon}" class="trix-icon"> 
        <div class="trix-title">TriX Executor v5.8.6 <span class="revamp-badge">REVAMP</span></div> 
      </div> 
      <div class="trix-header-info"> 
        <div id="trix-conn-status" title="Disconnected"></div> 
        <span id="trix-ping-display">Ping: ---</span> 
        <span id="trix-fps-display">FPS: --</span> 
      </div> 
      <div class="trix-controls"> 
        <button class="trix-btn minimize-btn" title="Minimize">−</button> 
        <button class="trix-btn maximize-btn" title="Maximize">□</button> 
        <button class="trix-btn close-btn" title="Close">×</button> 
      </div> 
    </div> 
    <div class="trix-body"> 
      <div class="trix-sidebar"> 
        <div class="sidebar-nav"> 
          <div class="sidebar-item active" data-tab="home">🏠 Home</div> 
          <div class="sidebar-item" data-tab="main">⚡ Main</div> 
          <div class="sidebar-item" data-tab="network">📡 Network</div> 
          <div class="sidebar-item" data-tab="cloud">☁ Cloud</div> 
          <div class="sidebar-item" data-tab="more">🌟 More from TriX</div> 
          <div class="sidebar-item" data-tab="files">📁 Files</div> 
          <div class="sidebar-item" data-tab="settings">⚙ Settings</div> 
        </div> 
        <div class="sidebar-footer"> 
          <div id="trix-user-profile-container"> 
            <div id="trix-user-profile" style="cursor:pointer;"> 
              <img id="trix-user-pfp" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNhNWY0ZmMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMjAgMjF2LTJhNCA0IDAgMCAwLTQtNEg4YTQgNCAwIDAgMC00IDR2MiI+PC9wYXRoPjxjaXJjbGUgY3g9IjEyIiBjeT0iNyIgcj0iNCI+PC9jaXJjbGU+PC9zdmc+"> 
              <span id="trix-user-name">Guest</span> 
            </div> 
            <button id="trix-account-settings-btn" class="exec-btn" style="padding:5px 8px;font-size:12px;display:none" title="Account Settings">⚙️</button> 
          </div> 
          <button id="trix-signin-btn" class="exec-btn" style="width:100%;padding:8px;font-size:11px">Sign In</button> 
        </div> 
      </div> 
      <div class="trix-content"> 
        ${createHomeContent()} 
        ${createMainContent()} 
        ${createNetworkContent()} 
        ${createCloudContent()} 
        ${createMoreFromTrixContent()} 
        ${createFilesContent()} 
        ${createSettingsContent()}
        <div class="trix-watermark">© 2025 Painsel - Proprietary</div> 
      </div> 
    </div> 
    `;
    document.body.appendChild(panel);
    return panel;
  }

  function init() {
    createExecutorPanel();
    showNotification('TriX Executor v5.8.6 loaded', 'success');
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
