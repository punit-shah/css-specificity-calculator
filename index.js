const { parse } = require('css-selector-tokenizer');

const categoriseSelectorNodes = (nodes) =>
  nodes
    .map((node) => {
      switch (node.type) {
        case 'universal':
        case 'spacing':
        case 'operator':
          return;
        case 'element':
        case 'pseudo-element':
          return 'element';
        case 'class':
        case 'pseudo-class':
        case 'attribute':
          return 'class';
        case 'id':
          return 'id';
        case 'nested-pseudo-class':
          if (node.nodes.length > 1) {
            throw Error(
              `Too many selectors inside nested pseudo-class ${node.name}`
            );
          }
          return categoriseSelectorNodes(node.nodes[0].nodes);
        default:
          throw Error(
            `Unrecognised selector node type: ${node.type} - ${node.name ||
              node.content}`
          );
      }
    })
    .reduce(
      // flatten
      (previous, current) => (current ? previous.concat(current) : previous),
      []
    );

const specificityFromSelectorNodes = (nodes) =>
  categoriseSelectorNodes(nodes).reduce(
    (previous, current) => ({
      ...previous,
      [current]: (previous[current] || 0) + 1
    }),
    {}
  );

const calculateSpecificity = (selector) => {
  const parsed = parse(selector);

  if (parsed.nodes.length > 1) throw Error('Too many selectors.');

  const selectorNode = parsed.nodes[0];
  if (selectorNode.type !== 'selector') throw Error('Not a selector.');

  return specificityFromSelectorNodes(selectorNode.nodes);
};

module.exports = calculateSpecificity;
