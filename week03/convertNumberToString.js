/**
 * Convert Number to String
 * @param number 数字
 * @param hex 进制数
 */
function convertNumberToString(myNumber, hex) {
    let integer = Math.floor(myNumber);
    let fraction= String(myNumber).match(/\.\d+$/);
    if (fraction) {
        fraction = fraction[0].replace('', '');
    }
    let result= '';
    while (integer > 0) {
        result = String(integer % hex) + result;
        integer = Math.floor(integer / hex);
    }
    return fraction ? `${result}.${fraction}` : result;
}