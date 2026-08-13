# invidious-theme

A custom CSS theme for [Invidious](https://github.com/iv-org/invidious), giving its stock Crystal/ECR-rendered frontend a Material Design 3 look — inspired by [Materialious](https://github.com/Materialious/Materialious) and built directly on [Beer CSS](https://www.beercss.com/) (the actual library Materialious itself is based on).

This is **not** a port of Materialious's code — Materialious is a separate Svelte/Vite single-page app with no code-level overlap with Invidious's server-rendered templates. This repo is a from-scratch stylesheet that maps Material Design 3 color roles, shape, and elevation onto Invidious's *existing* HTML structure and class names, so it can be dropped in as an extra stylesheet without touching Invidious's own CSS or templates. Color roles come from Beer CSS's own color engine (see [Design tokens](#design-tokens)) — everything else is hand-written CSS, not Beer CSS component classes (Invidious's markup uses Pure CSS classes throughout, so loading Beer CSS's own component/reset CSS globally would conflict with it).

## Usage

`theme.css` is loaded as an additional `<link rel="stylesheet">` right after Invidious's own `default.css`, so it can override via source order. `vendor/beer.min.js`, `vendor/material-dynamic-colors.min.js`, and `vendor/beer-bootstrap.js` are loaded via `<script type="module">` tags in `<head>`, after that link. See [`KonstantinAxt/invidious`](https://github.com/KonstantinAxt/invidious), branch `materialious-theme`, for the integration (added as a git submodule at `assets/css/invidious-theme`; the `<link>`/`<script>` tags live in `views/template.ecr`, and `assets/js/themes.js`'s `setTheme()` is patched to keep Beer's own `light`/`dark` body class in sync with Invidious's `light-theme`/`dark-theme`/`no-theme` one).

Respects Invidious's existing light/dark toggle (`body.no-theme` / `body.dark-theme`) — it does not introduce a separate theme switcher. Beer CSS's own `ui("mode", ...)` API is deliberately never called, to avoid two independent scripts fighting over `body.className`.

## Scope

Covers essentially every page that loads Invidious's own `template.ecr` layout: top nav, search field and filters, buttons (including plain `.pure-button` confirmation dialogs), form controls (inputs/selects/textareas — not checkboxes/radios/range/file, which keep native styling), links, video/channel/playlist cards, typography, feed navigation (Popular/Trending/Subscriptions/Playlists/History), channel page tabs and description, the watch page (player accent color, comments — the same treatment also covers community posts and single post views, which reuse the comment template), and account/playlist management pages (preferences, login, playlist create/edit/delete, subscription/token managers, etc.).

The video-js player's control bar/menus keep their stock skin — only the interactive accent (progress/volume fill, big-play icon, loading spinner) is retinted, not a full skin rebuild. The embed page and the standalone JS-license page are separate HTML documents that don't load this stylesheet at all, so they're structurally out of reach rather than just unstyled.

## Design tokens

Primary accent (seed color): `#2596be` (Materialious's own default `themeColor`). Every other color role — `--primary`, `--on-primary`, `--surface`, `--surface-variant`, `--outline`, etc. — is generated from that seed by Beer CSS's own color engine, [material-dynamic-colors](https://github.com/leonardorafael/material-dynamic-colors), the same real HCT-based Material color science Beer CSS's `ui("theme", ...)` uses internally.

`vendor/beer.min.js` and `vendor/material-dynamic-colors.min.js` are Beer CSS's real files (v5.0.3 / v1.1.4), vendored verbatim, self-hosted rather than CDN-loaded (Invidious serves all its own assets locally — no third-party requests on page load). `vendor/beer-bootstrap.js` is ours: on every page load it calls `ui("theme", "#2596be")`, which computes the palette and injects a `body.light{...}`/`body.dark{...}` stylesheet with the real color-role custom properties.

`theme.css`'s own `:root`/`body.dark-theme`/`.no-theme` color values are only a **static fallback** — the exact values that call currently produces, hardcoded so `var(--primary)` etc. resolve correctly during the brief window before the JS call resolves. They naturally get overridden by Beer's injected rules once loaded (same specificity, later in source order — no `!important` needed). To retheme, change the seed color in both `vendor/beer-bootstrap.js`'s `ui("theme", ...)` call and the fallback block at the top of `theme.css` (re-run the color engine to get matching fallback values).

Shape and elevation (`--md-radius-*`, `--md-elevation-*`) are our own hand-picked values — Beer CSS's color engine doesn't cover those, so they're unaffected by any of the above.
