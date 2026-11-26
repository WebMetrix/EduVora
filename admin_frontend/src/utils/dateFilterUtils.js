const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * Parse various mock / picker date formats into a normalized midnight Date:
 * - "dd/mm/yyyy" or "dd-mm-yyyy"
 * - "31 Aug 2026" or "31 Aug 2026, 10:24 AM"
 */
export function parseFlexibleDate(value) {
  if (!value || value === '-') return null;
  if (value instanceof Date) {
    return Number.isNaN(value.getTime())
      ? null
      : new Date(value.getFullYear(), value.getMonth(), value.getDate());
  }

  const str = String(value).trim();

  // dd/mm/yyyy or dd-mm-yyyy
  const numericMatch = str.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/);
  if (numericMatch) {
    const day = Number(numericMatch[1]);
    const month = Number(numericMatch[2]) - 1;
    const year = Number(numericMatch[3]);
    const parsed = new Date(year, month, day);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  // "31 Aug 2026..."
  const textMatch = str.match(/(\d{1,2})\s+([A-Za-z]{3})\s+(\d{4})/);
  if (textMatch) {
    const day = Number(textMatch[1]);
    const month = MONTHS_SHORT.findIndex(
      (m) => m.toLowerCase() === textMatch[2].toLowerCase()
    );
    const year = Number(textMatch[3]);
    if (month >= 0) {
      return new Date(year, month, day);
    }
  }

  const fallback = new Date(str);
  return Number.isNaN(fallback.getTime())
    ? null
    : new Date(fallback.getFullYear(), fallback.getMonth(), fallback.getDate());
}

/**
 * Format a Date object as "01 Oct 2026".
 */
export function formatDisplayDate(date) {
  if (!date) return '';
  const d = parseFlexibleDate(date);
  if (!d) return '';
  const day = String(d.getDate()).padStart(2, '0');
  const month = MONTHS_SHORT[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

/**
 * Format a { startDate, endDate } range as "01 Oct 2026 - 31 Oct 2026".
 */
export function formatDateRangeLabel(range, placeholder = 'Select date range') {
  if (!range || (!range.startDate && !range.endDate)) return placeholder;
  if (range.startDate && range.endDate) {
    return `${formatDisplayDate(range.startDate)} - ${formatDisplayDate(range.endDate)}`;
  }
  return formatDisplayDate(range.startDate || range.endDate);
}

/**
 * Check whether a target date string falls inside an optional { fromDate, toDate }
 * or { startDate, endDate } filter range (inclusive).
 */
export function isDateWithinRange(dateValue, rangeFilter) {
  if (!rangeFilter) return true;
  const startRaw = rangeFilter.startDate ?? rangeFilter.fromDate;
  const endRaw = rangeFilter.endDate ?? rangeFilter.toDate;

  if (!startRaw && !endRaw) return true;

  const target = parseFlexibleDate(dateValue);
  if (!target) return true;

  const start = parseFlexibleDate(startRaw);
  const end = parseFlexibleDate(endRaw);

  if (start && target < start) return false;
  if (end && target > end) return false;
  return true;
}
