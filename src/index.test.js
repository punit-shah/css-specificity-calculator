import calculateSpecificity from './index';

test('universal selector', () => {
  expect(calculateSpecificity('*')).toStrictEqual([0, 0, 0]);
});

test('an element', () => {
  expect(calculateSpecificity('p')).toStrictEqual([0, 0, 1]);
});

test('a class', () => {
  expect(calculateSpecificity('.class')).toStrictEqual([0, 1, 0]);
});

test('an id', () => {
  expect(calculateSpecificity('#id')).toStrictEqual([1, 0, 0]);
});

test('a class and two elements', () => {
  expect(calculateSpecificity('div.warning p')).toStrictEqual([0, 1, 2]);
});

test('an id and two elements', () => {
  expect(calculateSpecificity('div#caution p')).toStrictEqual([1, 0, 2]);
});

test('an id, a class and two elements', () => {
  expect(calculateSpecificity('body#home .container p')).toStrictEqual([ 1, 1, 2 ]);
});

test('two ids, a class and three elements', () => {
  expect(calculateSpecificity('body#home div#featured p.text')).toStrictEqual([ 2, 1, 3 ]);
});

test('an element and a pseudo-element', () => {
  expect(calculateSpecificity('p::first-line')).toStrictEqual([0, 0, 2]);
});

test('two elements', () => {
  expect(calculateSpecificity('ul li')).toStrictEqual([0, 0, 2]);
});

test('a class and a pseudo-class', () => {
  expect(calculateSpecificity('.link:hover')).toStrictEqual([0, 2, 0]);
});

test('two classes', () => {
  expect(calculateSpecificity('.link.active')).toStrictEqual([0, 2, 0]);
});

test('selectors inside :not() nested pseudo-class', () => {
  expect(calculateSpecificity(':not(.active):not(button)')).toStrictEqual([0, 1, 1]);
});

test('an attribute and two elements', () => {
  expect(calculateSpecificity('select option[selected="true"]')).toStrictEqual([0, 1, 2]);
});

test('operators do not add to specificity', () => {
  const expectedSpecificity = [0, 0, 2];
  expect(calculateSpecificity('p span')).toStrictEqual(expectedSpecificity);
  expect(calculateSpecificity('p + span')).toStrictEqual(expectedSpecificity);
  expect(calculateSpecificity('p > span')).toStrictEqual(expectedSpecificity);
});

test('throws an error if multiple selectors are provided', () => {
  expect(() => calculateSpecificity('a, a:visited')).toThrow();
});

test('throws an error if multiple selectors are passed to :not()', () => {
  expect(() => calculateSpecificity('body :not(.crazy, .fancy)')).toThrow();
});
