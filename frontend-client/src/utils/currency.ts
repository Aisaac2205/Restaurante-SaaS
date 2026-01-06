/**
 * Formats a number as Guatemalan Quetzales (Q.)
 */
export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-GT', {
        style: 'currency',
        currency: 'GTQ',
        minimumFractionDigits: 2
    }).format(amount);
}
