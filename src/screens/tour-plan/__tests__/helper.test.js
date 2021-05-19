import 'react-native';
import {getTourPlanScheduleMonths} from 'utils/helper';

it('returns the tour plan schedule', () => {
  const result = getTourPlanScheduleMonths(new Date('2011-02-11T10:20:30Z'));

  expect(result).toBeTruthy();
  expect(result[0]).toEqual('February 2011');
});
