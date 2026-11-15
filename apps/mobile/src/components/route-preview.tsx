import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { colors, fonts, radii, shadows } from '@/theme/tokens';

/**
 * Cartão ilustrativo da rota Vitória da Conquista → Brumado.
 * Serve como hero da tela de boas-vindas, com dados mockados.
 */
export function RoutePreview() {
  return (
    <View style={styles.card}>
      <LinearGradient
        colors={['#E9F3FF', '#F7FBFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 340 252"
        preserveAspectRatio="xMidYMid slice"
        style={StyleSheet.absoluteFill}
      >
        <Rect x="18" y="24" width="86" height="52" rx="14" fill="#FFFFFF" opacity={0.55} />
        <Rect x="232" y="28" width="90" height="64" rx="18" fill="#FFFFFF" opacity={0.5} />
        <Rect x="30" y="190" width="96" height="46" rx="14" fill="#FFFFFF" opacity={0.55} />
        <Rect x="230" y="186" width="86" height="50" rx="16" fill="#FFFFFF" opacity={0.5} />
        <Circle cx="296" cy="164" r="38" fill="#D9EEDF" opacity={0.8} />
        <Circle cx="52" cy="108" r="26" fill="#DCEBFF" opacity={0.9} />

        <Path
          d="M-10 82C54 74 82 112 134 126C196 142 226 128 350 110"
          stroke="#FFFFFF"
          strokeWidth={18}
          opacity={0.85}
          fill="none"
        />
        <Path
          d="M92 -10C102 54 156 72 178 116C198 158 178 208 190 262"
          stroke="#FFFFFF"
          strokeWidth={13}
          opacity={0.7}
          fill="none"
        />

        <Path
          d="M62 202C104 178 112 148 158 132C206 116 242 96 286 54"
          stroke={colors.primary}
          strokeWidth={4.5}
          strokeLinecap="round"
          strokeDasharray="7 9"
          fill="none"
        />
        <Circle cx="62" cy="202" r="11" fill="#FFFFFF" />
        <Circle cx="62" cy="202" r="5.5" fill={colors.primary} />
        <Circle cx="286" cy="54" r="13" fill="#FFFFFF" />
        <Circle cx="286" cy="54" r="6.5" fill={colors.navy} />
      </Svg>

      <View style={styles.topRow}>
        <View style={styles.eyebrow}>
          <Ionicons name="navigate" size={12} color={colors.primary} />
          <Text style={styles.eyebrowText}>ROTA EM DESTAQUE</Text>
        </View>
        <View style={styles.pricePill}>
          <Text style={styles.priceText}>R$ 35</Text>
        </View>
      </View>

      <View style={styles.carBadge}>
        <Ionicons name="car-sport" size={22} color={colors.primary} />
      </View>

      <View style={styles.bottomCard}>
        <View style={styles.routeRow}>
          <View style={styles.originDot} />
          <Text numberOfLines={1} style={styles.city}>
            Vitória da Conquista
          </Text>
          <Ionicons name="arrow-forward" size={14} color={colors.textSubtle} />
          <Text numberOfLines={1} style={styles.city}>
            Brumado
          </Text>
        </View>
        <View style={styles.metaRow}>
          <Ionicons name="time-outline" size={14} color={colors.textMuted} />
          <Text style={styles.meta}>Hoje, 17:30</Text>
          <View style={styles.separator} />
          <Ionicons name="people-outline" size={15} color={colors.textMuted} />
          <Text style={styles.meta}>2 vagas</Text>
          <View style={styles.verified}>
            <Ionicons name="checkmark-circle" size={13} color={colors.success} />
            <Text style={styles.verifiedText}>Verificada</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 252,
    borderRadius: radii.xxl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0EDFC',
    ...shadows.card,
  },
  topRow: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  eyebrow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radii.pill,
  },
  eyebrowText: {
    fontFamily: fonts.semibold,
    fontSize: 9.5,
    letterSpacing: 0.7,
    color: colors.primary,
  },
  pricePill: {
    backgroundColor: colors.navy,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.pill,
  },
  priceText: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    color: colors.white,
  },
  carBadge: {
    position: 'absolute',
    top: 108,
    right: 54,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(24, 116, 242, 0.14)',
    ...shadows.card,
  },
  bottomCard: {
    position: 'absolute',
    left: 14,
    right: 14,
    bottom: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.97)',
    borderRadius: radii.lg,
    paddingHorizontal: 14,
    paddingVertical: 11,
    gap: 7,
    ...shadows.card,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  originDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  city: {
    flexShrink: 1,
    fontFamily: fonts.semibold,
    fontSize: 12.5,
    color: colors.navy,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  meta: {
    fontFamily: fonts.regular,
    fontSize: 11.5,
    color: colors.textMuted,
  },
  separator: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.dotInactive,
    marginHorizontal: 3,
  },
  verified: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginLeft: 'auto',
  },
  verifiedText: {
    fontFamily: fonts.medium,
    fontSize: 10.5,
    color: colors.success,
  },
});
