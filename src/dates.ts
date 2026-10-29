import type { PortfolioItem } from './types';

const fmt = (ym: string) =>
  ym === 'present'
    ? 'Present'
    : new Date(`${ym}-01T00:00:00`).toLocaleDateString('en', { month: 'short', year: 'numeric' });

export const formatRange = ({ start, end }: Pick<PortfolioItem, 'start' | 'end'>) =>
  end ? `${fmt(start)} – ${fmt(end)}` : fmt(start);
