/* eslint-disable no-alert */
const Alert = (title, description, options) => {
  const result = window.confirm(
    [title, description].filter(Boolean).join('\n'),
  );

  const option = result
    ? options.find(({style}) => style !== 'Cancel')
    : options.find(({style}) => style === 'Cancel');
  option && option.onPress && option.onPress();
};

export default Alert;
