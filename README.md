# css-specificity-calculator

Calculates the specificity of a given CSS selector.

## Usage

```js
import calculateSpecificity from 'css-specificity-calculator';

calculateSpecificity('ul#nav li.nav-item::before'); // [1, 1, 3]
```
