import type { PropsWithChildren } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, layout } from '@/theme/tokens';

type ScreenProps = PropsWithChildren<{
  scroll?: boolean;
  background?: string;
  contentStyle?: StyleProp<ViewStyle>;
  edges?: ('top' | 'right' | 'bottom' | 'left')[];
  keyboardOffset?: number;
}>;

/**
 * Moldura comum das telas: safe area, teclado e, no web,
 * uma coluna centralizada com largura de celular.
 */
export function Screen({
  children,
  scroll = true,
  background = colors.background,
  contentStyle,
  edges = ['top', 'bottom'],
  keyboardOffset = 0,
}: ScreenProps) {
  const content = scroll ? (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={[styles.content, contentStyle]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      bounces={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.flex, contentStyle]}>{children}</View>
  );

  return (
    <View style={styles.outer}>
      <SafeAreaView edges={edges} style={[styles.safeArea, { backgroundColor: background }]}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={keyboardOffset}
        >
          {content}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: Platform.OS === 'web' ? '#E8F1FB' : colors.background,
    alignItems: 'center',
  },
  safeArea: {
    flex: 1,
    width: '100%',
    maxWidth: layout.maxContentWidth,
    ...(Platform.OS === 'web'
      ? {
          boxShadow: '0px 0px 60px rgba(15, 44, 71, 0.14)',
        }
      : {}),
  },
  flex: {
    flex: 1,
    width: '100%',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: layout.gutter,
    paddingTop: 12,
    paddingBottom: 24,
  },
});
