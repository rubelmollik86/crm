
import { format, parseISO, isValid } from 'date-fns';

// Format a date string to a readable format
export const formatDate = (dateString, formatStr = 'MMM d, yyyy') => {
  if (!dateString) return 'N/A';
  
  const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
  
  if (!isValid(date)) return 'Invalid date';
  
  return format(date, formatStr);
};

// Format a date range (start and end dates)
export const formatDateRange = (startDateString, endDateString) => {
  const startDate = formatDate(startDateString, 'MMM d');
  const endDate = formatDate(endDateString, 'MMM d, yyyy');
  
  return `${startDate} - ${endDate}`;
};

// Calculate duration in days between two dates
export const calculateDuration = (startDateString, endDateString) => {
  if (!startDateString || !endDateString) return 0;
  
  const startDate = parseISO(startDateString);
  const endDate = parseISO(endDateString);
  
  if (!isValid(startDate) || !isValid(endDate)) return 0;
  
  const durationMs = endDate.getTime() - startDate.getTime();
  return Math.ceil(durationMs / (1000 * 60 * 60 * 24));
};

// Get current date in ISO format
export const getCurrentDateISO = () => {
  return new Date().toISOString();
};

// Format a date for input fields (YYYY-MM-DD)
export const formatDateForInput = (dateString) => {
  if (!dateString) return '';
  
  const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
  
  if (!isValid(date)) return '';
  
  return format(date, 'yyyy-MM-dd');
};
