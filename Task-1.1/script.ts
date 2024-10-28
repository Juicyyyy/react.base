type NumberSystem = 'decimal' | 'binary' | 'hexadecimal';

function convertToDecimal(value: string, system: NumberSystem): number {
    switch (system) {
        case 'decimal':
            return parseFloat(value);
        case 'binary':
            return parseInt(value, 2);
        case 'hexadecimal':
            return parseInt(value, 16);
        default:
            throw new Error('Неверная система счисления');
    }
}

function convertFromDecimal(value: number, system: NumberSystem): string {
    switch (system) {
        case 'decimal':
            return value.toString();
        case 'binary':
            return value.toString(2);
        case 'hexadecimal':
            return value.toString(16).toUpperCase();
        default:
            throw new Error('Неверная система счисления');
    }
}

function add(a: string, b: string, system: NumberSystem): string {
    const num1 = convertToDecimal(a, system);
    const num2 = convertToDecimal(b, system);
    const sum = num1 + num2;
    return convertFromDecimal(sum, system);
}

function subtract(a: string, b: string, system: NumberSystem): string {
    const num1 = convertToDecimal(a, system);
    const num2 = convertToDecimal(b, system);
    const difference = num1 - num2;
    return convertFromDecimal(difference, system);
}

function multiply(a: string, b: string, system: NumberSystem): string {
    const num1 = convertToDecimal(a, system);
    const num2 = convertToDecimal(b, system);
    const multiplication = num1 * num2;
    return convertFromDecimal(multiplication, system);
}

function divide(a: string, b: string, system: NumberSystem): string {
    const num1 = convertToDecimal(a, system);
    const num2 = convertToDecimal(b, system);
    if (num2 === 0) {
        throw new Error('Деление на ноль');
    }
    const division = num1 / num2;
    return convertFromDecimal(division, system);
}

console.log('Десятичная система:');
console.log('9 + 3 =', add('9', '3', 'decimal'));
console.log('9 - 3 =', subtract('9', '3', 'decimal'));
console.log('9 * 3 =', multiply('9', '3', 'decimal'));
console.log('9 / 3 =', divide('9', '3', 'decimal'));

console.log('\nДвоичная система:');
console.log('101 + 11 =', add('101', '11', 'binary'));
console.log('101 - 11 =', subtract('101', '11', 'binary'));
console.log('101 * 11 =', multiply('101', '11', 'binary'));
console.log('101 / 11 =', divide('101', '11', 'binary'));

console.log('\nШестнадцатеричная система:');
console.log('A + 2 =', add('A', '2', 'hexadecimal'));
console.log('A - 2 =', subtract('A', '2', 'hexadecimal'));
console.log('A * 2 =', multiply('A', '2', 'hexadecimal'));
console.log('A / 2 =', divide('A', '2', 'hexadecimal'));