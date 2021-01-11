export function toCurrency(amount: number) {
    return formatCurrency(amount, '€ ', true, true, true, true);
}

export function formatCurrency(
    amount: number,
    symbol: string,
    roundToWhole: boolean,
    groupDigits: boolean,
    prefixed: boolean,
    exchangeCommas: boolean,
) {
    if (!amount || isNaN(amount)) {
        return roundToWhole ? '€ 0' : '€ 0.00';
    }
    const value = roundToWhole ? Math.round(amount) : amount;
    let result = roundToWhole ? value.toFixed(0) : value.toFixed(2);
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
        if (!roundToWhole) {
            result = result.substring(0, decimalIndex) + ',' + result.substring(decimalIndex + 1);
        }
    }
    return result;
}
