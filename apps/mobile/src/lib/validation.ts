export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const PASSWORD_MIN_LENGTH = 8;

export type LoginErrors = {
  email?: string;
  password?: string;
};

export function validateEmail(value: string): string | undefined {
  const email = value.trim();

  if (!email) {
    return 'Informe seu e-mail.';
  }
  if (!EMAIL_PATTERN.test(email)) {
    return 'Digite um e-mail válido.';
  }
  return undefined;
}

export function validatePassword(value: string): string | undefined {
  if (!value) {
    return 'Informe sua senha.';
  }
  if (value.length < PASSWORD_MIN_LENGTH) {
    return `A senha precisa ter ao menos ${PASSWORD_MIN_LENGTH} caracteres.`;
  }
  if (!/[a-zA-Z]/.test(value) || !/\d/.test(value)) {
    return 'A senha precisa ter letras e números.';
  }
  return undefined;
}

export function validateLogin(email: string, password: string): LoginErrors {
  return {
    email: validateEmail(email),
    password: validatePassword(password),
  };
}

export function hasErrors(errors: LoginErrors): boolean {
  return Boolean(errors.email || errors.password);
}
