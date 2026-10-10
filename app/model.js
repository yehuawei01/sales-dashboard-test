import Papa from 'papaparse';

// Raw labels and IDs remain unchanged throughout the comparison.
export const METHODS = Object.freeze([
  Object.freeze({
    id: 'bow',
    name: 'Word-based logistic regression',
    shortName: 'Word-based',
    file: 'bow_logistic_regression_test_predictions_3080.csv',
  }),
  Object.freeze({
    id: 'fine',
    name: 'Fine-tuned classifier',
    shortName: 'Fine-tuned',
    file: 'fine_tuned_classifier_test_predictions_3080.csv',
  }),
  Object.freeze({
    id: 'llm',
    name: 'Prompted LLM',
    shortName: 'Prompted LLM',
    file: 'llm_prompting_test_predictions_3080.csv',
  }),
]);

const REQUIRED_FIELDS = ['case_id', 'text', 'true_label', 'predicted_label'];
const MAX_CSV_CHARACTERS = 10 * 1024 * 1024;
const MAX_ROWS = 100_000;

function isNonemptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function validateRows(rows, name) {
  if (!Array.isArray(rows)) throw new Error(`${name}: no readable examples were supplied.`);
  if (rows.length > MAX_ROWS) {
    throw new Error(`${name}: this local dashboard supports up to ${MAX_ROWS.toLocaleString('en-US')} examples per file.`);
  }
  const seen = new Set();
  rows.forEach((row, index) => {
    const record = index + 1;
    if (!row || typeof row !== 'object' || Array.isArray(row)) {
      throw new Error(`${name}: example ${record} is not a readable CSV record.`);
    }
    for (const field of REQUIRED_FIELDS) {
      if (!isNonemptyString(row[field])) {
        throw new Error(`${name}: example ${record} has a blank or invalid ${field} value.`);
      }
    }
    if (seen.has(row.case_id)) {
      throw new Error(`${name}: duplicate case ID “${row.case_id}”. Each example must appear once.`);
    }
    seen.add(row.case_id);
    if (Object.hasOwn(row, 'status')) {
      if (row.status !== 'ok') {
        throw new Error(`${name}: case “${row.case_id}” has a status other than ok. Fix the prediction file before comparing.`);
      }
      if (!Object.hasOwn(row, 'error')) {
        throw new Error(`${name}: predictions with a status column must also include an error column.`);
      }
    }
    if (Object.hasOwn(row, 'error') && (typeof row.error !== 'string' || row.error.trim() !== '')) {
      throw new Error(`${name}: case “${row.case_id}” has a prediction error. Fix the prediction file before comparing.`);
    }
  });
}

function correctnessWarnings(rows, name) {
  let contradictions = 0;
  let unreadable = 0;
  for (const row of rows) {
    if (!Object.hasOwn(row, 'correct')) continue;
    const flag = typeof row.correct === 'string' ? row.correct.trim().toLowerCase() : '';
    const supplied = flag === 'true' || flag === '1' ? true : flag === 'false' || flag === '0' ? false : null;
    if (supplied === null) unreadable += 1;
    else if (supplied !== (row.predicted_label === row.true_label)) contradictions += 1;
  }
  const warnings = [];
  if (contradictions) {
    warnings.push(`${name}: ${contradictions.toLocaleString('en-US')} supplied correctness ${contradictions === 1 ? 'flag differs' : 'flags differ'} from the labels. Accuracy is calculated from label equality.`);
  }
  if (unreadable) {
    warnings.push(`${name}: ${unreadable.toLocaleString('en-US')} supplied correctness ${unreadable === 1 ? 'flag could' : 'flags could'} not be read. Accuracy is calculated from label equality.`);
  }
  return warnings;
}

export function parsePredictionCsv(text, methodName = 'Prediction file') {
  if (typeof text !== 'string') throw new Error(`${methodName}: the CSV file could not be read as text.`);
  if (text.length > MAX_CSV_CHARACTERS) {
    throw new Error(`${methodName}: the CSV file exceeds this dashboard’s 10 MB text limit.`);
  }
  const parsed = Papa.parse(text.replace(/^\uFEFF/, ''), {
    header: true,
    delimiter: ',',
    // A delimiter-only record is invalid, rather than a blank line to ignore.
    skipEmptyLines: true,
    dynamicTyping: false,
  });
  const fields = parsed.meta.fields || [];
  const isWhitespaceLine = (row) => row && Object.keys(row).length === 1
    && typeof row[fields[0]] === 'string' && row[fields[0]].trim() === '';
  const errors = parsed.errors.filter((issue) => !(issue.code === 'TooFewFields'
    && isWhitespaceLine(parsed.data[issue.row])));
  if (errors.length) {
    const issue = errors[0];
    const location = Number.isInteger(issue.row) ? ` at example ${issue.row + 1}` : '';
    throw new Error(`${methodName}: malformed CSV${location} (${issue.message}).`);
  }
  if (parsed.meta.renamedHeaders && Object.keys(parsed.meta.renamedHeaders).length) {
    throw new Error(`${methodName}: duplicate CSV column names are not allowed.`);
  }
  const missing = REQUIRED_FIELDS.filter((field) => !fields.includes(field));
  if (missing.length) {
    throw new Error(`${methodName}: missing required CSV ${missing.length === 1 ? 'column' : 'columns'}: ${missing.join(', ')}.`);
  }
  if (fields.includes('status') && !fields.includes('error')) {
    throw new Error(`${methodName}: predictions with a status column must also include an error column.`);
  }
  const rows = parsed.data.filter((row) => !isWhitespaceLine(row));
  validateRows(rows, methodName);
  return { rows, warnings: correctnessWarnings(rows, methodName) };
}

export function joinPredictions(datasets) {
  if (!Array.isArray(datasets) || datasets.length !== METHODS.length) {
    throw new Error('The comparison needs all three prediction files.');
  }
  const byMethod = new Map();
  for (const dataset of datasets) {
    const knownMethod = METHODS.find((method) => method.id === dataset?.method?.id);
    if (!knownMethod || byMethod.has(knownMethod.id)) {
      throw new Error('Each of the three methods must have exactly one prediction file.');
    }
    validateRows(dataset.rows, knownMethod.name);
    byMethod.set(knownMethod.id, dataset);
  }
  const baseline = byMethod.get(METHODS[0].id).rows;
  const maps = new Map(METHODS.map((method) => [
    method.id,
    new Map(byMethod.get(method.id).rows.map((row) => [row.case_id, row])),
  ]));
  for (const method of METHODS.slice(1)) {
    const current = maps.get(method.id);
    if (current.size !== baseline.length || baseline.some((row) => !current.has(row.case_id))) {
      throw new Error(`${method.name}: the case IDs do not match the other files. All three files must describe the same examples.`);
    }
  }
  const categories = [...new Set(baseline.map((row) => row.true_label))].sort();
  const knownCategories = new Set(categories);
  const cases = baseline.map((reference) => {
    const predictions = {};
    const correct = {};
    for (const method of METHODS) {
      const row = maps.get(method.id).get(reference.case_id);
      if (row.text !== reference.text || row.true_label !== reference.true_label) {
        throw new Error(`${method.name}: case “${reference.case_id}” has different text or a different known request type. The comparison cannot mix different examples.`);
      }
      if (!knownCategories.has(row.predicted_label)) {
        throw new Error(`${method.name}: case “${reference.case_id}” predicts an unknown request type “${row.predicted_label}”.`);
      }
      predictions[method.id] = row.predicted_label;
      correct[method.id] = row.predicted_label === reference.true_label;
    }
    return {
      id: reference.case_id,
      text: reference.text,
      trueLabel: reference.true_label,
      predictions,
      correct,
      anyIncorrect: METHODS.some((method) => !correct[method.id]),
      disagree: new Set(Object.values(predictions)).size > 1,
    };
  });
  const warnings = [...new Set(METHODS.flatMap((method) => {
    const dataset = byMethod.get(method.id);
    // Also check direct row fixtures: flags never become the source of metrics.
    return [...(Array.isArray(dataset.warnings) ? dataset.warnings : []), ...correctnessWarnings(dataset.rows, method.name)];
  }))];
  return { cases, categories, warnings };
}

export function summarize(cases) {
  return METHODS.map((method) => {
    const total = cases.length;
    const correct = cases.reduce((count, example) => count + Number(example.predictions[method.id] === example.trueLabel), 0);
    return {
      id: method.id,
      name: method.name,
      shortName: method.shortName,
      total,
      correct,
      incorrect: total - correct,
      accuracy: total ? (correct / total) * 100 : null,
    };
  });
}

export function selectCategory(cases, category = '') {
  return category ? cases.filter((example) => example.trueLabel === category) : cases;
}

export function filterExamples(cases, { view = 'incorrect', search = '' } = {}) {
  const query = String(search).trim().toLowerCase();
  return cases.filter((example) => {
    const matchesView = view === 'all' || (view === 'incorrect' && example.anyIncorrect) || (view === 'disagree' && example.disagree);
    return matchesView && (!query || example.text.toLowerCase().includes(query));
  });
}

export function paginate(cases, page = 1, pageSize = 25) {
  const size = Number.isInteger(pageSize) && pageSize > 0 ? pageSize : 25;
  const total = cases.length;
  const totalPages = Math.ceil(total / size);
  const requested = Number.isFinite(Number(page)) ? Math.trunc(Number(page)) : 1;
  const current = total ? Math.min(totalPages, Math.max(1, requested)) : 1;
  const offset = (current - 1) * size;
  return {
    items: cases.slice(offset, offset + size),
    page: current,
    totalPages,
    total,
    start: total ? offset + 1 : 0,
    end: Math.min(offset + size, total),
  };
}

export function displayCategory(label) {
  const text = String(label).replaceAll('_', ' ');
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : '';
}
