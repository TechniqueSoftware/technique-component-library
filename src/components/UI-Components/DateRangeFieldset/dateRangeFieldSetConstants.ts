import * as moment from 'moment';

const DAYS = 'days';
const DAY = 'day';
const WEEK = 'week';
const MONTH = 'month';
const YEAR = 'year';

export const CUSTOM_DATE_RANGE_VALUE = 'custom';

export interface DateRangeOption {
  value: string;
  label: string;
  calculateDateRange?: (today: moment.Moment) => { start: moment.Moment; end: moment.Moment };
  sortPriority: number;
}

export interface DateRangeObject {
  [name: string]: DateRangeOption;
}

export const allDateRangeOptions: DateRangeObject = {

  yesterdayOption: {
    value: 'yesterday',
    label: 'Yesterday',
    calculateDateRange: (today: moment.Moment) => {
      const yesterday = today.clone().subtract(1, DAYS).startOf(DAY);
      return { start: yesterday, end: yesterday };
    },
    sortPriority: 20
  },

  thisWeekOption: {
    value: 'thisWeek',
    label: 'This Week',
    calculateDateRange: (today: moment.Moment) => {
      const startOfWeek = today.clone().week(today.week()).startOf(WEEK).startOf(DAY);
      const endOfWeek = startOfWeek.clone().endOf(WEEK).startOf(DAY);
      return { start: startOfWeek, end: endOfWeek };
    },
    sortPriority: 30
  },

  lastWeekOption: {
    value: 'lastWeek',
    label: 'Last Week',
    calculateDateRange: (today: moment.Moment) => {
      const startOfLastWeek = today.clone().week(today.week() - 1).startOf(WEEK).startOf(DAY);
      const endOfWeek = startOfLastWeek.clone().endOf(WEEK).startOf(DAY);
      return { start: startOfLastWeek, end: endOfWeek };
    },
    sortPriority: 40
  },

  thisMonthOption: {
    value: 'thisMonth',
    label: 'This Month',
    calculateDateRange: (today: moment.Moment) => {
      const startOfThisMonth = today.clone().month(today.month()).startOf(MONTH).startOf(DAY);
      const endOfThisMonth = startOfThisMonth.clone().endOf(MONTH).startOf(DAY);
      return { start: startOfThisMonth, end: endOfThisMonth };
    },
    sortPriority: 50
  },

  lastMonthOption: {
    value: 'lastMonth',
    label: 'Last Month',
    calculateDateRange: (today: moment.Moment) => {
      const startOfLastMonth = today.clone().month(today.month() - 1).startOf(MONTH).startOf(DAY);
      const endOfLastMonth = startOfLastMonth.clone().endOf(MONTH).startOf(DAY);
      return { start: startOfLastMonth, end: endOfLastMonth };
    },
    sortPriority: 60
  },

  thisYearOption: {
    value: 'thisYear',
    label: 'This Year',
    calculateDateRange: (today: moment.Moment) => {
      const startOfThisYear = today.clone().year(today.year()).startOf(YEAR).startOf(DAY);
      const endOfThisYear = startOfThisYear.clone().endOf(YEAR).startOf(DAY);
      return { start: startOfThisYear, end: endOfThisYear };
    },
    sortPriority: 70
  },

  lastYearOption: {
    value: 'lastYear',
    label: 'Last Year',
    calculateDateRange: (today: moment.Moment) => {
      const startOfLastYear = today.clone().year(today.year() - 1).startOf(YEAR).startOf(DAY);
      const endOfLastYear = startOfLastYear.clone().endOf(YEAR).startOf(DAY);
      return { start: startOfLastYear, end: endOfLastYear };
    },
    sortPriority: 80
  },

  textCampaignAllTimeOption: {
    value: 'textAllTime',
    label: 'All Time',
    calculateDateRange: (today: moment.Moment) => {
      const startOfAllTime = moment.default('01-01-2018', 'MM-DD-YYYY');
      return { start: startOfAllTime, end: today };
    },
    sortPriority: 90
  },

  emailCampaignAllTimeOption: {
    value: 'emailAllTime',
    label: 'All Time',
    calculateDateRange: (today: moment.Moment) => {
      const firstDayOfMonthNineMonthsAgo = today.clone().month(today.month() - 9).startOf(MONTH);
      const todayDate = today.clone();
      return { start: firstDayOfMonthNineMonthsAgo, end: todayDate };
    },
    sortPriority: 90
  },

  customOption: {
    value: CUSTOM_DATE_RANGE_VALUE,
    label: 'Custom',
    sortPriority: 100
  }
};

const genericDateRangeOptions: DateRangeOption[] = [
  allDateRangeOptions.yesterdayOption,
  allDateRangeOptions.thisWeekOption,
  allDateRangeOptions.lastWeekOption,
  allDateRangeOptions.thisMonthOption,
  allDateRangeOptions.lastMonthOption,
  allDateRangeOptions.customOption,
];

export const textCampaignDateRangeOptions: DateRangeOption[] = [
  ...genericDateRangeOptions,
  allDateRangeOptions.textCampaignAllTimeOption,
  allDateRangeOptions.thisYearOption,
  allDateRangeOptions.lastYearOption
];

export const emailCampaignDateRangeOptions: DateRangeOption[] = [
  ...genericDateRangeOptions,
  allDateRangeOptions.emailCampaignAllTimeOption
];

export const analyticsDateRangeOptions: DateRangeOption[] = [
  ...genericDateRangeOptions,
  allDateRangeOptions.thisYearOption,
  allDateRangeOptions.lastYearOption,
];

export const analytics30DaysRangeOptions: DateRangeOption[] = [
  allDateRangeOptions.yesterdayOption,
  allDateRangeOptions.thisWeekOption,
  allDateRangeOptions.lastWeekOption,
  allDateRangeOptions.thisMonthOption,
  allDateRangeOptions.customOption,
];
