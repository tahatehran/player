# Online Video Player (Ththt.ir)

This repository contains the frontend implementation of an online video player built with PHP, JavaScript, and CSS. It is designed to play direct video links from specific **Ththt.ir** domains.

## Main files

- `/home/runner/work/player/player/index.php` main page layout, URL validation, and UI structure
- `/home/runner/work/player/player/player.js` full player behavior and interactive controls
- `/home/runner/work/player/player/style.css` custom styling

## Features

- Play/pause and 10-second seek controls
- Frame-by-frame navigation
- Volume and mute control
- Playback speed control
- Video rotation
- Fullscreen and Picture-in-Picture
- Progress bar with drag/touch support
- Playback status and center toast messages
- Responsive layout for mobile and desktop
- CDN dependencies removed by serving Bootstrap / Font Awesome / Vazirmatn locally
- Offline capability via Service Worker and Web App Manifest

## Accepted input URL

The `u` query parameter must start with one of these prefixes:

- `https://download.ththt.ir/file/`
- `https://online.ththt.ir/file/`

Example:

`index.php?u=https://download.ththt.ir/file/example.mp4`

## Keyboard shortcuts

- `Space`: play/pause
- `←` / `→`: seek -10s / +10s
- `↑` / `↓`: volume up/down
- `M`: mute
- `F`: fullscreen
- `P`: Picture-in-Picture
- `Q` / `E`: rotate left/right
- `,` / `.`: previous/next frame
- `0` to `9`: jump to timeline percentage

## Run locally

This project has no build step. Serve the repository through any PHP-capable web server and open `index.php`.

## Offline mode

- After the first successful load, core static assets are cached in the browser.
- In offline mode, the main player UI can be loaded from cache.
