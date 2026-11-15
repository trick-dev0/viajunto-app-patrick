import { Ionicons } from '@expo/vector-icons';
import { useState, type ReactNode } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';

import { colors, fonts, layout, radii, typography } from '@/theme/tokens';

type TextFieldProps = TextInputProps & {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  error?: string;
  rightElement?: ReactNode;
  testID?: string;
};

export function TextField({
  label,
  icon,
  error,
  rightElement,
  style,
  onFocus,
  onBlur,
  testID,
  ...inputProps
}: TextFieldProps) {
  const [focused, setFocused] = useState(false);
  const hasError = Boolean(error);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.field,
          focused && styles.fieldFocused,
          hasError && styles.fieldError,
        ]}
      >
        {icon ? (
          <Ionicons
            name={icon}
            size={20}
            color={hasError ? colors.danger : focused ? colors.primary : colors.textSubtle}
          />
        ) : null}
        <TextInput
          testID={testID}
          accessibilityLabel={label}
          placeholderTextColor={colors.textSubtle}
          selectionColor={colors.primary}
          style={[styles.input, style]}
          onFocus={(event) => {
            setFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            onBlur?.(event);
          }}
          {...inputProps}
        />
        {rightElement}
      </View>
      {hasError ? (
        <View style={styles.errorRow}>
          <Ionicons name="alert-circle" size={13} color={colors.danger} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 7,
  },
  label: {
    ...typography.label,
  },
  field: {
    minHeight: layout.controlHeight,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    backgroundColor: colors.inputBackground,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  fieldFocused: {
    borderColor: colors.primary,
    backgroundColor: colors.white,
  },
  fieldError: {
    borderColor: colors.danger,
    backgroundColor: colors.dangerSoft,
  },
  input: {
    flex: 1,
    height: layout.controlHeight - 4,
    fontFamily: fonts.medium,
    fontSize: 15,
    color: colors.text,
    paddingVertical: 0,
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  errorText: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.danger,
  },
});
