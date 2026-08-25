// Hand-drawn stroke marks, one per industry. Geometric on purpose — they anchor the
// work list for scanning, they are not illustrations.
export const SECTOR_ICONS: Record<string, string[]> = {
  people: [
    'M9 12a3.4 3.4 0 1 0 0-6.8 3.4 3.4 0 0 0 0 6.8Z',
    'M3.5 20v-1.6A3.9 3.9 0 0 1 7.4 14.5h3.2a3.9 3.9 0 0 1 3.9 3.9V20',
    'M15.2 5.6a3.4 3.4 0 0 1 0 6',
    'M17 20v-1.6a3.9 3.9 0 0 0-2.2-3.5'
  ],
  helix: [
    'M8 3c0 5 8 6 8 9s-8 4-8 9',
    'M16 3c0 5-8 6-8 9s8 4 8 9',
    'M9.4 7h5.2',
    'M8 12h8',
    'M9.4 17h5.2'
  ],
  book: [
    'M4 5.6A1.6 1.6 0 0 1 5.6 4H11v15.5H5.6A1.6 1.6 0 0 0 4 21Z',
    'M20 5.6A1.6 1.6 0 0 0 18.4 4H13v15.5h5.4A1.6 1.6 0 0 1 20 21Z'
  ],
  bank: [
    'M3 9.5 12 4l9 5.5',
    'M5.5 11v6.5',
    'M9.8 11v6.5',
    'M14.2 11v6.5',
    'M18.5 11v6.5',
    'M3.5 20h17'
  ],
  document: [
    'M6.5 3H14l4 4v14H6.5Z',
    'M14 3v4h4',
    'M9.5 12h5',
    'M9.5 16h3.5'
  ]
};
