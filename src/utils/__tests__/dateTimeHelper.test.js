import 'react-native';
import {
  getMonthList,
  getFormatDate,
  returnUTCtoLocal,
} from 'utils/dateTimeHelper';

it('monthList', () => {
  const result = getMonthList();
  expect(result[0]).toEqual('January');
});

it('monthList short', () => {
  const result = getMonthList(true);
  expect(result[0]).toEqual('Jan');
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

it('returnUTCtoLocal', () => {
  const result = returnUTCtoLocal('2011-02-11T10:20:30Z');
  expect(result).toEqual('11 Feb 2011');
});
