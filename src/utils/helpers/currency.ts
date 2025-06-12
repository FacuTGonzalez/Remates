export function formatCurrency(value: string | number): string {
    const number = typeof value === "string" ? parseFloat(value) : value;
  
    if (isNaN(number)) return "$0.00";
  
    return `$${number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  }
  