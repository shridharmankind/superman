import {showToast, hideToast} from 'components/widgets/Toast';
import {Strings, Constants} from 'common';
import themes from 'themes';

/* Function to validate the input text of the Search Bar */
export const validateSearch = (searchInput, clearSearch) => {
  const regEx = /^[^.][a-zA-Z. ]*$/;
  /*If input text is empty and doesnt match the regex then need to return */
  if (searchInput.trim() === '' || !regEx.test(searchInput)) {
    showWarningToast(Strings.searchBar.errors.validName, clearSearch);
    return [false, undefined];
  }
  // If not empty string
  let searchInputLowerCase = searchInput.toLowerCase(); // to lowercase
  let trimmedInput = '';
  let drPrefix = false;
  if (searchInputLowerCase.indexOf('dr.') === 0) {
    trimmedInput = searchInputLowerCase.replace('dr.', '').trim(); // need to remove dr.
    drPrefix = true;
    if (trimmedInput.length === 0) {
      // If only dr./dr is there
      showWarningToast(Strings.searchBar.errors.partyName, clearSearch);
      return [false, drPrefix];
    }
    if (trimmedInput.length < 2) {
      showWarningToast(Strings.searchBar.errors.minChar, clearSearch);
      return [false, drPrefix];
    }
    if (trimmedInput.length >= 2) {
      const regEx1 = /^[^.][a-zA-Z. ]*$/;
      if (!regEx1.test(trimmedInput)) {
        showWarningToast(Strings.searchBar.errors.validName, clearSearch);
        return [false, drPrefix];
      }
    }
  } else if (searchInputLowerCase.length < 2) {
    // no dr. found
    showWarningToast(Strings.searchBar.errors.minChar, clearSearch);
    return [false, drPrefix];
  } else {
    trimmedInput = searchInputLowerCase.trim();
    return [true, drPrefix];
  }
  return [true, drPrefix];
};

// Function to show error message as toast
 const showWarningToast = (message,clearSearch) => {
  showToast({
    type: Constants.TOAST_TYPES.WARNING,
    autoHide: false,
    props: {
      onPress: () => {
        hideToast();
      },
      onPressLeftBtn: () => {
        hideToast();
        clearSearch();
      },
      onPressRightBtn: () => {
        hideToast();
      },
      onClose: () => hideToast(),
      heading: message,
      actionLeftTitle: Strings.searchBar.toastBtns.clear,
      actionRightTitle: Strings.searchBar.toastBtns.continue,
    },
  });
};

// Function to get teh division color
export const getDivisionColor = division => {
  switch (division && division.toLowerCase()) {
    case Constants.DIVISION_COLOR.KYC:
      return themes.colors.orange[100];
    case Constants.DIVISION_COLOR.A_PLUS:
      return themes.colors.darkBlue;
    case Constants.DIVISION_COLOR.A:
      return themes.colors.yellow[300];
    case Constants.DIVISION_COLOR.B:
      return themes.colors.lightBlue;
    case Constants.DIVISION_COLOR.C:
      return themes.colors.grey[1200];
    default:
      return themes.colors.transparent;
  }
};
