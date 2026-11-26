// NusaStat views: one render function per page. Each page is reached by a
// hash route and every control on it works — year pickers, indicator
// switchers, chart-type toggles, sortable tables, region filters and search.

import { YEARS, LATEST_YEAR, SERIES, SECTORS_2024, PROVINCES, SOURCES, formatValue, changeSince } from './data.js';
import { chartFor, hbarList } from './charts.js';

export const state = {
  year: LATEST_YEAR,
  chartType: 'bar',
  economyIndicator: 'growth',
  regionIsland: 'All',
  regionQuery: '',
  sortKey: 'population',
  sortDir: -1,
  searchQuery: '',
};

function yearOptions(selected) {
  return YEARS.map(
    (y) => '<option value="' + y + '"' + (y === selected ? ' selected' : '') + '>' + y + '</option>'
  ).join('');
}

function sourceLine(key) {
  return '<p class="source">Source: ' + SERIES[key].source + ', ' + state.year + '.</p>';
}

function pointsFor(key) {
  return YEARS.map((y) => ({ label: String(y), value: SERIES[key].values[y] }));
}

function chartCard(key, title, blurb) {
  const points = pointsFor(key);
  const type = state.chartType;
  return (
    '<section class="card chart-card"><div class="card-head"><h2>' + title + '</h2>' +
    '<div class="toggle" role="group" aria-label="Chart type">' +
    '<button data-chart="bar"' + (type === 'bar' ? ' class="active" aria-pressed="true"' : '') + '>Bars</button>' +
    '<button data-chart="line"' + (type === 'line' ? ' class="active" aria-pressed="true"' : '') + '>Line</button>' +
    '</div></div>' +
    '<p class="muted">' + blurb + '</p>' +
    '<div class="chart">' + chartFor(points, type, title) + '</div>' +
    sourceLine(key) +
    '</section>'
  );
}

function seriesTable(key) {
  const rows = YEARS.slice().reverse().map((y) => {
    const v = SERIES[key].values[y];
    const d = changeSince(key, y);
    const delta = d === null ? '—' : (d > 0 ? '+' : '') + d.toFixed(2);
    return '<tr><td>' + y + '</td><td>' + formatValue(key, v) + '</td><td>' + delta + '</td></tr>';
  }).join('');
  return (
    '<section class="card"><h2>' + SERIES[key].label + ' by year</h2>' +
    '<table class="data-table"><thead><tr><th>Year</th><th>Value</th><th>Change on previous year</th></tr></thead>' +
    '<tbody>' + rows + '</tbody></table>' + sourceLine(key) + '</section>'
  );
}

function kpiCard(key, year) {
  const v = SERIES[key].values[year];
  const d = changeSince(key, year);
  const delta = d === null ? '' : '<span class="delta">' + (d > 0 ? '▲ +' : d < 0 ? '▼ ' : '— ') + d.toFixed(2) + ' vs ' + (year - 1) + '</span>';
  return (
    '<a class="kpi" href="#/' + pageFor(key) + '">' +
    '<span class="kpi-label">' + SERIES[key].label + '</span>' +
    '<span class="kpi-value">' + formatValue(key, v) + '</span>' +
    '<span class="kpi-meta">' + year + ' · ' + SERIES[key].unit + '</span>' + delta +
    '</a>'
  );
}

function pageFor(key) {
  if (key === 'population' || key === 'hdi') return 'population';
  if (key === 'gdp' || key === 'growth' || key === 'gdpPerCapita') return 'economy';
  if (key === 'inflation') return 'prices';
  if (key === 'unemployment' || key === 'participation') return 'employment';
  if (key === 'poverty') return 'employment';
  return '';
}

export function renderHome() {
  const y = state.year;
  const cards = ['population', 'gdp', 'growth', 'inflation', 'unemployment', 'poverty'].map((k) => kpiCard(k, y)).join('');
  return (
    '<section class="hero"><p class="eyebrow">Indonesia · Official statistics, plainly presented</p>' +
    '<h1>Indonesia in numbers</h1>' +
    '<p class="lede">The headline figures for the world’s fourth most populous country — ' +
    'population, the economy, prices, jobs and the provinces — each with its source and year, ' +
    'so you can check every number.</p>' +
    '<div class="hero-controls"><label>Year <select id="year-select" aria-label="Year">' + yearOptions(y) + '</select></label>' +
    '<label class="search-label">Search indicators <input id="home-search" type="search" placeholder="Try “inflation” or “jobs”" value="' +
    state.searchQuery + '"></label></div></section>' +
    '<section class="kpi-grid" aria-label="Key indicators">' + cards + '</section>' +
    '<section class="card">' + '<h2>Growth, 2020–2024</h2>' +
    '<p class="muted">Real GDP growth held near 5% a year after the 2020 contraction. Switch the chart type to see the same series as a line.</p>' +
    '<div class="chart">' + chartFor(pointsFor('growth'), state.chartType, 'Real GDP growth 2020-2024') + '</div>' +
    '<p class="source">Source: Statistics Indonesia (BPS), national accounts.</p></section>' +
    '<section class="card"><h2>Start exploring</h2><ul class="link-list">' +
    '<li><a href="#/population">Population — 281.6 million people, and where they live</a></li>' +
    '<li><a href="#/economy">Economy — GDP, growth and the biggest sectors</a></li>' +
    '<li><a href="#/prices">Prices &amp; inflation — the 2022 spike and the return to 1.57%</a></li>' +
    '<li><a href="#/employment">Employment — unemployment down to 4.82% in February 2024</a></li>' +
    '<li><a href="#/regions">Regions — the twelve most populous provinces</a></li>' +
    '<li><a href="#/methodology">Methodology &amp; sources — where every figure comes from</a></li>' +
    '</ul></section>'
  );
}

export function renderPopulation() {
  return (
    '<section class="page-head"><h1>Population</h1>' +
    '<p class="lede">281.6 million people in 2024, the fourth largest population in the world. ' +
    'Growth has slowed to about 1% a year.</p></section>' +
    chartCard('population', 'Population, 2020–2024', 'Mid-year population in millions. 2020 is the census count; later years are estimates.') +
    chartCard('hdi', 'Human Development Index, 2020–2024', 'Health, education and living standards combined into one index, 0–100.') +
    seriesTable('population') +
    '<section class="card"><h2>About these figures</h2><p>' + SERIES.population.note + ' ' + SERIES.hdi.note + '</p>' +
    '<p class="source">Source: Statistics Indonesia (BPS), Population Census 2020 and mid-year estimates; Human Development Index releases.</p></section>'
  );
}

const ECONOMY_INDICATORS = [
  { key: 'growth', label: 'Real GDP growth' },
  { key: 'gdp', label: 'GDP (Rp trillion)' },
  { key: 'gdpPerCapita', label: 'GDP per capita' },
];

export function renderEconomy() {
  const key = state.economyIndicator;
  const buttons = ECONOMY_INDICATORS.map(
    (i) => '<button data-indicator="' + i.key + '"' + (i.key === key ? ' class="active" aria-pressed="true"' : '') + '>' + i.label + '</button>'
  ).join('');
  const sectorRows = SECTORS_2024.map((s) => ({
    label: s.name, value: s.share, display: s.share.toFixed(2) + '%',
  }));
  return (
    '<section class="page-head"><h1>Economy</h1>' +
    '<p class="lede">GDP reached Rp 22,139 trillion in 2024 — about $1.40 trillion — ' +
    'with real growth of 5.03%.</p></section>' +
    '<section class="card chart-card"><div class="card-head"><h2>Pick an indicator</h2>' +
    '<div class="toggle" role="group" aria-label="Indicator">' + buttons + '</div></div>' +
    '<p class="muted">' + SERIES[key].label + ' — ' + SERIES[key].unit + '. ' + SERIES[key].note + '</p>' +
    '<div class="chart">' + chartFor(pointsFor(key), state.chartType, SERIES[key].label) + '</div>' +
    '<div class="toggle" role="group" aria-label="Chart type">' +
    '<button data-chart="bar"' + (state.chartType === 'bar' ? ' class="active"' : '') + '>Bars</button>' +
    '<button data-chart="line"' + (state.chartType === 'line' ? ' class="active"' : '') + '>Line</button></div>' +
    sourceLine(key) + '</section>' +
    '<section class="card"><h2>Biggest sectors, share of GDP in 2024</h2>' +
    hbarList(sectorRows) +
    '<p class="source">Source: Statistics Indonesia (BPS), national accounts, 2024.</p></section>' +
    seriesTable('gdp') + seriesTable('growth')
  );
}

export function renderPrices() {
  return (
    '<section class="page-head"><h1>Prices &amp; inflation</h1>' +
    '<p class="lede">Consumer price inflation was 1.57% in December 2024 — inside Bank ' +
    'Indonesia’s 1.5–3.5% target range — after the 5.51% spike of 2022.</p></section>' +
    chartCard('inflation', 'Inflation, 2020–2024', 'Consumer price inflation, December year on year. The 2022 spike followed the September 2022 fuel-price adjustment.') +
    seriesTable('inflation') +
    '<section class="card"><h2>Reading the series</h2><p>Inflation ran below 2% in 2020 and 2021, ' +
    'jumped when subsidised fuel prices were raised in September 2022, then fell back as fuel ' +
    'and food prices steadied. The December reading is the one BPS headlines each year.</p>' +
    '<p class="source">Source: Statistics Indonesia (BPS), consumer price index.</p></section>'
  );
}

export function renderEmployment() {
  return (
    '<section class="page-head"><h1>Employment</h1>' +
    '<p class="lede">Unemployment was 4.82% in February 2024 — below its pre-pandemic level — ' +
    'and 4.76% in February 2025. Participation keeps rising.</p></section>' +
    chartCard('unemployment', 'Unemployment rate, 2020–2024', 'Open unemployment rate, February surveys, as a share of the labour force.') +
    chartCard('participation', 'Labour force participation, 2020–2024', 'Share of people aged 15 and over who are working or looking for work, February surveys.') +
    seriesTable('unemployment') + seriesTable('poverty') +
    '<section class="card"><h2>About these figures</h2><p>The February survey is the headline ' +
    'labour-force round each year. Poverty is shown here too because jobs and poverty move ' +
    'together: the poverty rate fell to 8.57% in September 2024, the lowest BPS has recorded.</p>' +
    '<p class="source">Source: Statistics Indonesia (BPS), National Labour Force Survey (Sakernas) and poverty statistics.</p></section>'
  );
}

function provinceRows() {
  const total = 281.6;
  let rows = PROVINCES.map((p) => ({
    ...p,
    share: (p.population / total) * 100,
  }));
  const q = state.regionQuery.trim().toLowerCase();
  if (q) rows = rows.filter((p) => p.name.toLowerCase().includes(q));
  if (state.regionIsland !== 'All') rows = rows.filter((p) => p.island === state.regionIsland);
  const key = state.sortKey;
  const dir = state.sortDir;
  rows.sort((a, b) => {
    if (key === 'name') return dir * a.name.localeCompare(b.name);
    if (key === 'island') return dir * a.island.localeCompare(b.island);
    return dir * (a[key] - b[key]);
  });
  return rows;
}

export function renderRegions() {
  const islands = ['All', 'Java', 'Sumatra', 'Sulawesi', 'Kalimantan'];
  const buttons = islands.map(
    (i) => '<button data-island="' + i + '"' + (i === state.regionIsland ? ' class="active" aria-pressed="true"' : '') + '>' + i + '</button>'
  ).join('');
  const rows = provinceRows();
  const sortTh = (key, label) => {
    const arrow = state.sortKey === key ? (state.sortDir === 1 ? ' ▲' : ' ▼') : '';
    return '<th><button class="th-sort" data-sort="' + key + '">' + label + arrow + '</button></th>';
  };
  const body = rows.length
    ? rows.map((p) => '<tr><td>' + p.name + '</td><td>' + p.island + '</td><td>' + p.population.toFixed(2) + '</td><td>' + p.share.toFixed(1) + '%</td></tr>').join('')
    : '<tr><td colspan="4">No provinces match that filter. Clear the search or pick another island.</td></tr>';
  const bars = hbarList(
    PROVINCES.slice(0, 6).map((p) => ({ label: p.name, value: p.population, display: p.population.toFixed(2) + 'm' }))
  );
  return (
    '<section class="page-head"><h1>Regions</h1>' +
    '<p class="lede">Java holds more than half the country: the five Javanese provinces in this ' +
    'table alone are home to about 150 million people.</p></section>' +
    '<section class="card"><h2>Most populous provinces, 2024</h2>' + bars +
    '<p class="source">Source: Statistics Indonesia (BPS), mid-year population estimates, 2024.</p></section>' +
    '<section class="card"><div class="card-head"><h2>All twelve provinces</h2>' +
    '<div class="toggle" role="group" aria-label="Island filter">' + buttons + '</div></div>' +
    '<label class="search-label">Search provinces <input id="region-search" type="search" placeholder="Try “Java” or “Sumatra”" value="' + state.regionQuery + '"></label>' +
    '<table class="data-table"><thead><tr>' + sortTh('name', 'Province') + sortTh('island', 'Island') + sortTh('population', 'Population (million)') + sortTh('share', 'Share of Indonesia') + '</tr></thead>' +
    '<tbody>' + body + '</tbody></table>' +
    '<p class="muted">' + rows.length + ' of 12 provinces shown. Click a column heading to sort it.</p>' +
    '<p class="source">Source: Statistics Indonesia (BPS), mid-year population estimates, 2024. Shares are against the national total of 281.6 million.</p></section>'
  );
}

export function renderMethodology() {
  const items = SOURCES.map((s) => '<li><strong>' + s.name + '</strong><br><span class="muted">' + s.detail + '</span></li>').join('');
  return (
    '<section class="page-head"><h1>Methodology &amp; sources</h1>' +
    '<p class="lede">Every figure on this site names its source and year where it appears. ' +
    'This page collects them in one place.</p></section>' +
    '<section class="card"><h2>Sources</h2><ul class="source-list">' + items + '</ul></section>' +
    '<section class="card"><h2>How the numbers are shown</h2><ul class="plain-list">' +
    '<li><strong>Years.</strong> The year picker on the home page changes every headline figure at once. Series charts always cover 2020–2024.</li>' +
    '<li><strong>Rounding.</strong> Figures are shown as published, rounded to two decimals at most. Shares are computed from the published totals shown.</li>' +
    '<li><strong>Survey months.</strong> Unemployment and participation are February figures, poverty is September — the rounds BPS headlines.</li>' +
    '<li><strong>Money.</strong> GDP is in rupiah at current prices. The dollar figure (about $1.40 trillion in 2024) is the World Bank’s, for scale only.</li>' +
    '<li><strong>No estimates of our own.</strong> Nothing on this site is modelled, forecast or interpolated by us. Where a year is missing from a series, it is shown as missing, not filled in.</li>' +
    '</ul></section>' +
    '<section class="card"><h2>About NusaStat</h2><p>NusaStat is an independent, original ' +
    'presentation of published Indonesian statistics. It is not affiliated with Statistics ' +
    'Indonesia (BPS), the World Bank or any government body, and it copies no official ' +
    'publication’s design, text or branding.</p></section>'
  );
}

export function renderNotFound() {
  return '<section class="page-head"><h1>Page not found</h1><p class="lede">That section does not exist. ' +
    '<a href="#/">Back to the overview</a>.</p></section>';
}
