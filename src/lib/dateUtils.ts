/**
 * Utility functions for date formatting across the application.
 * - Display format: DD/MM/YY (e.g. 24/07/26)
 * - Supabase standard storage format: YYYY-MM-DD
 */

export function formatDisplayDate(dateInput: string | Date | null | undefined, shortYear: boolean = true): string {
  if (!dateInput) return 'N/A';
  
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return String(dateInput);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const fullYear = String(date.getFullYear());
  const year = shortYear ? fullYear.slice(-2) : fullYear;

  return `${day}/${month}/${year}`;
}

export function formatSupabaseDate(dateInput: string | Date): string {
  if (!dateInput) return new Date().toISOString().split('T')[0];

  if (typeof dateInput === 'string') {
    // Check if input is in DD/MM/YYYY format
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateInput)) {
      const [d, m, y] = dateInput.split('/');
      return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
    }
    // Check if input is in DD/MM/YY format
    if (/^\d{2}\/\d{2}\/\d{2}$/.test(dateInput)) {
      const [d, m, y] = dateInput.split('/');
      const fullYear = Number(y) > 50 ? `19${y}` : `20${y}`;
      return `${fullYear}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
    }
    // If it's already YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateInput)) {
      return dateInput;
    }
  }

  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return new Date().toISOString().split('T')[0];

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function getDaysRemaining(expiryDateStr: string | Date | null | undefined): number {
  if (!expiryDateStr) return 0;
  const expiry = typeof expiryDateStr === 'string' ? new Date(expiryDateStr) : expiryDateStr;
  if (isNaN(expiry.getTime())) return 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  expiry.setHours(0, 0, 0, 0);
  const diffTime = expiry.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
