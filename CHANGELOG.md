# Changelog

## 1.2.0

- **Works inside the Claude desktop app.** New chat, Incognito, Usage, Settings, Connectors, Projects, Recents, Artifacts, Claude Code and Cowork now use Claude's `claude://` app links, so they open inside the desktop app (and start it if needed) instead of the browser.
- **Top Claude features as keys:** added Incognito, Projects, Recents, Artifacts, Claude Code, Cowork, Stop, Copy reply, Dictate (Win+H), Connectors, Edit last, Message box, New window, More and Main. 33 actions in total; every existing action ID is kept.
- **Corrected shortcuts** for the desktop app: Search Ctrl+K, Sidebar Ctrl+Shift+S, Copy reply Ctrl+Shift+C, Shortcuts Ctrl+/, Redo Ctrl+Shift+Z, Zoom Ctrl+= / Ctrl+-.
- **Faster, safer keys:** shortcuts go through the already-running helper instead of starting PowerShell on every press. The helper checks that Claude is really in front before each step and sends nothing if another window is active. Presses do not overlap.
- **New look:** Claude Dark (default) with warm charcoal, ivory line icons, clay-orange accents and serif labels. Every icon has its own animation (6-second loop, labels stay still). Claude Light, Colourful, Vivid and Pro use the same icon set; Colourful, Vivid and Pro default to the new Clay colour and accept any of the 30 colours.
- **Two-page layout:** page 1 has the everyday keys, **More** opens page 2 (settings, editing and zoom).
- Installer: asks before installing Stream Deck through Windows Package Manager, waits up to 60 s for the plugin to start, keeps working when WMI is restricted, runs every rollback step independently and pins the package checksum.
- Reliability: the background helper restarts after a stuck command, and its crash budget resets after healthy replies.

## 1.1.1

- Added a double-click Windows installer with prerequisite checks, package verification, local backups, preserved profiles/settings and automatic rollback.
- Included the pinned Windows Daily Toolkit dependency for automatic app switching. Compatible or newer installed versions are kept.
- Added a connected-runtime startup receipt and isolated installer tests.
- Added installation, update, troubleshooting and recovery documentation.
- Switched the development bundler to official Rollup WASM for restricted Windows environments.
