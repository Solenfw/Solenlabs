// Available time ranges

export const TIME_RANGES = {
  HOUR: 'hour',
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month'
} as const;

// Available magnitude thresholds
export const MAG_THRESHOLDS = {
  ALL: 'all',
  M1: '1.0',
  M2_5: '2.5',
  M4_5: '4.5',
  SIGNIFICANT: 'significant'
} as const;