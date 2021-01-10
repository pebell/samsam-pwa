export function toCurrency(amount: number) {
    return formatCurrency(amount, '€ ', true, true, true);
}

export function formatCurrency(amount: number, symbol: string, groupDigits: boolean, prefixed: boolean, exchangeCommas: boolean) {
    if (!amount || isNaN(amount)) {
        return '€ 0.00';
    }
    let result = amount.toFixed(2);
    if (groupDigits) {
        result = result.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
    }
    if (prefixed) {
        result = symbol + result;
    } else {
        result = result + symbol;
    }
    if (exchangeCommas) {
        const decimalIndex = result.lastIndexOf('.');
        result = result.replace(',', '.');
        result = result.substring(0, decimalIndex) + ',' + result.substring(decimalIndex + 1);
    }
    return result;
}
