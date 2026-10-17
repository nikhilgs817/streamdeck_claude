# Claude Controls

Unofficial Windows companion for Elgato Stream Deck. Version 1.1.0.0.

App navigation, new chat, search, settings, editing and zoom controls. **Usage** opens the [official account usage page](https://claude.ai/settings/usage) in your default browser. Sign in there if needed; the plugin does not read or store usage credentials.

![Animated keys](docs/images/deck.gif)

## Setup

Requires Windows 10+, Stream Deck 7.1+ and Windows Daily Toolkit 2.6+ for automatic profile switching. Install the package and accept its editable app profile. Toolkit Open App and foreground app changes show the matching keys; Back returns to the main keys. Profiles also work when selected manually. Existing action IDs remain compatible.

## Appearance

App theme is the default: app-specific surfaces, type, corners and motion. Labels stay still while icon details animate in a six-second loop at 12 fps. Hidden keys stop animating. Colourful, Vivid and Pro remain available with 29 colours, custom labels, glyphs and pictures. App theme uses its own palette; choose another style for custom colours. Buy and Sell retain their semantic colours in App theme.

## Build and verify

```sh
npm ci
npm run build
npx tsc --noEmit
npm test
npm run test:ui
npm run validate
npm run pack
```

Installer: `dist/com.dailyops.claude.v1.streamDeckPlugin`. Sources and dependencies are self-contained. Personal profiles, credentials, account data and build output are excluded from Git.

![Settings](docs/images/settings.png)

## References

- [Official app documentation 1](https://academy.claude.com/tutorials/navigating-the-claude-desktop-app)
- [Windows Daily Toolkit](https://github.com/nikhilgs817/windows_daily_toolkit)

Not affiliated with or endorsed by the app publisher. App names belong to their respective owners. MIT license.
