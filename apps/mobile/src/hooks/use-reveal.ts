import { useEffect, useState } from 'react';
import { Animated, Easing } from 'react-native';

type RevealOptions = {
  delay?: number;
  duration?: number;
  distance?: number;
};

/**
 * Animação de entrada usada nas telas.
 * Mantém a UI leve e funciona no iOS, Android e web.
 */
export function useReveal({
  delay = 0,
  duration = 520,
  distance = 18,
}: RevealOptions = {}) {
  const [opacity] = useState(() => new Animated.Value(0));
  const [translateY] = useState(() => new Animated.Value(distance));

  useEffect(() => {
    const animation = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]);

    animation.start();
    return () => animation.stop();
  }, [delay, distance, duration, opacity, translateY]);

  return {
    opacity,
    transform: [{ translateY }],
  };
}
