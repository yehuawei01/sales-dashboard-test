import { METHODS, displayCategory } from './model.js';

export function createNode(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

export function createExampleRow(example) {
  const row = createNode('tr');
  const textCell = createNode('td', 'request-cell');
  const mobileTextLabel = createNode('span', 'mobile-label', 'Example');
  mobileTextLabel.setAttribute('aria-hidden', 'true');
  textCell.append(mobileTextLabel, createNode('p', 'request-text', example.text), createNode('p', 'case-id', `Example ${example.id}`));
  row.append(textCell);
  const truthCell = createNode('td', 'truth-cell');
  const truthLabel = createNode('span', 'mobile-label', 'Known request type');
  truthLabel.setAttribute('aria-hidden', 'true');
  truthCell.append(truthLabel, createNode('span', 'known-category', displayCategory(example.trueLabel)));
  row.append(truthCell);
  for (const method of METHODS) {
    const cell = createNode('td', 'prediction-cell');
    const methodLabel = createNode('span', 'mobile-label', method.shortName);
    methodLabel.setAttribute('aria-hidden', 'true');
    const correct = example.correct[method.id];
    cell.append(methodLabel, createNode('span', 'predicted-category', displayCategory(example.predictions[method.id])), createNode('span', `answer-state ${correct ? 'correct' : 'incorrect'}`, correct ? 'Correct' : 'Incorrect'));
    row.append(cell);
  }
  return row;
}
