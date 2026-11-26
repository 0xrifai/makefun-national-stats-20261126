// NusaStat main: hash routing and control wiring. The pages themselves live
// in views.js; this file decides which page to show and makes its controls
// work — year picker, chart toggles, indicator switcher, island filter,
// sortable table headings, region search and home search.

import { state, renderHome, renderPopulation, renderEconomy, renderPrices, renderEmployment, renderRegions, renderMethodology, renderNotFound } from './views.js';

const app = document.getElementById('app');

const ROUTES = {
  '': renderHome,
  '/': renderHome,
  '/population': renderPopulation,
  '/economy': renderEconomy,
  '/prices': renderPrices,
  '/employment': renderEmployment,
  '/regions': renderRegions,
  '/methodology': renderMethodology,
};

function currentRoute() {
  const hash = window.location.hash || '#/';
  return hash.slice(1) || '/';
}

function render() {
  const route = currentRoute();
  const view = ROUTES[route] || renderNotFound;
  app.innerHTML = view();
  bindControls();
  document.querySelectorAll('nav a').forEach((a) => {
    const href = a.getAttribute('href');
    a.classList.toggle('current', href === '#' + route || (route === '/' && href === '#/'));
    if (a.classList.contains('current')) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  window.scrollTo(0, 0);
}

function rerender() {
  render();
}

function bindControls() {
  const yearSelect = document.getElementById('year-select');
  if (yearSelect) {
    yearSelect.addEventListener('change', () => {
      state.year = Number(yearSelect.value);
      rerender();
    });
  }

  const homeSearch = document.getElementById('home-search');
  if (homeSearch) {
    homeSearch.addEventListener('input', () => {
      state.searchQuery = homeSearch.value;
      filterKpis(homeSearch.value);
    });
    if (state.searchQuery) filterKpis(state.searchQuery);
  }

  document.querySelectorAll('[data-chart]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.chartType = btn.getAttribute('data-chart');
      rerender();
    });
  });

  document.querySelectorAll('[data-indicator]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.economyIndicator = btn.getAttribute('data-indicator');
      rerender();
    });
  });

  document.querySelectorAll('[data-island]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.regionIsland = btn.getAttribute('data-island');
      rerender();
    });
  });

  document.querySelectorAll('[data-sort]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-sort');
      if (state.sortKey === key) state.sortDir = -state.sortDir;
      else {
        state.sortKey = key;
        state.sortDir = key === 'name' || key === 'island' ? 1 : -1;
      }
      rerender();
    });
  });

  const regionSearch = document.getElementById('region-search');
  if (regionSearch) {
    regionSearch.addEventListener('input', () => {
      state.regionQuery = regionSearch.value;
      rerender();
      const again = document.getElementById('region-search');
      if (again) {
        again.focus();
        again.setSelectionRange(again.value.length, again.value.length);
      }
    });
  }
}

// Home search: keep only the indicator cards whose label, unit or linked
// page matches the query; an empty query shows everything again.
function filterKpis(query) {
  const q = query.trim().toLowerCase();
  document.querySelectorAll('.kpi').forEach((card) => {
    if (!q) {
      card.style.display = '';
      return;
    }
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(q) ? '' : 'none';
  });
  const grid = document.querySelector('.kpi-grid');
  if (grid) {
    const visible = grid.querySelectorAll('.kpi:not([style*="none"])').length;
    let note = document.getElementById('search-note');
    if (!note) {
      note = document.createElement('p');
      note.id = 'search-note';
      note.className = 'muted';
      grid.after(note);
    }
    note.textContent = q
      ? visible + ' indicator' + (visible === 1 ? '' : 's') + ' match' + (visible === 1 ? 'es' : '') + ' “' + query.trim() + '”.'
      : '';
  }
}

window.addEventListener('hashchange', render);
render();
