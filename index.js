const { parse } = require('css-selector-tokenizer');

const specificityFromSelectorNodes = (nodes) =>
  nodes
    .map((node) => {
      switch (node.type) {
        case 'universal':
        case 'spacing':
        case 'operator':
          return 0;
        case 'element':
        case 'pseudo-element':
          return 1;
        case 'class':
        case 'pseudo-class':
        case 'attribute':
          return 10;
        case 'id':
          return 100;
        case 'nested-pseudo-class':
          if (node.nodes.length > 1) {
            throw Error(
              `Too many selectors inside nested pseudo-class ${node.name}`
            );
          }
          return specificityFromSelectorNodes(node.nodes[0].nodes);
        default:
          throw Error(
            `Unrecognised selector node type: ${node.type} - ${node.name ||
              node.content}`
          );
      }
    })
    .reduce((previous, current) => previous + current, 0);

const calculateSpecificity = (selector) => {
  const parsed = parse(selector);

  if (parsed.nodes.length > 1) throw Error('Too many selectors.');

  const selectorNode = parsed.nodes[0];
  if (selectorNode.type !== 'selector') throw Error('Not a selector.');

  return specificityFromSelectorNodes(selectorNode.nodes);
};

module.exports = calculateSpecificity;
