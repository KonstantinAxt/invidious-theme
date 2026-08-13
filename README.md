# invidious-theme

A custom CSS theme for [Invidious](https://github.com/iv-org/invidious), giving its stock Crystal/ECR-rendered frontend a Material Design 3 look — inspired by [Materialious](https://github.com/Materialious/Materialious) and built on the same design tokens as [Beer CSS](https://www.beercss.com/) (the library Materialious itself is based on).

This is **not** a port of Materialious's code — Materialious is a separate Svelte/Vite single-page app with no code-level overlap with Invidious's server-rendered templates. This repo is a from-scratch stylesheet that maps Material Design 3 color roles, shape, and elevation onto Invidious's *existing* HTML structure and class names, so it can be dropped in as an extra stylesheet without touching Invidious's own CSS or templates.

## Usage

Meant to be loaded as an additional `<link rel="stylesheet">` right after Invidious's own `default.css`, so it can override via source order. See [`KonstantinAxt/invidious`](https://github.com/KonstantinAxt/invidious), branch `materialious-theme`, for the integration (added as a git submodule at `assets/css/invidious-theme`, one extra line in `views/template.ecr`).

Respects Invidious's existing light/dark toggle (`body.no-theme` / `body.dark-theme`) — it does not introduce a separate theme switcher.

## Scope

Covers essentially every page that loads Invidious's own `template.ecr` layout: top nav, search field and filters, buttons (including plain `.pure-button` confirmation dialogs), form controls (inputs/selects/textareas — not checkboxes/radios/range/file, which keep native styling), links, video/channel/playlist cards, typography, feed navigation (Popular/Trending/Subscriptions/Playlists/History), channel page tabs and description, the watch page (player accent color, comments — the same treatment also covers community posts and single post views, which reuse the comment template), and account/playlist management pages (preferences, login, playlist create/edit/delete, subscription/token managers, etc.).

The video-js player's control bar/menus keep their stock skin — only the interactive accent (progress/volume fill, big-play icon, loading spinner) is retinted, not a full skin rebuild. The embed page and the standalone JS-license page are separate HTML documents that don't load this stylesheet at all, so they're structurally out of reach rather than just unstyled.

## Design tokens

Primary accent: `#2596be` (Materialious's own default `themeColor`). Light and dark palettes are defined as CSS custom properties at the top of `theme.css` — adjust there to retheme.
