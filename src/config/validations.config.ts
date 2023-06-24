import { EmailEnum } from '../enums/email.enum';
import { PasswordEnum } from '../enums/password.enum';

export const validateEmailData = (email: string): EmailEnum => {
  if (email.length && email != '') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidRegex = emailRegex.test(email);
    return !isValidRegex ? EmailEnum.INVALID_EMAIL : EmailEnum.VALID_EMAIL;
  }
  return EmailEnum.INVALID_EMAIL;
};

export const validatePassword = (
  pwd: string,
  confirmPwd: string
): PasswordEnum => {
  if (pwd.length && confirmPwd.length && pwd.length > 5) {
    if (pwd === confirmPwd) return PasswordEnum.VALID_PASS;
  }
  return PasswordEnum.INVALID_PASS;
};
