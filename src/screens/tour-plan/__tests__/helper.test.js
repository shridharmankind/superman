import 'react-native';
import {getTourPlanScheduleMonths} from 'screens/tourPlan/helper';

it('returns the tour plan schedule', () => {
  const result = getTourPlanScheduleMonths(new Date('2011-02-11T10:20:30Z'));

  expect(result).toBeTruthy();
  const resultLength = result.length;
  expect(result[resultLength - 1].text).toEqual('March 2011');
});

it('returns the tour plan schedule1', () => {
  const result = getTourPlanScheduleMonths(new Date('2011-04-11T10:20:30Z'));

  expect(result).toBeTruthy();
  expect(result[0].text).toEqual('April 2011');
});

it('returns the tour plan schedule2', () => {
  const result = getTourPlanScheduleMonths(new Date('2011-12-11T10:20:30Z'));

  expect(result).toBeTruthy();
  expect(result[0].text).toEqual('December 2011');
});
