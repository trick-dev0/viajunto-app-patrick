import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

import { BrandLogo } from '@/components/brand-logo';
import { PrimaryButton } from '@/components/primary-button';
import { RoutePreview } from '@/components/route-preview';
import { Screen } from '@/components/screen';
import { useReveal } from '@/hooks/use-reveal';
import { colors, fonts, radii, spacing } from '@/theme/tokens';

const FEATURES = [
  { icon: 'wallet-outline', label: 'Custo justo' },
  { icon: 'time-outline', label: 'Horários flexíveis' },
  { icon: 'shield-checkmark-outline', label: 'Mais segurança' },
] as const;

export default function WelcomeRoute() {
  const hero = useReveal({ delay: 60 });
  const copy = useReveal({ delay: 180, distance: 16 });
  const actions = useReveal({ delay: 320, distance: 12 });

  const goToLogin = () => {
    router.push('/login');
  };

  return (
    <Screen contentStyle={styles.content}>
      <View style={styles.header}>
        <BrandLogo direction="horizontal" size={38} wordmarkSize={21} compact />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Entrar na minha conta"
          onPress={goToLogin}
          style={({ pressed }) => [styles.loginPill, pressed && styles.pressed]}
        >
          <Text style={styles.loginPillText}>Entrar</Text>
          <Ionicons name="arrow-forward" size={14} color={colors.primary} />
        </Pressable>
      </View>

      <Animated.View style={[styles.hero, hero]}>
        <RoutePreview />
      </Animated.View>

      <Animated.View style={[styles.copy, copy]}>
        <View style={styles.eyebrowRow}>
          <View style={styles.eyebrowDot} />
          <Text style={styles.eyebrow}>CARONAS INTERMUNICIPAIS</Text>
        </View>

        <Text style={styles.headline}>
          Vá <Text style={styles.headlineAccent}>junto.</Text>
          {'\n'}Divida o caminho.
        </Text>

        <Text style={styles.subtitle}>
          Encontre ou ofereça caronas entre cidades do interior, com horários
          flexíveis e despesas divididas de forma justa.
        </Text>

        <View style={styles.features}>
          {FEATURES.map((feature) => (
            <View key={feature.label} style={styles.featureChip}>
              <Ionicons name={feature.icon} size={14} color={colors.primary} />
              <Text style={styles.featureText}>{feature.label}</Text>
            </View>
          ))}
        </View>
      </Animated.View>

      <Animated.View style={[styles.actions, actions]}>
        <View style={styles.womenBanner}>
          <View style={styles.womenIcon}>
            <Ionicons name="shield-checkmark" size={17} color={colors.primary} />
          </View>
          <Text style={styles.womenText}>
            Caronas exclusivas para mulheres, com a opção de viajar apenas entre
            mulheres.
          </Text>
        </View>

        <PrimaryButton
          testID="welcome-start"
          title="Começar"
          icon="arrow-forward"
          iconPosition="right"
          onPress={goToLogin}
        />

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Já tenho uma conta"
          onPress={goToLogin}
          style={({ pressed }) => [styles.secondary, pressed && styles.pressed]}
        >
          <Text style={styles.secondaryText}>
            Já tem uma conta?{' '}
            <Text style={styles.secondaryLink}>Entrar</Text>
          </Text>
        </Pressable>
      </Animated.View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 28,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
    paddingBottom: spacing.md,
  },
  loginPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    height: 38,
    borderRadius: radii.pill,
    backgroundColor: colors.primaryTint,
    borderWidth: 1,
    borderColor: colors.primarySoft,
  },
  loginPillText: {
    fontFamily: fonts.semibold,
    fontSize: 13,
    color: colors.primary,
  },
  hero: {
    marginTop: 4,
  },
  copy: {
    marginTop: spacing.xl,
  },
  eyebrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 10,
  },
  eyebrowDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  eyebrow: {
    fontFamily: fonts.semibold,
    fontSize: 10,
    letterSpacing: 1.4,
    color: colors.primary,
  },
  headline: {
    fontFamily: fonts.bold,
    fontSize: 35,
    lineHeight: 43,
    letterSpacing: -1.4,
    color: colors.navy,
  },
  headlineAccent: {
    color: colors.primary,
  },
  subtitle: {
    marginTop: 12,
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 22,
    color: colors.textMuted,
    maxWidth: 350,
  },
  features: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
  },
  featureChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.backgroundAlt,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  featureText: {
    fontFamily: fonts.medium,
    fontSize: 11,
    color: colors.text,
  },
  actions: {
    marginTop: 'auto',
    paddingTop: spacing.xl,
    gap: 14,
  },
  womenBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.primaryTint,
    borderWidth: 1,
    borderColor: colors.primarySoft,
    borderRadius: radii.md,
    padding: 11,
  },
  womenIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  womenText: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 11,
    lineHeight: 16,
    color: colors.textMuted,
  },
  secondary: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  secondaryText: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.textMuted,
  },
  secondaryLink: {
    fontFamily: fonts.semibold,
    color: colors.primary,
  },
  pressed: {
    opacity: 0.7,
  },
});
