import { Platform, StyleSheet } from 'react-native';

/**
 * Design tokens do ViaJunto.
 * Extraídos da identidade visual do Figma (azul de marca, navy e superfícies claras).
 */
export const colors = {
  primary: '#1874F2',
  primaryDark: '#0F5FCC',
  primaryLight: '#4A9BFF',
  primarySoft: '#E8F1FE',
  primaryTint: '#F4F8FF',
  navy: '#173B5E',
  navyDeep: '#0F2C47',
  text: '#1D3044',
  textMuted: '#687C91',
  textSubtle: '#94A6B8',
  border: '#E2EAF3',
  borderStrong: '#C9D9E9',
  white: '#FFFFFF',
  background: '#FFFFFF',
  backgroundAlt: '#F6F9FD',
  inputBackground: '#F7FAFE',
  success: '#1E9E6A',
  successSoft: '#E8F8F1',
  danger: '#D64545',
  dangerSoft: '#FDEEEE',
  shadow: '#0F2C47',
  overlay: 'rgba(15, 44, 71, 0.38)',
  dotInactive: '#D6E3F2',
} as const;

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  huge: 56,
} as const;

export const radii = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  xxl: 32,
  pill: 999,
} as const;

export const fonts = {
  regular: 'Poppins_400Regular',
  medium: 'Poppins_500Medium',
  semibold: 'Poppins_600SemiBold',
  bold: 'Poppins_700Bold',
} as const;

export const shadows = {
  card: Platform.select({
    ios: {
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.08,
      shadowRadius: 24,
    },
    android: { elevation: 4 },
    web: { boxShadow: '0px 12px 32px rgba(15, 44, 71, 0.10)' },
    default: {},
  }),
  button: Platform.select({
    ios: {
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.22,
      shadowRadius: 16,
    },
    android: { elevation: 5 },
    web: { boxShadow: '0px 10px 22px rgba(24, 116, 242, 0.24)' },
    default: {},
  }),
} as const;

export const typography = StyleSheet.create({
  display: {
    fontFamily: fonts.bold,
    fontSize: 40,
    lineHeight: 46,
    letterSpacing: -1.2,
    color: colors.navy,
  },
  h1: {
    fontFamily: fonts.bold,
    fontSize: 30,
    lineHeight: 38,
    letterSpacing: -0.8,
    color: colors.navy,
  },
  h2: {
    fontFamily: fonts.semibold,
    fontSize: 22,
    lineHeight: 30,
    letterSpacing: -0.4,
    color: colors.navy,
  },
  h3: {
    fontFamily: fonts.semibold,
    fontSize: 17,
    lineHeight: 24,
    color: colors.navy,
  },
  body: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 23,
    color: colors.textMuted,
  },
  bodyStrong: {
    fontFamily: fonts.medium,
    fontSize: 15,
    lineHeight: 23,
    color: colors.text,
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: 13,
    lineHeight: 18,
    color: colors.navy,
  },
  caption: {
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 18,
    color: colors.textSubtle,
  },
  button: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.1,
  },
});

export const layout = {
  maxContentWidth: 480,
  gutter: 24,
  controlHeight: 56,
} as const;
