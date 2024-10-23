// const Parser = require('./parser');
const Evaluator = require('./evaluator');

class Calculator {
  constructor() {
    // this.parser = new Parser();
    this.evaluator = new Evaluator();
  }

  evaluate(expression) {
    // const tokens = this.parser.parse(expression);
    
    const tokens = expression.split('')
    
    return this.evaluator.evaluate(tokens);
  }
}

module.exports = Calculator;