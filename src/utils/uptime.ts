export const PORTFOLIO_START_DATE = '2026-06-15T00:00:00';
export const PORTFOLIO_START_DISPLAY_DATE = '15 June 2026';

export function getPortfolioUptime(): string {
  const start = new Date(PORTFOLIO_START_DATE);
  const now = new Date();
  const diffMs = now.getTime() - start.getTime();
  if (diffMs <= 0) return '0 mins';

  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  // Calculate year, month, date diffs
  const startYear = start.getFullYear();
  const startMonth = start.getMonth();
  const startDate = start.getDate();

  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth();
  const nowDate = now.getDate();

  let months = (nowYear - startYear) * 12 + (nowMonth - startMonth);
  let days = nowDate - startDate;

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(nowYear, nowMonth, 0);
    days += prevMonth.getDate();
  }

  const weeks = Math.floor(diffDays / 7);

  if (months > 0) {
    return `${months} month${months > 1 ? 's' : ''}${days > 0 ? `, ${days} day${days > 1 ? 's' : ''}` : ''}`;
  }
  if (weeks > 0) {
    const remDays = diffDays % 7;
    return `${weeks} week${weeks > 1 ? 's' : ''}${remDays > 0 ? `, ${remDays} day${remDays > 1 ? 's' : ''}` : ''}`;
  }
  return `${diffDays} day${diffDays > 1 ? 's' : ''}`;
}
