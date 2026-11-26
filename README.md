# NusaStat — Indonesia in Numbers

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/0xrifai/makefun-national-stats-20261126/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/0xrifai/makefun-national-stats-20261126/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

NusaStat is a small, original national statistics site for Indonesia. It puts the
headline numbers — population, GDP, prices, jobs and the provinces — on one
dashboard, then lets you explore each topic in depth: switch years, compare
indicators, sort tables, filter regions and flip charts between bars and lines.
Every figure carries its source and year, drawn from published Statistics
Indonesia (BPS) and World Bank releases. Nothing is fetched from the network:
the whole site is static files under `app/`, with hand-rolled SVG charts and
no external fonts or libraries.

## Run it

```sh
node serve.ts
```

Then open http://localhost:8080 in a desktop browser or on a phone. Pages are
hash routes: `#/` overview, `#/population`, `#/economy`, `#/prices`,
`#/employment`, `#/regions`, `#/methodology`.

## Hand in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` copies `app/` and `screenshots/` to the output directory and writes
`dossier.json` with the vendored make.fun library.

---

Built for the make.fun bounty "Make the best national statistics site"
(best-national-statistics-site-20261126-0539).
