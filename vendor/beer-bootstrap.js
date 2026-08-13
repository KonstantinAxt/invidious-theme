'use strict';
// Computes and injects the real Material Design 3 palette for our brand seed
// color, using Beer CSS's own color engine (beer.min.js +
// material-dynamic-colors.min.js, loaded before this file). Injects a
// body.light{...}/body.dark{...} stylesheet with --primary/--on-primary/etc.
// custom properties — theme.css's own :root/.dark-theme values are only a
// static fallback for the brief window before this resolves.
//
// Deliberately does NOT call ui("mode", ...) — that would fight
// Invidious's own themes.js, which already owns body.className. Which bare
// light/dark class Beer's injected rules key off of is handled entirely in
// themes.js's setTheme().
addEventListener('DOMContentLoaded', async function () {
    if (window.ui) {
        await ui('theme', '#2596be');
    }
});
