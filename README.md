# Recourse Agent Demo

Interactive step-through demo showing how the recourse agent monitors a claim over time.

## How to run

Start a local server from the `demo/` directory and open it in a browser:

```
cd demo
python3 -m http.server 8000
```

Then open http://localhost:8000 in your browser.

## Navigation

- **Arrow Right** or **Space** — next step
- **Arrow Left** — previous step
- **R** — reset to intro
- Click **View** on input cards to open document previews
- **Escape** — close document modal

## Structure

- `index.html` — page shell
- `styles.css` — all styling
- `data.js` — claim data, timesteps, intro/outro content
- `app.js` — rendering and navigation logic

## Editing content

All demo content lives in `data.js`. The `DEMO_DATA` object contains:

- `claim` / `summary` — header metadata
- `intro` — first slide content
- `outro` — final slide with waterfall chart data
- `timesteps[]` — each timestep has inputs, agent steps, and a decision

Document previews (the modal content when clicking "View") are in the `DOCUMENTS` object at the top of `app.js`.
