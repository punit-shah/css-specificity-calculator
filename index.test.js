const calculate = require('./index');

test('universal selector', () => {
  expect(calculate('*')).toBe(0);
});

test('an element', () => {
  expect(calculate('p')).toBe(1);
});

test('a class', () => {
  expect(calculate('.class')).toBe(10);
});

test('an id', () => {
  expect(calculate('#id')).toBe(100);
});

test('a class and two elements', () => {
  expect(calculate('div.warning p')).toBe(12);
});

test('an id and two elements', () => {
  expect(calculate('div#caution p')).toBe(102);
});

test('an id, a class and two elements', () => {
  expect(calculate('body#home .container p')).toBe(112);
});

test('two ids, a class and three elements', () => {
  expect(calculate('body#home div#featured p.text')).toBe(213);
});

test('an element and a pseudo-element', () => {
  expect(calculate('p::first-line')).toBe(2);
});

test('two elements', () => {
  expect(calculate('ul li')).toBe(2);
});

test('a class and a pseudo-class', () => {
  expect(calculate('.link:hover')).toBe(20);
});

test('two classes', () => {
  expect(calculate('.link.active')).toBe(20);
});

test('selectors inside :not() nested pseudo-class', () => {
  expect(calculate(':not(.active):not(button)')).toBe(11);
});

test('an attribute and two elements', () => {
  expect(calculate('select option[selected="true"]')).toBe(12);
});

test('operators do not add to specificity', () => {
  const expectedSpecificity = 2;
  expect(calculate('p span')).toBe(expectedSpecificity);
  expect(calculate('p + span')).toBe(expectedSpecificity);
  expect(calculate('p > span')).toBe(expectedSpecificity);
});

test('throws an error if multiple selectors are provided', () => {
  expect(() => calculate('a, a:visited')).toThrow();
});

test('throws an error if multiple selectors are passed to :not()', () => {
  expect(() => calculate('body :not(.crazy, .fancy)')).toThrow();
});
