export type UserRole = 'passenger' | 'driver';

export const ROLE_LABELS: Record<UserRole, string> = {
  passenger: 'Pedir Carona',
  driver: 'Oferecer Carona',
};

export const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  passenger: 'Encontre motoristas que já vão para o seu destino e divida as despesas.',
  driver: 'Publique o trajeto que você já faria e aproveite os assentos vagos.',
};

export function isUserRole(value: unknown): value is UserRole {
  return value === 'passenger' || value === 'driver';
}
