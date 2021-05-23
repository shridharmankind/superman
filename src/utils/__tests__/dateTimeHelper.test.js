import 'react-native';
import {
  getMonthList,
  returnDateWithOrdinal,
  getFormatDate,
} from 'utils/dateTimeHelper';

it('monthList', () => {
  const result = getMonthList();
  expect(result[0]).toEqual('January');
});

it('monthList short', () => {
  const result = getMonthList(true);
  expect(result[0]).toEqual('Jan');
});

it('returnDateWithOrdinal', () => {
  const result = returnDateWithOrdinal({
    date: new Date('2011-02-11T10:20:30Z'),
  });
  expect(result).toEqual('11th Feb 2011');
});

it('getFormatDate - get full date', () => {
  const result = getFormatDate({
    date: new Date('2011-02-11T10:20:30Z'),
  });
  expect(result).toEqual('2011-02-11');
});

it('getFormatDate - get year only', () => {
  const result = getFormatDate({
    date: new Date('2011-02-11T10:20:30Z'),
    format: 'YYYY',
  });
  expect(result).toEqual('2011');
});
