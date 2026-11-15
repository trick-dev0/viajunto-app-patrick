import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Animated, Easing, Pressable, StyleSheet, Text, View } from 'react-native';

import { BrandMark } from '@/components/brand-logo';
import { Screen } from '@/components/screen';
import { useReveal } from '@/hooks/use-reveal';
import { colors, fonts } from '@/theme/tokens';

const SPLASH_DURATION_MS = 2600;

export default function SplashRoute() {
  const [logoOpacity] = useState(() => new Animated.Value(0));
  const [logoScale] = useState(() => new Animated.Value(0.84));
  const wordmark = useReveal({ delay: 360, distance: 14 });
  const tagline = useReveal({ delay: 620, distance: 10 });

  const goToWelcome = () => {
    router.replace('/welcome');
  };

  useEffect(() => {
    const timer = setTimeout(goToWelcome, SPLASH_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const animation = Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 620,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        damping: 13,
        stiffness: 90,
        mass: 0.9,
        useNativeDriver: true,
      }),
    ]);

    animation.start();
    return () => animation.stop();
  }, [logoOpacity, logoScale]);

  return (
    <Screen
      scroll={false}
      contentStyle={styles.screen}
      edges={['top', 'bottom']}
    >
      <LinearGradient
        colors={['#FFFFFF', '#F7FBFF', '#EAF3FF']}
        locations={[0, 0.58, 1]}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />
      <View style={styles.floatingDotOne} />
      <View style={styles.floatingDotTwo} />

      <Pressable
        style={styles.center}
        onPress={goToWelcome}
        accessibilityRole="button"
        accessibilityLabel="ViaJunto. Ir para a tela de boas-vindas"
        testID="splash-logo"
      >
        <Animated.View
          style={{
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
          }}
        >
          <BrandMark size={138} />
        </Animated.View>

        <Animated.View style={[styles.wordmarkWrapper, wordmark]}>
          <Text style={styles.wordmark}>ViaJunto</Text>
        </Animated.View>

        <Animated.View style={[styles.taglineWrapper, tagline]}>
          <View style={styles.taglineLine} />
          <Text style={styles.tagline}>Caronas que conectam</Text>
          <View style={styles.taglineLine} />
        </Animated.View>
      </Pressable>

      <View style={styles.footer}>
        <View style={styles.dots} accessibilityLabel="Carregando">
          <PulseDot delay={0} />
          <PulseDot delay={160} />
          <PulseDot delay={320} />
        </View>
        <Text style={styles.route}>Vitória da Conquista · Brumado</Text>
      </View>
    </Screen>
  );
}

function PulseDot({ delay }: { delay: number }) {
  const [value] = useState(() => new Animated.Value(0.3));

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(value, {
          toValue: 1,
          duration: 420,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(value, {
          toValue: 0.3,
          duration: 420,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();
    return () => animation.stop();
  }, [delay, value]);

  return (
    <Animated.View
      style={[
        styles.dot,
        {
          opacity: value,
          transform: [
            {
              scale: value.interpolate({
                inputRange: [0.3, 1],
                outputRange: [0.85, 1.15],
              }),
            },
          ],
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 0,
    overflow: 'hidden',
  },
  glowTop: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: colors.primarySoft,
    opacity: 0.8,
    top: -130,
    right: -110,
  },
  glowBottom: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#DCEBFF',
    opacity: 0.55,
    bottom: -110,
    left: -90,
  },
  floatingDotOne: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
    opacity: 0.25,
    top: '24%',
    left: '18%',
  },
  floatingDotTwo: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.navy,
    opacity: 0.18,
    top: '34%',
    right: '16%',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 26,
  },
  wordmarkWrapper: {
    marginTop: 20,
  },
  wordmark: {
    fontFamily: fonts.bold,
    fontSize: 40,
    lineHeight: 48,
    letterSpacing: -2,
    color: colors.navy,
  },
  taglineWrapper: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  taglineLine: {
    width: 22,
    height: 1,
    backgroundColor: colors.borderStrong,
  },
  tagline: {
    fontFamily: fonts.medium,
    fontSize: 11,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: colors.textMuted,
  },
  footer: {
    paddingBottom: 22,
    alignItems: 'center',
    gap: 12,
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  route: {
    fontFamily: fonts.regular,
    fontSize: 10.5,
    letterSpacing: 0.4,
    color: colors.textSubtle,
  },
});
