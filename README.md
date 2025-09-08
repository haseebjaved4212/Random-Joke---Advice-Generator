# Random Jokes & Advice Generator

An elegant, minimal web app that fetches a random piece of advice and multiple jokes with a single click. Built with plain HTML, CSS (Tailwind via CDN), and  JavaScript.

##Preview

- [Random Advise & Joke Generator](https://haseebjaved4212.github.io/Random-Joke-And-Advice-Generator/)



## Features

- Fetch a fresh piece of advice from the Advice Slip API
- Fetch 3 jokes concurrently from the Official Joke API
- Copy current advice or all displayed jokes to the clipboard
- Loading spinner and disabled buttons during network requests
- Mobile-friendly, responsive UI powered by Tailwind CSS (CDN)
- Dark mode friendly (respects OS preference)

## Tech Stack

- HTML5, CSS3 (Tailwind via CDN), Vanilla JavaScript
- Advice Slip API: `https://api.adviceslip.com/advice`
- Official Joke API: `https://official-joke-api.appspot.com/random_joke`

## Project Structure

```
Random Joke & Advise Generator/
├─ index.html
├─ script.js
└─ README.md
```

## Getting Started

1. Download or clone this repository to your machine.
2. Open `index.html` in a modern browser.
   - Tip: For the Clipboard API to work consistently, use a local server (e.g., VS Code Live Server, `python -m http.server`, or any static server). Some browsers restrict clipboard features on plain `file://` pages.

That’s it — no build step, no dependencies to install.

## How It Works

- On page load, the app fetches an advice from Advice Slip API and displays it.
- "Get New Advice" triggers a fresh advice fetch (`fetchAdvice`).
- "Get 3 Jokes" fetches three jokes in parallel using `Promise.all` (`fetchMultipleJokes`).
- "Copy" copies either the visible advice or all currently listed jokes to the clipboard (`shareContent`).
- While fetching, a spinner is shown and action buttons are disabled.

Key DOM elements and logic are implemented in `script.js`:

- Loading state handler: `setLoading(isLoading)`
- Advice fetcher: `fetchAdvice()`
- Multiple jokes fetcher: `fetchMultipleJokes()`
- Clipboard copy: `shareContent()` with a fallback for non-secure contexts

## Troubleshooting

- Clipboard not working:
  - Use `http://` or `https://` (serve locally). Some browsers block `navigator.clipboard` on `file://`.
  - The app includes a fallback that still copies using `document.execCommand('copy')`.
- API errors (e.g., network or rate limits):
  - You will see a friendly error message in the UI. Try again in a few seconds.
- Styling not applied:
  - Ensure internet connectivity for Tailwind CDN and Google Fonts.

## Customization

- Change how many jokes are fetched: edit the number of `fetch(jokeApiUrl)` calls in `fetchMultipleJokes()` inside `script.js`.
- Adjust styles by editing the Tailwind classes in `index.html` or the inline `<style>` block.
- Replace APIs by changing `adviceApiUrl` and `jokeApiUrl` in `script.js`.

## Credits

- Advice data by Advice Slip API (`https://api.adviceslip.com/`)
- Jokes by Official Joke API (`https://official-joke-api.appspot.com/`)
- UI via Tailwind CSS (`https://tailwindcss.com/`)

## License

This project is provided as-is for educational and personal use. Add a license if you plan to distribute.

---
