const Addition = require('./operations/addition');
const Subtraction = require('./operations/subtraction');
const Multiplication = require('./operations/multiplication');
const Division = require('./operations/division');
const Exponentiation = require('./operations/exponentiation')

class Evaluator {
  constructor() {
    this.operators = {
      '+': { precedence: 1, operation: new Addition() },
      '-': { precedence: 1, operation: new Subtraction() },
      '*': { precedence: 2, operation: new Multiplication() },
      '/': { precedence: 2, operation: new Division() },
      '^': { precedence: 3, operation: new Exponentiation() },
      '(': { precedence: 0 },  
    };
  }
  validateTokens(tokens) {
    let openBrackets = 0;
    let lastToken = null;

    tokens.forEach((token, i) => {
      if (isNaN(token) && !this.operators[token] && token !== '(' && token !== ')') {
        throw new Error(`Недопустимый символ: "${token}"`);
      }

      if (token === '(') {
        openBrackets++;
      } else if (token === ')') {
        openBrackets--;
        if (openBrackets < 0) {
          throw new Error('Лишняя закрывающая скобка');
        }
      }
      if (this.operators[token] && token !== '(' && token !== ')') {
        if (lastToken === null || this.operators[lastToken] || lastToken === '(') {
          if (token !== '-' && token !== '+') {
            throw new Error(`Неправильное использование оператора "${token}"`);
          }
        }
      }

      lastToken = token;
    });

    if (openBrackets > 0) {
      throw new Error('Лишняя открывающая скобка');
    }

    if (this.operators[lastToken] && lastToken !== ')') {
      throw new Error('Выражение не должно завершаться оператором');
    }
  }

  evaluate(tokens) {
    tokens = tokens.filter(i => i !== ' ');  
    this.validateTokens(tokens);

    let stack = [];
    let operatorStack = [];
    let lastToken = null;

    tokens.forEach((token, index) => {
      if (!isNaN(token)) {
        stack.push(parseFloat(token));
        lastToken = token;
      } else if (token === '(') {
        operatorStack.push(token);
        lastToken = token;
      } else if (token === ')') {
        while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
          let operator = this.operators[operatorStack.pop()].operation;
          let b = stack.pop();
          let a = stack.pop();
          stack.push(operator.evaluate(a, b));
        }
        operatorStack.pop();
        lastToken = token;
      } else if (this.operators[token]) {
        if ((token === '-' || token === '+') && (lastToken === null || lastToken === '(' || this.operators[lastToken])) {
          if (token === '-') {
            tokens[index + 1] = -tokens[index + 1]; 
          }
        } else {
          while (
            operatorStack.length > 0 &&
            this.operators[operatorStack[operatorStack.length - 1]] &&
            this.operators[operatorStack[operatorStack.length - 1]].precedence >= this.operators[token].precedence
          ) {
            let operator = this.operators[operatorStack.pop()].operation;
            let b = stack.pop();
            let a = stack.pop();
            stack.push(operator.evaluate(a, b));
          }
          operatorStack.push(token);
        }
        lastToken = token;
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