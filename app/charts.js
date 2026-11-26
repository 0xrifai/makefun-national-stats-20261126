// NusaStat charts: hand-rolled SVG bar and line charts. No chart library —
// these functions take a series of {label, value} points and return SVG text.

function niceMax(max) {
  if (max <= 0) return 1;
  const power = Math.pow(10, Math.floor(Math.log10(max)));
  const scaled = max / power;
  const nice = scaled <= 1 ? 1 : scaled <= 2 ? 2 : scaled <= 2.5 ? 2.5 : scaled <= 5 ? 5 : 10;
  return nice * power;
}

function niceMin(min, max) {
  if (min >= 0) return 0;
  const span = max - min;
  const power = Math.pow(10, Math.floor(Math.log10(span)));
  return Math.floor(min / power) * power;
}

function axisLabels(min, max) {
  const steps = 4;
  const out = [];
  for (let i = 0; i <= steps; i++) out.push(min + ((max - min) * i) / steps);
  return out;
}

function fmtTick(v) {
  if (Math.abs(v) >= 1000) return (v / 1000).toFixed(0) + 'k';
  if (Math.abs(v) >= 100) return v.toFixed(0);
  if (Math.abs(v) >= 10) return v.toFixed(0);
  return v.toFixed(1);
}

function gridLines(min, max, w, h, pad) {
  const labels = axisLabels(min, max);
  return labels
    .map((v) => {
      const y = pad.top + ((max - v) / (max - min)) * (h - pad.top - pad.bottom);
      return (
        '<line x1="' + pad.left + '" y1="' + y.toFixed(1) + '" x2="' + (w - pad.right) + '" y2="' + y.toFixed(1) +
        '" class="chart-grid"/>' +
        '<text x="' + (pad.left - 6) + '" y="' + (y + 4).toFixed(1) + '" class="chart-tick" text-anchor="end">' +
        fmtTick(v) + '</text>'
      );
    })
    .join('');
}

export function barChart(points, opts) {
  const w = 640;
  const h = 300;
  const pad = { top: 16, right: 12, bottom: 34, left: 52 };
  const values = points.map((p) => p.value);
  const max = niceMax(Math.max(...values));
  const min = niceMin(Math.min(...values), max);
  const plotW = w - pad.left - pad.right;
  const plotH = h - pad.top - pad.bottom;
  const slot = plotW / points.length;
  const barW = Math.min(56, slot * 0.62);
  const bars = points
    .map((p, i) => {
      const y0 = pad.top + ((max - 0) / (max - min)) * plotH;
      const y = pad.top + ((max - p.value) / (max - min)) * plotH;
      const x = pad.left + i * slot + (slot - barW) / 2;
      const top = Math.min(y, y0);
      const height = Math.max(2, Math.abs(y0 - y));
      const fill = p.value < 0 ? 'var(--neg)' : 'var(--accent)';
      return (
        '<rect x="' + x.toFixed(1) + '" y="' + top.toFixed(1) + '" width="' + barW.toFixed(1) +
        '" height="' + height.toFixed(1) + '" rx="3" fill="' + fill + '">' +
        '<title>' + p.label + ': ' + p.value + '</title></rect>' +
        '<text x="' + (x + barW / 2).toFixed(1) + '" y="' + (top - 6).toFixed(1) +
        '" class="chart-value" text-anchor="middle">' + p.value + '</text>' +
        '<text x="' + (x + barW / 2).toFixed(1) + '" y="' + (h - 10) + '" class="chart-tick" text-anchor="middle">' +
        p.label + '</text>'
      );
    })
    .join('');
  const zero = pad.top + ((max - 0) / (max - min)) * plotH;
  return (
    '<svg viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="' + (opts.label || 'Bar chart') + '">' +
    gridLines(min, max, w, h, pad) +
    '<line x1="' + pad.left + '" y1="' + zero.toFixed(1) + '" x2="' + (w - pad.right) + '" y2="' + zero.toFixed(1) + '" class="chart-axis"/>' +
    bars +
    '</svg>'
  );
}

export function lineChart(points, opts) {
  const w = 640;
  const h = 300;
  const pad = { top: 24, right: 16, bottom: 34, left: 52 };
  const values = points.map((p) => p.value);
  const rawMax = Math.max(...values);
  const rawMin = Math.min(...values);
  const max = niceMax(rawMax);
  const min = niceMin(rawMin, rawMax);
  const plotW = w - pad.left - pad.right;
  const plotH = h - pad.top - pad.bottom;
  const step = points.length > 1 ? plotW / (points.length - 1) : 0;
  const xy = points.map((p, i) => ({
    x: pad.left + i * step,
    y: pad.top + ((max - p.value) / (max - min)) * plotH,
    label: p.label,
    value: p.value,
  }));
  const line = xy.map((p, i) => (i === 0 ? 'M' : 'L') + p.x.toFixed(1) + ' ' + p.y.toFixed(1)).join(' ');
  const dots = xy
    .map(
      (p) =>
        '<circle cx="' + p.x.toFixed(1) + '" cy="' + p.y.toFixed(1) + '" r="5" class="chart-dot">' +
        '<title>' + p.label + ': ' + p.value + '</title></circle>' +
        '<text x="' + p.x.toFixed(1) + '" y="' + (p.y - 12).toFixed(1) + '" class="chart-value" text-anchor="middle">' +
        p.value + '</text>' +
        '<text x="' + p.x.toFixed(1) + '" y="' + (h - 10) + '" class="chart-tick" text-anchor="middle">' +
        p.label + '</text>'
    )
    .join('');
  return (
    '<svg viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="' + (opts.label || 'Line chart') + '">' +
    gridLines(min, max, w, h, pad) +
    '<path d="' + line + '" class="chart-line" fill="none"/>' +
    dots +
    '</svg>'
  );
}

// A horizontal bar list used for sector shares and province populations.
export function hbarList(rows, opts) {
  const max = Math.max(...rows.map((r) => r.value));
  return (
    '<ul class="hbars">' +
    rows
      .map(
        (r) =>
          '<li><span class="hbar-label">' + r.label + '</span>' +
          '<span class="hbar-track"><span class="hbar-fill" style="width:' +
          ((r.value / max) * 100).toFixed(1) + '%"></span></span>' +
          '<span class="hbar-value">' + r.display + '</span></li>'
      )
      .join('') +
    '</ul>'
  );
}

export function chartFor(points, type, label) {
  if (type === 'line') return lineChart(points, { label });
  return barChart(points, { label });
}
