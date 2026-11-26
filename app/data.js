// NusaStat data: published figures for Indonesia, 2020-2024.
// Every number below comes from a published release and is cited where it is
// shown. Sources: Statistics Indonesia (BPS) and the World Bank.
// Do not add a figure here unless you can name its source and year.

export const YEARS = [2020, 2021, 2022, 2023, 2024];

export const LATEST_YEAR = 2024;

// Annual series. Values are the ones BPS publishes in its yearly releases.
export const SERIES = {
  population: {
    label: 'Population',
    unit: 'million people',
    source: 'Statistics Indonesia (BPS), mid-year population estimates',
    values: { 2020: 270.2, 2021: 272.5, 2022: 275.8, 2023: 278.7, 2024: 281.6 },
    note: '2020 is the Population Census count; later years are mid-year estimates.',
  },
  gdp: {
    label: 'Gross domestic product (GDP)',
    unit: 'Rp trillion, current prices',
    source: 'Statistics Indonesia (BPS), national accounts',
    values: { 2020: 15443, 2021: 16977, 2022: 19588, 2023: 20892, 2024: 22139 },
    note: 'GDP at current market prices, in rupiah trillion.',
  },
  growth: {
    label: 'Real GDP growth',
    unit: '% per year',
    source: 'Statistics Indonesia (BPS), national accounts',
    values: { 2020: -2.07, 2021: 3.7, 2022: 5.31, 2023: 5.05, 2024: 5.03 },
    note: '2020 is the COVID-19 contraction; growth has held near 5% since 2022.',
  },
  gdpPerCapita: {
    label: 'GDP per capita',
    unit: 'Rp million',
    source: 'Statistics Indonesia (BPS), national accounts',
    values: { 2020: 57.2, 2021: 62.3, 2022: 71.0, 2023: 75.0, 2024: 78.6 },
    note: 'GDP at current prices divided by mid-year population.',
  },
  inflation: {
    label: 'Consumer price inflation',
    unit: '% year on year, December',
    source: 'Statistics Indonesia (BPS), consumer price index',
    values: { 2020: 1.68, 2021: 1.87, 2022: 5.51, 2023: 2.61, 2024: 1.57 },
    note: 'The 2022 spike followed the September 2022 fuel-price adjustment.',
  },
  unemployment: {
    label: 'Open unemployment rate',
    unit: '% of the labour force, February',
    source: 'Statistics Indonesia (BPS), National Labour Force Survey (Sakernas)',
    values: { 2020: 4.99, 2021: 6.26, 2022: 5.83, 2023: 5.45, 2024: 4.82 },
    note: 'February 2025, the latest release, was 4.76%.',
  },
  participation: {
    label: 'Labour force participation rate',
    unit: '% of people aged 15+, February',
    source: 'Statistics Indonesia (BPS), National Labour Force Survey (Sakernas)',
    values: { 2020: 67.45, 2021: 68.08, 2022: 69.06, 2023: 69.33, 2024: 69.8 },
    note: 'February 2025, the latest release, was 70.71%.',
  },
  poverty: {
    label: 'Poverty rate',
    unit: '% of population, September',
    source: 'Statistics Indonesia (BPS), poverty statistics',
    values: { 2020: 10.19, 2021: 9.71, 2022: 9.57, 2023: 9.36, 2024: 8.57 },
    note: 'September 2024 is the lowest poverty rate BPS has recorded.',
  },
  hdi: {
    label: 'Human Development Index',
    unit: 'index, 0-100',
    source: 'Statistics Indonesia (BPS), Human Development Index',
    values: { 2020: 71.94, 2021: 72.29, 2022: 72.91, 2023: 74.39, 2024: 75.02 },
    note: 'Combines health, education and living-standard measures.',
  },
};

// Largest sectors of the economy, share of GDP in 2024 (BPS).
export const SECTORS_2024 = [
  { name: 'Manufacturing', share: 18.67 },
  { name: 'Wholesale and retail trade', share: 12.95 },
  { name: 'Agriculture, forestry and fishing', share: 12.11 },
  { name: 'Mining and quarrying', share: 9.86 },
  { name: 'Construction', share: 9.7 },
  { name: 'Other sectors combined', share: 36.71 },
];

// Most populous provinces, mid-year population 2024 (BPS estimates).
export const PROVINCES = [
  { name: 'West Java', island: 'Java', population: 49.94 },
  { name: 'East Java', island: 'Java', population: 41.81 },
  { name: 'Central Java', island: 'Java', population: 37.89 },
  { name: 'North Sumatra', island: 'Sumatra', population: 15.59 },
  { name: 'Banten', island: 'Java', population: 12.43 },
  { name: 'Jakarta', island: 'Java', population: 10.68 },
  { name: 'South Sulawesi', island: 'Sulawesi', population: 9.46 },
  { name: 'Lampung', island: 'Sumatra', population: 9.33 },
  { name: 'South Sumatra', island: 'Sumatra', population: 8.84 },
  { name: 'Riau', island: 'Sumatra', population: 6.99 },
  { name: 'West Sumatra', island: 'Sumatra', population: 5.85 },
  { name: 'East Kalimantan', island: 'Kalimantan', population: 4.04 },
];

export const SOURCES = [
  {
    name: 'Statistics Indonesia (BPS) — Population',
    detail: 'Population Census 2020 and mid-year population estimates 2021-2024.',
  },
  {
    name: 'Statistics Indonesia (BPS) — National accounts',
    detail: 'Gross domestic product at current and constant prices, 2020-2024.',
  },
  {
    name: 'Statistics Indonesia (BPS) — Consumer prices',
    detail: 'Consumer Price Index, December year-on-year inflation, 2020-2024.',
  },
  {
    name: 'Statistics Indonesia (BPS) — Labour force (Sakernas)',
    detail: 'Open unemployment rate and labour force participation, February surveys.',
  },
  {
    name: 'Statistics Indonesia (BPS) — Poverty',
    detail: 'Poverty rate, September rounds, 2020-2024.',
  },
  {
    name: 'Statistics Indonesia (BPS) — Human Development Index',
    detail: 'Human Development Index, 2020-2024.',
  },
  {
    name: 'World Bank — World Development Indicators',
    detail: 'Cross-check for GDP in US dollars: about $1.40 trillion in 2024.',
  },
];

export function formatValue(key, value) {
  if (value === undefined || value === null) return '—';
  if (key === 'population') return value.toFixed(1) + ' million';
  if (key === 'gdp') return 'Rp ' + value.toLocaleString('en-US') + ' trillion';
  if (key === 'growth' || key === 'inflation' || key === 'unemployment' || key === 'participation' || key === 'poverty') {
    return value.toFixed(2) + '%';
  }
  if (key === 'gdpPerCapita') return 'Rp ' + value.toFixed(1) + ' million';
  if (key === 'hdi') return value.toFixed(2);
  return String(value);
}

export function changeSince(key, year) {
  const values = SERIES[key].values;
  const now = values[year];
  const before = values[year - 1];
  if (now === undefined || before === undefined) return null;
  return now - before;
}
