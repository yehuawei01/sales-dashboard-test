import { METHODS, parsePredictionCsv, joinPredictions, summarize, selectCategory, filterExamples, paginate, displayCategory, mistakeCounts } from './model.js';
import { createNode as node, createExampleRow } from './render.js';

const get = (id) => document.getElementById(id);
const elements = Object.fromEntries(['dashboard', 'load-status', 'load-error', 'error-text', 'retry', 'warnings', 'dataset-description', 'category', 'view', 'search', 'reset', 'summary-cards', 'sample-size', 'comparison-insight', 'results-count', 'page-label', 'previous', 'next', 'example-table', 'example-rows', 'empty-results'].map((id) => [id, get(id)]));
const number = (value) => value.toLocaleString('en-US');
let dataset = null;
let page = 1;
let currentPage = null;

function updateComparison(selected) {
  const summaries = summarize(selected);
  const highest = selected.length ? Math.max(...summaries.map((method) => method.accuracy)) : null;
  const leaders = summaries.filter((method) => method.accuracy !== null && method.accuracy === highest);
  elements['summary-cards'].replaceChildren();
  for (const summary of summaries) {
    const card = node('article', `summary-card method-${summary.id}`);
    card.append(node('h3', 'method-title', summary.name));
    const isLeader = leaders.some((method) => method.id === summary.id);
    card.append(node('p', isLeader ? 'leader-label' : 'leader-label neutral-label', isLeader ? (leaders.length > 1 ? 'Joint highest accuracy' : 'Highest accuracy') : ''));
    const score = node('p', 'accuracy-value', summary.accuracy === null ? '—' : `${summary.accuracy.toFixed(2)}%`);
    score.setAttribute('aria-label', summary.accuracy === null ? 'Accuracy unavailable' : `Accuracy ${summary.accuracy.toFixed(2)} percent`);
    card.append(score);
    const track = node('div', 'accuracy-track');
    track.setAttribute('aria-hidden', 'true');
    const bar = node('div', 'accuracy-bar');
    bar.style.width = `${summary.accuracy ?? 0}%`;
    track.append(bar);
    card.append(track);
    const counts = node('dl', 'answer-counts');
    for (const [label, count] of [['Correct', summary.correct], ['Incorrect', summary.incorrect]]) {
      const group = node('div');
      group.append(node('dt', '', label), node('dd', '', number(count)));
      counts.append(group);
    }
    card.append(counts);
    elements['summary-cards'].append(card);
  }
  const category = elements.category.value;
  elements['sample-size'].textContent = category ? `Based on ${number(selected.length)} examples of “${displayCategory(category)}”.` : `Based on the same ${number(selected.length)} examples across ${number(dataset.categories.length)} request types.`;
  elements['comparison-insight'].textContent = !selected.length ? 'No examples are available. Accuracy cannot be calculated.' : leaders.length === 1 ? `${leaders[0].name} has the highest accuracy ${category ? 'for this request type' : 'on this test set'}. Compare the mistakes below to see where the methods differ.` : `${leaders.map((method) => method.name).join(' and ')} share the highest accuracy in this view.`;
}

function updateExamples(selected) {
  const groups = mistakeCounts(selected);
  document.querySelectorAll('[data-mistake-view]').forEach(button => {
    const view = button.dataset.mistakeView;
    const count = view === 'incorrect' ? groups[1] + groups[2] + groups[3] : groups[Number(view.slice(-1))];
    button.querySelector('.mistake-count').textContent = number(count);
    button.setAttribute('aria-pressed', String(elements.view.value === view));
  });
  const filtered = filterExamples(selected, { view: elements.view.value, search: elements.search.value });
  currentPage = paginate(filtered, page, 25);
  page = currentPage.page;
  const { items, total, totalPages, start, end } = currentPage;
  elements['results-count'].textContent = total ? `${number(start)}–${number(end)} of ${number(total)} matching examples` : '0 matching examples';
  elements['page-label'].textContent = totalPages ? `Page ${page} of ${number(totalPages)}` : 'No pages';
  elements.previous.disabled = !totalPages || page <= 1;
  elements.next.disabled = !totalPages || page >= totalPages;
  elements['empty-results'].hidden = total > 0;
  elements['example-table'].hidden = total === 0;
  const rows = document.createDocumentFragment();
  for (const example of items) {
    rows.append(createExampleRow(example));
  }
  elements['example-rows'].replaceChildren(rows);
}

function update({ comparison = false, resetPage = true } = {}) {
  if (!dataset) return;
  if (resetPage) page = 1;
  const selected = selectCategory(dataset.cases, elements.category.value);
  if (comparison) updateComparison(selected);
  updateExamples(selected);
}

elements.category.addEventListener('change', () => update({ comparison: true }));
elements.view.addEventListener('change', () => update());
document.querySelectorAll('[data-mistake-view]').forEach(button => {
  button.addEventListener('click', () => {
    elements.view.value = button.dataset.mistakeView;
    update();
  });
});
elements.search.addEventListener('input', () => update());
elements.reset.addEventListener('click', () => {
  elements.category.value = '';
  elements.view.value = 'incorrect';
  elements.search.value = '';
  update({ comparison: true });
});
elements.previous.addEventListener('click', () => { page -= 1; update({ resetPage: false }); });
elements.next.addEventListener('click', () => { page += 1; update({ resetPage: false }); });
elements.retry.addEventListener('click', () => load());

async function load() {
  dataset = null;
  elements.dashboard.hidden = true;
  elements['load-error'].hidden = true;
  elements.warnings.hidden = true;
  elements['load-status'].hidden = false;
  elements.retry.disabled = true;
  elements['dataset-description'].textContent = 'Loading the local prediction files…';
  try {
    const parsed = await Promise.all(METHODS.map(async (method) => {
      const response = await fetch(`${import.meta.env.BASE_URL}data/${method.file}`);
      if (!response.ok) throw new Error(`${method.name}: its local CSV file could not be opened (HTTP ${response.status}).`);
      if (Number(response.headers.get('content-length')) > 10 * 1024 * 1024) throw new Error(`${method.name}: the CSV is larger than the supported 10 MB limit.`);
      return { method, ...parsePredictionCsv(await response.text(), method.name) };
    }));
    const loaded = joinPredictions(parsed);
    dataset = loaded;
    elements.category.replaceChildren(new Option('All request types', ''), ...loaded.categories.map((category) => new Option(displayCategory(category), category)));
    elements.view.value = 'incorrect';
    elements.search.value = '';
    elements['dataset-description'].textContent = `${number(loaded.cases.length)} shared examples · ${number(loaded.categories.length)} request types · 3 methods`;
    if (loaded.warnings.length) {
      const list = node('ul');
      for (const warning of loaded.warnings) list.append(node('li', '', warning));
      elements.warnings.replaceChildren(node('h2', '', 'Data quality notes'), list);
      elements.warnings.hidden = false;
    }
    update({ comparison: true });
    elements['load-status'].hidden = true;
    elements.dashboard.hidden = false;
  } catch (error) {
    elements['load-status'].hidden = true;
    elements['error-text'].textContent = `${error.message} Scores are unavailable until all files can be checked together.`;
    elements['dataset-description'].textContent = 'The comparison is unavailable.';
    elements['load-error'].hidden = false;
  } finally {
    elements.retry.disabled = false;
  }
}

load();
