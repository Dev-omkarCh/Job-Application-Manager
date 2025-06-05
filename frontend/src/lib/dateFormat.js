import { format, isToday, isYesterday } from 'date-fns';

export function formatUpdatedAt(dateString) {
  const date = new Date(dateString);

  if (isToday(date)) {
    return `Today · ${format(date, 'hh:mm a')}`;
  }

  if (isYesterday(date)) {
    return `Yesterday · ${format(date, 'hh:mm a')}`;
  }

  return format(date, 'MMMM d, yyyy · hh:mm a'); // e.g. June 2, 2025 · 08:45 AM
}
