export const StrongPasswordValidation = (value: string) => {
  const specialCharatersRegex = /(?=.*?[!@#$%^&*()\-_=+{};:,<.>]).{1,}$/;
  const oneUpperCharatersRegex = /(?=.*?[A-Z]).{1,}$/;
  const oneLowerCharatersRegex = /(?=.*?[a-z]).{1,}$/;
  const oneNumberCharatersRegex = /(?=.*?[0-9]).{1,}$/;
  const isValidOneSpecialCharaters = !specialCharatersRegex.test(value)
    ? `At least one special character, (!@#$%^&*()\-_=+{};:,<.>)${'\n'}`
    : '';
  const isValidpOneUpperCharaters = !oneUpperCharatersRegex.test(value)
    ? `At least one upper case letter${'\n'}`
    : '';
  const isValidpOneLowerCharaters = !oneLowerCharatersRegex.test(value)
    ? `At least one lower case letter${'\n'}`
    : '';
  const isValidpOneNumber = !oneNumberCharatersRegex.test(value)
    ? `At least one digit${'\n'}`
    : '';
  return `${isValidOneSpecialCharaters}${isValidpOneUpperCharaters}${isValidpOneLowerCharaters}${isValidpOneNumber}`;
};
