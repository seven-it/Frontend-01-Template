function convertStringToNumber(myString, hex = 10) {
    if (hex > 10) {
      return;
    }
    let flag = /e|E/.test(myString);
    if (!flag) {
      let chars = myString.split('');
      let number = 0;
      let i = 0;
      while (i < chars.length && chars[i] !== '.') {
        number = number * hex;
        number += chars[i].codePointAt(0) - '0'.codePointAt(0);
        i++;
      }
      if (chars[i] === '.') {
        i++;
      }
      let fraction = 1;
      while (i < chars.length) {
        fraction /= hex;
        number += (chars[i].codePointAt(0) - '0'.codePointAt(0)) * fraction;
        i++;
      }
      return number;
    } else {
      let logNumber = Number(myString.match(/\d+$/)[0]);
      let number = myString.match(/^[\d\.]+/)[0].replace(/\./, '');
      if (/e-|E-/.test(myString)) {
        return Number(number.padEnd(logNumber + 1, 0));
      } else {
        return Number(number.padStart(logNumber + number.length, 0).replace(/^0/, '0.'));
      }
    }
  }