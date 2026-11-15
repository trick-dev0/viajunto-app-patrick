import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, {
  Circle,
  Defs,
  Ellipse,
  G,
  LinearGradient,
  Path,
  Rect,
  Stop,
} from 'react-native-svg';

import { colors, fonts } from '@/theme/tokens';

type BrandMarkProps = {
  size?: number;
  compact?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function BrandMark({ size = 96, compact = false, style }: BrandMarkProps) {
  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel="Logo do ViaJunto"
      style={style}
    >
      {compact ? (
        <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <Rect x="2" y="2" width="60" height="60" rx="19" fill="#E8F2FF" />
          <Path
            d="M12 38C12 34.5 14 32 17.5 31.2L23 30L27 23.5C28.5 21 31 20 33.5 20H40C42.5 20 44.8 21.5 46 23.8L49.5 30L52 31C54.5 31.8 56 34 56 37V41C56 42.6 54.7 44 53 44H15C13.3 44 12 42.6 12 41V38Z"
            fill="#1874F2"
          />
          <Path
            d="M28 30L30.7 24.5C31.2 23.6 32 23 33 23H39.5C40.7 23 41.6 23.6 42.2 24.7L45 30H28Z"
            fill="#F5FAFF"
          />
          <Circle cx="21" cy="44" r="6" fill="#173B5E" />
          <Circle cx="21" cy="44" r="2.6" fill="#A9C8EA" />
          <Circle cx="47" cy="44" r="6" fill="#173B5E" />
          <Circle cx="47" cy="44" r="2.6" fill="#A9C8EA" />
        </Svg>
      ) : (
      <Svg width={size} height={size} viewBox="0 0 512 512" fill="none">
        <Defs>
          <LinearGradient id="vj-bg" x1="80" y1="32" x2="448" y2="496" gradientUnits="userSpaceOnUse">
            <Stop stopColor="#F1F8FF" />
            <Stop offset="1" stopColor="#CFE4FF" />
          </LinearGradient>
          <LinearGradient id="vj-car" x1="256" y1="200" x2="256" y2="340" gradientUnits="userSpaceOnUse">
            <Stop stopColor="#4A9BFF" />
            <Stop offset="1" stopColor="#0F64DB" />
          </LinearGradient>
        </Defs>

        <Rect x="16" y="16" width="480" height="480" rx="144" fill="url(#vj-bg)" />
        <Circle cx="420" cy="92" r="14" fill="#FFFFFF" opacity={0.75} />
        <Circle cx="92" cy="128" r="9" fill="#1874F2" opacity={0.18} />
        <Circle cx="416" cy="410" r="7" fill="#1874F2" opacity={0.2} />

        <Path
          d="M88 408C142 386 176 332 220 292C264 252 316 222 400 112"
          stroke="#FFFFFF"
          strokeWidth={54}
          strokeLinecap="round"
          fill="none"
        />
        <Path
          d="M88 408C142 386 176 332 220 292C264 252 316 222 400 112"
          stroke="#1874F2"
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray="2 30"
          opacity={0.45}
          fill="none"
        />

        <Circle cx="88" cy="408" r="19" fill="#FFFFFF" />
        <Circle cx="88" cy="408" r="9" fill="#1874F2" />
        <Circle cx="400" cy="112" r="19" fill="#FFFFFF" />
        <Circle cx="400" cy="112" r="9" fill="#173B5E" />

        <Ellipse cx="284" cy="356" rx="150" ry="26" fill="#173B5E" opacity={0.14} />

        <G transform="rotate(-9 284 286)">
          <Path
            d="M150 310C150 290 162 278 184 274L216 268L248 226C258 212 272 206 288 206H330C348 206 362 216 368 232L382 268L398 274C414 280 420 292 420 310V322C420 330 414 336 406 336H168C158 336 150 328 150 318V310Z"
            fill="url(#vj-car)"
          />
          <Path
            d="M258 268L282 230C287 221 294 218 303 218H326C336 218 342 223 346 232L358 268H258Z"
            fill="#F5FAFF"
            opacity={0.96}
          />
          <Path d="M310 218V268" stroke="#A9C9F2" strokeWidth={6} fill="none" />
          <Path d="M300 270V324" stroke="#0D57BE" strokeWidth={6} opacity={0.45} fill="none" />
          <Rect x="338" y="280" width="34" height="10" rx="5" fill="#D9EBFF" opacity={0.9} />
          <Circle cx="408" cy="300" r="10" fill="#FFE39B" />
          <Rect x="151" y="288" width="12" height="20" rx="6" fill="#FFB3B3" />
          <Circle cx="206" cy="336" r="34" fill="#173B5E" />
          <Circle cx="206" cy="336" r="15" fill="#A9C8EA" />
          <Circle cx="368" cy="336" r="34" fill="#173B5E" />
          <Circle cx="368" cy="336" r="15" fill="#A9C8EA" />
        </G>
      </Svg>
      )}
    </View>
  );
}

type BrandWordmarkProps = {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export function BrandWordmark({
  size = 30,
  color = colors.navy,
  style,
}: BrandWordmarkProps) {
  return (
    <Text
      accessibilityRole="text"
      style={[
        styles.wordmark,
        { fontSize: size, lineHeight: size * 1.24, letterSpacing: -size * 0.045, color },
        style,
      ]}
    >
      ViaJunto
    </Text>
  );
}

type BrandLogoProps = {
  size?: number;
  wordmarkSize?: number;
  direction?: 'vertical' | 'horizontal';
  color?: string;
  compact?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function BrandLogo({
  size = 88,
  wordmarkSize = 30,
  direction = 'vertical',
  color = colors.navy,
  compact = false,
  style,
}: BrandLogoProps) {
  return (
    <View style={[direction === 'horizontal' ? styles.horizontal : styles.vertical, style]}>
      <BrandMark size={size} compact={compact} />
      <BrandWordmark size={wordmarkSize} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  vertical: {
    alignItems: 'center',
    gap: 14,
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  wordmark: {
    fontFamily: fonts.bold,
  },
});
