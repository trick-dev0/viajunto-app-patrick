import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Animated, StyleSheet, Text, View } from 'react-native';

import { PrimaryButton } from '@/components/primary-button';
import { Screen } from '@/components/screen';
import { useReveal } from '@/hooks/use-reveal';
import { isUserRole, ROLE_LABELS, type UserRole } from '@/lib/roles';
import { colors, fonts, radii, shadows } from '@/theme/tokens';

const NEXT_STEPS: Record<
  UserRole,
  { icon: keyof typeof Ionicons.glyphMap; title: string; description: string }[]
> = {
  passenger: [
    {
      icon: 'search-outline',
      title: 'Buscar rotas',
      description: 'Encontre viagens compatíveis com o seu destino.',
    },
    {
      icon: 'people-outline',
      title: 'Conhecer o motorista',
      description: 'Veja perfil, avaliações e detalhes do veículo.',
    },
    {
      icon: 'chatbubbles-outline',
      title: 'Combinar a viagem',
      description: 'Confirme o ponto de encontro e divida as despesas.',
    },
  ],
  driver: [
    {
      icon: 'add-circle-outline',
      title: 'Publicar trajeto',
      description: 'Informe origem, destino, horário e assentos.',
    },
    {
      icon: 'person-add-outline',
      title: 'Receber passageiros',
      description: 'Aproveite quem vai para o mesmo caminho.',
    },
    {
      icon: 'wallet-outline',
      title: 'Dividir as despesas',
      description: 'Combine o valor da contribuição da viagem.',
    },
  ],
};

export default function ComingSoonRoute() {
  const params = useLocalSearchParams<{ role?: string }>();
  const rawRole = Array.isArray(params.role) ? params.role[0] : params.role;
  const role: UserRole = isUserRole(rawRole) ? rawRole : 'passenger';

  const content = useReveal({ delay: 100 });
  const steps = useReveal({ delay: 220, distance: 14 });

  return (
    <Screen contentStyle={styles.content}>
      <Animated.View style={[styles.hero, content]}>
        <View style={styles.successRing}>
          <View style={styles.successCircle}>
            <Ionicons name="checkmark" size={38} color={colors.white} />
          </View>
        </View>

        <View style={styles.pill}>
          <View style={styles.pillDot} />
          <Text style={styles.pillText}>PERFIL SELECIONADO</Text>
        </View>

        <Text style={styles.title}>Tudo pronto!</Text>
        <Text style={styles.subtitle}>
          Você escolheu{' '}
          <Text style={styles.subtitleStrong}>{ROLE_LABELS[role]}</Text>. A
          experiência de {role === 'passenger' ? 'buscar caronas' : 'oferecer caronas'} chega
          na próxima entrega do ViaJunto.
        </Text>
      </Animated.View>

      <Animated.View style={[styles.stepsCard, steps]}>
        <View style={styles.stepsHeader}>
          <Text style={styles.stepsTitle}>O que vem por aí</Text>
          <View style={styles.soonBadge}>
            <Text style={styles.soonText}>EM BREVE</Text>
          </View>
        </View>

        {NEXT_STEPS[role].map((step, index) => (
          <View key={step.title} style={styles.stepRow}>
            <View style={styles.stepIcon}>
              <Ionicons name={step.icon} size={19} color={colors.primary} />
            </View>
            <View style={styles.stepCopy}>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepDescription}>{step.description}</Text>
            </View>
            <Text style={styles.stepNumber}>0{index + 1}</Text>
          </View>
        ))}
      </Animated.View>

      <View style={styles.actions}>
        <PrimaryButton
          testID="coming-soon-home"
          title="Voltar ao início"
          onPress={() => router.replace('/welcome')}
          icon="home-outline"
        />
        <PrimaryButton
          testID="coming-soon-switch"
          title="Trocar perfil"
          variant="outline"
          onPress={() => router.back()}
          icon="swap-horizontal-outline"
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 28,
  },
  hero: {
    alignItems: 'center',
    paddingTop: 26,
  },
  successRing: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: colors.successSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  successCircle: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.card,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primaryTint,
    borderWidth: 1,
    borderColor: colors.primarySoft,
    borderRadius: radii.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 12,
  },
  pillDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.success,
  },
  pillText: {
    fontFamily: fonts.semibold,
    fontSize: 9.5,
    letterSpacing: 1.1,
    color: colors.primary,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: -1.1,
    color: colors.navy,
  },
  subtitle: {
    marginTop: 10,
    textAlign: 'center',
    fontFamily: fonts.regular,
    fontSize: 13.5,
    lineHeight: 21,
    color: colors.textMuted,
    maxWidth: 330,
  },
  subtitleStrong: {
    fontFamily: fonts.semibold,
    color: colors.navy,
  },
  stepsCard: {
    marginTop: 28,
    padding: 16,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    gap: 14,
    ...shadows.card,
  },
  stepsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepsTitle: {
    fontFamily: fonts.semibold,
    fontSize: 14.5,
    color: colors.navy,
  },
  soonBadge: {
    backgroundColor: colors.primaryTint,
    borderRadius: radii.pill,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  soonText: {
    fontFamily: fonts.semibold,
    fontSize: 8.5,
    letterSpacing: 0.9,
    color: colors.primary,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
  },
  stepIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.primaryTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCopy: {
    flex: 1,
    gap: 1,
  },
  stepTitle: {
    fontFamily: fonts.medium,
    fontSize: 12.5,
    color: colors.navy,
  },
  stepDescription: {
    fontFamily: fonts.regular,
    fontSize: 10.5,
    lineHeight: 15,
    color: colors.textMuted,
  },
  stepNumber: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: colors.dotInactive,
  },
  actions: {
    marginTop: 'auto',
    paddingTop: 28,
    gap: 11,
  },
});
