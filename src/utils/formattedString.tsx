export const Capitalize = (string: string): string => {
  if (typeof string !== 'string') {
    return '';
  }
  return string.charAt(0).toUpperCase() + string.slice(1).toLocaleLowerCase();
};

export const StringInitials = (fullName: string): string => {
  const name = fullName.split(' ');
  const firstWord = name[0].charAt(0);
  const lastWord = name.length === 1 ? '' : name.pop();
  return firstWord + lastWord?.charAt(0);
};

export const ReplaceEmailIdWithStar = (email = ''): string => {
  const emailId = email.split('@');
  const hideEmail = emailId[0]
    .substring(1, emailId[0].length)
    .replace(/./g, '*');
  return emailId[0][0] + hideEmail + '@' + emailId[1];
};

export const getMinValue = (arr: any[]) => {
  return Math.min(...(arr || []));
};

export const getMaxValue = (arr: any[]) => {
  return Math.max(...(arr || []));
};

export const average = (arr: any[]) =>
  Number((arr || []).reduce((a, b) => a + b, 0) / arr.length);
