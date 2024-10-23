class Exponentiation {
    evaluate(a, b) {
        let summ = a
        while(b > 1){
            b = b - 1
            summ = (summ * a)
        }
      return summ
    }
  }
  
  module.exports = Exponentiation;