import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radii, shadows } from '@/theme/tokens';
import type { UserRole } from '@/lib/roles';

type RoleCardProps = {
  role: UserRole;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  bullets: string[];
  selected: boolean;
  onPress: (role: UserRole) => void;
  testID?: string;
};

export function RoleCard({
  role,
  title,
  description,
  icon,
  bullets,
  selected,
  onPress,
  testID,
}: RoleCardProps) {
  return (
    <Pressable
      testID={testID}
      accessibilityRole="radio"
      accessibilityLabel={`${title}. ${description}`}
      accessibilityState={{ selected }}
      onPress={() => onPress(role)}
      style={({ pressed }) => [
        styles.card,
        selected && styles.cardSelected,
        pressed && styles.pressed,
      ]}
    >
      <View style={[styles.iconTile, selected && styles.iconTileSelected]}>
        <Ionicons
          name={icon}
          size={25}
          color={selected ? colors.white : colors.primary}
        />
      </View>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{title}</Text>
          {selected ? (
            <View style={styles.selectedBadge}>
              <Text style={styles.selectedBadgeText}>Selecionado</Text>
            </View>
          ) : null}
        </View>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.bullets}>
          {bullets.map((bullet) => (
            <View key={bullet} style={styles.bulletRow}>
              <Ionicons
                name="checkmark-circle"
                size={14}
                color={selected ? colors.primary : colors.textSubtle}
              />
              <Text style={styles.bulletText}>{bullet}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected ? <View style={styles.radioDot} /> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    backgroundColor: colors.white,
    borderRadius: radii.xl,
    borderWidth: 1.5,
    borderColor: colors.border,
    padding: 16,
    ...shadows.card,
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryTint,
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.995 }],
  },
  iconTile: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconTileSelected: {
    backgroundColor: colors.primary,
  },
  content: {
    flex: 1,
    gap: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  title: {
    fontFamily: fonts.semibold,
    fontSize: 16.5,
    lineHeight: 22,
    color: colors.navy,
  },
  selectedBadge: {
    backgroundColor: colors.primarySoft,
    borderRadius: radii.pill,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  selectedBadgeText: {
    fontFamily: fonts.semibold,
    fontSize: 9,
    letterSpacing: 0.3,
    color: colors.primary,
  },
  description: {
    fontFamily: fonts.regular,
    fontSize: 12.5,
    lineHeight: 19,
    color: colors.textMuted,
  },
  bullets: {
    marginTop: 5,
    gap: 3,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  bulletText: {
    fontFamily: fonts.medium,
    fontSize: 11.5,
    color: colors.text,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.borderStrong,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  radioSelected: {
    borderColor: colors.primary,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
});
