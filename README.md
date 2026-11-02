# demo-remotion-card

Original demo, made-up data, not client work. AI-assisted implementation.

A static white-on-black disclosure, bullet recap and closing card rendered with
React, TypeScript and Remotion. No external fonts, assets or runtime network calls.
All wording and timing live in `src/data/cards.json`.

```sh
npm install
npm test
npm run typecheck
npm run render:preview
npm run render
```

`Main` is 3840x2160 at the JSON's 24 fps. The disclosure holds for `holdSeconds`
(defaults to 8 seconds when omitted), without text animation. The sample recap
holds for 20 seconds; set `showRecap` to `false` to remove its sequence and shorten
the video by 480 frames. The closing card holds for `endSeconds` (3 in the sample).
The sample totals 744 frames (31 seconds), or 264 frames (11 seconds) without recap.

The preview renders the first 48 frames (2 seconds) at 1280x720 to
`out/preview.mp4`; the full render writes `out/main.mp4`. The first render may
download Remotion's browser; rendering uses local data and system Arial afterward.
Dependencies are pinned. `node_modules/`, `out/` and the local npm cache are ignored.

## Tests

`npm test` runs 9 tests in `tests/timing.test.ts` and `tests/cards.test.tsx`:

- hold frames equal `holdSeconds` x fps (8 seconds at 24 fps is 192 frames, and an omitted
  `holdSeconds` falls back to 8 seconds)
- every duration is derived from the JSON and the fps (2/4/1 seconds at 30 fps is 60/120/30/210)
- the recap toggle removes exactly its 480 frames (the sample goes from 744 to 264 frames)
- `Main` drops the recap sequence when `showRecap` is `false`
- the rendered disclosure text equals the JSON text, whitespace and punctuation included
- validation rejects missing, empty and whitespace-only text
- no sample text is hard-coded in the composition sources
