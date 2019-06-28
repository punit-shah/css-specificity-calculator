const calculateSpecificity = require('./index');

test('universal selector', () => {
  expect(calculateSpecificity('*')).toBe(0);
});

test('an element', () => {
  expect(calculateSpecificity('p')).toBe(1);
});

test('a class', () => {
  expect(calculateSpecificity('.class')).toBe(10);
});

test('an id', () => {
  expect(calculateSpecificity('#id')).toBe(100);
});

test('a class and two elements', () => {
  expect(calculateSpecificity('div.warning p')).toBe(12);
});

test('an id and two elements', () => {
  expect(calculateSpecificity('div#caution p')).toBe(102);
});

test('an id, a class and two elements', () => {
  expect(calculateSpecificity('body#home .container p')).toBe(112);
});

test('two ids, a class and three elements', () => {
  expect(calculateSpecificity('body#home div#featured p.text')).toBe(213);
});

test('an element and a pseudo-element', () => {
  expect(calculateSpecificity('p::first-line')).toBe(2);
});

test('two elements', () => {
  expect(calculateSpecificity('ul li')).toBe(2);
});

test('a class and a pseudo-class', () => {
  expect(calculateSpecificity('.link:hover')).toBe(20);
});

test('two classes', () => {
  expect(calculateSpecificity('.link.active')).toBe(20);
});

test('selectors inside :not() nested pseudo-class', () => {
  expect(calculateSpecificity(':not(.active):not(button)')).toBe(11);
});

test('an attribute and two elements', () => {
  expect(calculateSpecificity('select option[selected="true"]')).toBe(12);
});

test('operators do not add to specificity', () => {
  const expectedSpecificity = 2;
  expect(calculateSpecificity('p span')).toBe(expectedSpecificity);
  expect(calculateSpecificity('p + span')).toBe(expectedSpecificity);
  expect(calculateSpecificity('p > span')).toBe(expectedSpecificity);
});

test('throws an error if multiple selectors are provided', () => {
  expect(() => calculateSpecificity('a, a:visited')).toThrow();
});

test('throws an error if multiple selectors are passed to :not()', () => {
  expect(() => calculateSpecificity('body :not(.crazy, .fancy)')).toThrow();
});
