// Formatting helpers shared by the previews
export const formatCurrency = (value) => {
  const numericValue = Number.parseFloat(value);
  const safeValue = Number.isFinite(numericValue) ? numericValue : 0;

  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(safeValue);
};

export const formatDate = (value) => {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('fr-FR');
};
