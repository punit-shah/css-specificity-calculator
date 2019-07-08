const calculateSpecificity = require('./index');

test('universal selector', () => {
  expect(calculateSpecificity('*')).toStrictEqual({});
});

test('an element', () => {
  expect(calculateSpecificity('p')).toStrictEqual({ element: 1 });
});

test('a class', () => {
  expect(calculateSpecificity('.class')).toStrictEqual({ class: 1 });
});

test('an id', () => {
  expect(calculateSpecificity('#id')).toStrictEqual({ id: 1 });
});

test('a class and two elements', () => {
  expect(calculateSpecificity('div.warning p')).toStrictEqual({ class: 1, element: 2 });
});

test('an id and two elements', () => {
  expect(calculateSpecificity('div#caution p')).toStrictEqual({ id: 1, element: 2 });
});

test('an id, a class and two elements', () => {
  expect(calculateSpecificity('body#home .container p')).toStrictEqual({ id: 1, class: 1, element: 2 });
});

test('two ids, a class and three elements', () => {
  expect(calculateSpecificity('body#home div#featured p.text')).toStrictEqual({ id: 2, class: 1, element: 3 });
});

test('an element and a pseudo-element', () => {
  expect(calculateSpecificity('p::first-line')).toStrictEqual({ element: 2 });
});

test('two elements', () => {
  expect(calculateSpecificity('ul li')).toStrictEqual({ element: 2 });
});

test('a class and a pseudo-class', () => {
  expect(calculateSpecificity('.link:hover')).toStrictEqual({ class: 2 });
});

test('two classes', () => {
  expect(calculateSpecificity('.link.active')).toStrictEqual({ class: 2 });
});

test('selectors inside :not() nested pseudo-class', () => {
  expect(calculateSpecificity(':not(.active):not(button)')).toStrictEqual({ class: 1, element: 1 });
});

test('an attribute and two elements', () => {
  expect(calculateSpecificity('select option[selected="true"]')).toStrictEqual({ class: 1, element: 2 });
});

test('operators do not add to specificity', () => {
  const expectedSpecificity = { element: 2 };
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
