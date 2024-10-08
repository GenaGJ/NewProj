const readline = require('readline');
const Calculator = require('./calculator');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const calculator = new Calculator();

rl.question('Введите пример : ', (input) => {
  try {
    const result = calculator.evaluate(input);
    console.log(`Результат : ${result}`);
  } catch (err) {
    console.log('Error: Недопустимое выражение');
  }
  rl.close();
});