// Salary Formatter - Convert to Indian currency format
export const formatSalary = (amount) => {
  if (!amount) return '₹0';
  return `₹${amount.toLocaleString('en-IN')}`;
};

// Distance Formatter - Convert meters to appropriate unit
export const formatDistance = (meters) => {
  if (!meters) return '0 m';
  
  if (meters >= 1000) {
    const km = (meters / 1000).toFixed(1);
    return `${km} km`;
  }
  
  return `${meters} m`;
};

// Date Formatter - Format timestamp to readable format
export const formatDate = (timestamp) => {
  if (!timestamp) return '';
  
  const date = new Date(timestamp);
  return date.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};