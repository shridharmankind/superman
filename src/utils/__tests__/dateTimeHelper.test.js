import 'react-native';
import {getMonth, getYear, getMonthList} from 'utils/dateTimeHelper';

it('getMonth', () => {
  const result = getMonth({date: new Date('2011-02-11T10:20:30Z')});
  expect(result).toEqual('2');
});

it('getYear', () => {
  const result = getYear({date: new Date('2011-02-11T10:20:30Z')});
  expect(result).toEqual('2011');
});

it('monthList', () => {
  const result = getMonthList();
  expect(result[0]).toEqual('January');
});

it('monthList short', () => {
  const result = getMonthList(true);
  expect(result[0]).toEqual('Jan');
});
