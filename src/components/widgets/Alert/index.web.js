/* eslint-disable no-alert */
const Alert = (title, description, options) => {
  const result = window.confirm(
    [title, description].filter(Boolean).join('\n'),
  );

  if (result) {
    const confirmOption = options.find(({style}) => style !== 'Cancel');
    confirmOption && confirmOption.onPress();
  } else {
    const cancelOption = options.find(({style}) => style === 'Cancel');
    cancelOption && cancelOption.onPress();
  }
};

export default Alert;
