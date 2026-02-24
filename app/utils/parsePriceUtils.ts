function roundPrice(price: number): string {
    let result = Math.round((price - Math.trunc(price)) * 100);
    if (result < 10) {
        return "0"+result.toString();
    }
    return result.toString();
}

export function parsePrice(price: number, separator: string): string {
    return Math.trunc(price) + separator + roundPrice(price);
}