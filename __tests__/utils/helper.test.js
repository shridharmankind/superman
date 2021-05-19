import 'react-native';
import React from 'react';
import {getTourPlanScheduleMonths} from 'utils/helper';

it('returns the tour plan schedule', () => {
  const result = getTourPlanScheduleMonths(new Date('2011-02-11T10:20:30Z'));

  expect(result).toBeTruthy();
  expect(result[0]).toEqual('May 2021');
});
