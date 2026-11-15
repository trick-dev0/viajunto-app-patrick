import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import { BackButton } from '@/components/back-button';
import { PrimaryButton } from '@/components/primary-button';
import { RoleCard } from '@/components/role-card';
import { Screen } from '@/components/screen';
import { useReveal } from '@/hooks/use-reveal';
import { ROLE_LABELS, type UserRole } from '@/lib/roles';
import { colors, fonts, radii } from '@/theme/tokens';

export default function ProfileRoute() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const cards = useReveal({ delay: 140, distance: 14 });
  const actions = useReveal({ delay: 260, distance: 12 });

  const handleContinue = () => {
    if (!selectedRole) {
      return;
    }

    router.push({
      pathname: '/coming-soon',
      params: { role: selectedRole },
    });
  };

  return (
    <Screen contentStyle={styles.content}>
      <View style={styles.header}>
        <BackButton onPress={() => router.back()} />
        <View style={styles.stepPill}>
          <View style={styles.stepDot} />
          <Text style={styles.stepText}>PERFIL</Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.intro}>
        <Text style={styles.title}>Como você quer viajar?</Text>
        <Text style={styles.subtitle}>
          Escolha o seu perfil para começar. Você poderá trocar quando quiser.
        </Text>
      </View>

      <Animated.View style={[styles.cards, cards]}>
        <RoleCard
          testID="role-passenger"
          role="passenger"
          title="Pedir Carona"
          description="Encontre motoristas que já vão para o seu destino e divida as despesas."
          icon="people"
          bullets={['Encontre rotas compatíveis', 'Divida os custos da viagem']}
          selected={selectedRole === 'passenger'}
          onPress={setSelectedRole}
        />

        <RoleCard
          testID="role-driver"
          role="driver"
          title="Oferecer Carona"
          description="Publique o trajeto que você já faria e aproveite os assentos vagos."
          icon="car-sport"
          bullets={['Publique seu trajeto', 'Aproveite os assentos vagos']}
          selected={selectedRole === 'driver'}
          onPress={setSelectedRole}
        />
      </Animated.View>

      <View style={styles.infoCard}>
        <View style={styles.infoIcon}>
          <Ionicons name="shield-checkmark" size={18} color={colors.primary} />
        </View>
        <View style={styles.infoCopy}>
          <Text style={styles.infoTitle}>Segurança em primeiro lugar</Text>
          <Text style={styles.infoText}>
            No ViaJunto, motoristas mulheres podem optar por aceitar apenas
            passageiras mulheres.
          </Text>
        </View>
      </View>

      <Animated.View style={[styles.actions, actions]}>
        <PrimaryButton
          testID="profile-continue"
          title={
            selectedRole
              ? `Continuar como ${ROLE_LABELS[selectedRole]}`
              : 'Continuar'
          }
          onPress={handleContinue}
          disabled={!selectedRole}
          icon="arrow-forward"
          iconPosition="right"
        />
        <Text style={styles.helper}>
          {selectedRole
            ? 'Você poderá trocar de perfil a qualquer momento.'
            : 'Selecione um perfil para continuar.'}
        </Text>
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
  },
  headerSpacer: {
    width: 42,
  },
  stepPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primaryTint,
    borderWidth: 1,
    borderColor: colors.primarySoft,
    borderRadius: radii.pill,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  stepDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  stepText: {
    fontFamily: fonts.semibold,
    fontSize: 9.5,
    letterSpacing: 1.1,
    color: colors.primary,
  },
  intro: {
    marginTop: 32,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 30,
    lineHeight: 38,
    letterSpacing: -1,
    color: colors.navy,
  },
  subtitle: {
    marginTop: 9,
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 22,
    color: colors.textMuted,
    maxWidth: 330,
  },
  cards: {
    marginTop: 26,
    gap: 14,
  },
  infoCard: {
    flexDirection: 'row',
    gap: 11,
    marginTop: 20,
    padding: 13,
    borderRadius: radii.md,
    backgroundColor: colors.primaryTint,
    borderWidth: 1,
    borderColor: colors.primarySoft,
  },
  infoIcon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoCopy: {
    flex: 1,
    gap: 2,
  },
  infoTitle: {
    fontFamily: fonts.semibold,
    fontSize: 12.5,
    color: colors.navy,
  },
  infoText: {
    fontFamily: fonts.regular,
    fontSize: 11,
    lineHeight: 17,
    color: colors.textMuted,
  },
  actions: {
    marginTop: 'auto',
    paddingTop: 26,
    gap: 10,
  },
  helper: {
    textAlign: 'center',
    fontFamily: fonts.regular,
    fontSize: 11.5,
    color: colors.textSubtle,
  },
});
