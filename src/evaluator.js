const Addition = require('./operations/addition');
const Subtraction = require('./operations/subtraction');
const Multiplication = require('./operations/multiplication');
const Division = require('./operations/division');

class Evaluator {
  constructor() {
    this.operators = {
      '+': { precedence: 1, operation: new Addition() },
      '-': { precedence: 1, operation: new Subtraction() },
      '*': { precedence: 2, operation: new Multiplication() },
      '/': { precedence: 2, operation: new Division() },
    };
  }

  evaluate(tokens) {
    let stack = [];
    let operatorStack = [];

    tokens.forEach(token => {
      if (!isNaN(token)) {
        stack.push(parseFloat(token));
      } else if (this.operators[token]) {
        while (
          operatorStack.length > 0 &&
          this.operators[operatorStack[operatorStack.length - 1]].precedence >= this.operators[token].precedence
        ) {
          let operator = this.operators[operatorStack.pop()].operation;
          let b = stack.pop();
          let a = stack.pop();
          stack.push(operator.evaluate(a, b));
        }
        operatorStack.push(token);
      }
    });

    while (operatorStack.length > 0) {
      let operator = this.operators[operatorStack.pop()].operation;
      let b = stack.pop();
      let a = stack.pop();
      stack.push(operator.evaluate(a, b));
    }

    return stack.pop();
  }
}

module.exports = Evaluator;