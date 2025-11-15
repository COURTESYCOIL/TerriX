# Territorial.io - TerriX Edition

Clean, integrated version of territorial.io with pre-loaded TerriX toolkit.

## Overview

This is a **clean implementation** combining:
- **Territorial.io** - The Art of Conquest game client
- **TerriX v5.8.6** - Development toolkit (no cheats, no authorization hacks)

## Features

✓ Clean UI with TerriX sidebar
✓ Game integration ready
✓ Development tools included
✓ Vercel deployment ready
✓ No malicious features
✓ WebSocket connection to official territorial.io servers

## Files

- `terrix.html` - Main application file (standalone, self-contained)
- `package.json` - Project metadata
- `vercel.json` - Vercel deployment configuration
- `README.md` - This file

## Deployment

### Local Testing
```bash
# Python 3
python -m http.server 8000

# Then open: http://localhost:8000/terrix.html
```

### Vercel Deployment
1. Create a new Vercel project
2. Connect to your Git repository containing these files
3. Set build command: `echo 'Static deployment'`
4. Set output directory: `.`
5. Deploy

The application will automatically:
- Serve `territorial-trix-combined.html` as the main file
- Connect to official territorial.io WebSocket servers
- Display the TriX Executor panel in the bottom-right corner
- Load game client normally

## Architecture

### TerriX Panel
- **Location**: Bottom-right corner (fixed position)
- **Features**:
  - Home: Welcome & information
  - Main: Game integration panel
  - Network: WebSocket monitoring
  - Cloud: Cloud preferences
  - Settings: User configuration

### Game Client
- Standard territorial.io HTML5 canvas game
- WebSocket connection to `wss://territorial.io/s52/`
- Full game functionality preserved
- No cheats or unauthorized modifications

## Clean Implementation

**Removed**:
- ❌ Danger Zone tab
- ❌ Cheat panel code
- ❌ Password authentication
- ❌ Authorization system
- ❌ Game manipulation features

**Kept**:
- ✅ Core UI system
- ✅ Settings management
- ✅ Notification system
- ✅ Development tools
- ✅ Clean architecture

## Development

The code is split into two main sections:

1. **TriX Executor** (IIFE closure)
   - Self-contained functionality
   - No global state pollution
   - Easy to extend

2. **Territorial.io** (game client)
   - Official game code
   - Standard WebSocket protocol
   - Canvas rendering

## Version

- **Application**: Territorial.io with TriX Executor v5.8.6
- **Build**: Clean
- **Status**: Vercel-Ready
- **Last Updated**: 2025

## Legal Notice

- This is a **clean, non-cheating version**
- All game code and assets belong to David Tschacher (territorial.io creator)
- TerriX is a development toolkit framework
- No unauthorized game manipulation
- Respects territorial.io Terms of Service

## Support

For issues or questions:
- Check the game at https://territorial.io
- TriX Executor is a third-party development tool

---

**Ready to deploy!** This version is fully compliant and ready for Vercel hosting.
