import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { BackButton } from '@/components/back-button';
import { BrandLogo } from '@/components/brand-logo';
import { PrimaryButton } from '@/components/primary-button';
import { Screen } from '@/components/screen';
import { TextField } from '@/components/text-field';
import {
  hasErrors,
  validateEmail,
  validateLogin,
  type LoginErrors,
} from '@/lib/validation';
import { colors, fonts, radii } from '@/theme/tokens';

export default function LoginRoute() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const updateEmail = (value: string) => {
    setEmail(value);
    if (errors.email) {
      setErrors((current) => ({ ...current, email: validateEmail(value) }));
    }
  };

  const updatePassword = (value: string) => {
    setPassword(value);
    if (errors.password) {
      setErrors((current) => ({ ...current, password: undefined }));
    }
  };

  const handleSubmit = () => {
    Keyboard.dismiss();
    const nextErrors = validateLogin(email, password);
    setErrors(nextErrors);

    if (hasErrors(nextErrors)) {
      return;
    }

    setLoading(true);
    // Sem API nesta entrega: simula a autenticação e segue para a escolha de perfil.
    timerRef.current = setTimeout(() => {
      setLoading(false);
      router.replace('/profile');
    }, 950);
  };

  const handleForgotPassword = () => {
    Alert.alert(
      'Recuperar senha',
      'O fluxo de recuperação de senha será conectado à API na próxima entrega.',
      [{ text: 'Entendi' }],
    );
  };

  const handleCreateAccount = () => {
    Alert.alert(
      'Criar conta',
      'O cadastro completo será implementado na próxima sprint. Nesta entrega, use qualquer e-mail válido para entrar.',
      [{ text: 'Voltar' }],
    );
  };

  return (
    <Screen contentStyle={styles.content} keyboardOffset={8}>
      <View style={styles.header}>
        <BackButton onPress={() => router.back()} />
        <BrandLogo direction="horizontal" size={34} wordmarkSize={19} compact />
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.intro}>
        <View style={styles.eyebrowRow}>
          <View style={styles.eyebrowDot} />
          <Text style={styles.eyebrow}>BEM-VINDO DE VOLTA</Text>
        </View>
        <Text style={styles.title}>Que bom te ver!</Text>
        <Text style={styles.subtitle}>
          Entre para encontrar ou oferecer sua próxima carona.
        </Text>
      </View>

      <View style={styles.form}>
        <TextField
          testID="login-email"
          label="E-mail"
          icon="mail-outline"
          placeholder="voce@exemplo.com"
          value={email}
          onChangeText={updateEmail}
          error={errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          textContentType="emailAddress"
          returnKeyType="next"
        />

        <TextField
          testID="login-password"
          label="Senha"
          icon="lock-closed-outline"
          placeholder="Sua senha"
          value={password}
          onChangeText={updatePassword}
          error={errors.password}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          autoComplete="current-password"
          textContentType="password"
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
          rightElement={
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              onPress={() => setShowPassword((current) => !current)}
              hitSlop={8}
            >
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color={colors.textSubtle}
              />
            </Pressable>
          }
        />

        <View style={styles.optionsRow}>
          <Pressable
            accessibilityRole="checkbox"
            accessibilityLabel="Lembrar de mim"
            accessibilityState={{ checked: remember }}
            onPress={() => setRemember((current) => !current)}
            style={styles.rememberRow}
          >
            <View style={[styles.checkbox, remember && styles.checkboxChecked]}>
              {remember ? (
                <Ionicons name="checkmark" size={13} color={colors.white} />
              ) : null}
            </View>
            <Text style={styles.rememberText}>Lembrar de mim</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Esqueci minha senha"
            onPress={handleForgotPassword}
            hitSlop={8}
          >
            <Text style={styles.forgotText}>Esqueci minha senha</Text>
          </Pressable>
        </View>

        <PrimaryButton
          testID="login-submit"
          title="Entrar"
          onPress={handleSubmit}
          loading={loading}
          icon="arrow-forward"
          iconPosition="right"
        />

        <View style={styles.demoBox}>
          <Ionicons name="flask-outline" size={16} color={colors.primary} />
          <Text style={styles.demoText}>
            <Text style={styles.demoStrong}>Modo demonstração: </Text>
            use qualquer e-mail válido e uma senha com 8+ caracteres, contendo
            letras e números.
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Ainda não tem uma conta?</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Criar conta"
          onPress={handleCreateAccount}
          hitSlop={8}
        >
          <Text style={styles.footerLink}>Criar conta</Text>
        </Pressable>
      </View>
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
  intro: {
    marginTop: 34,
  },
  eyebrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 9,
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
  title: {
    fontFamily: fonts.bold,
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: -1.1,
    color: colors.navy,
  },
  subtitle: {
    marginTop: 8,
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 22,
    color: colors.textMuted,
    maxWidth: 320,
  },
  form: {
    marginTop: 30,
    gap: 16,
  },
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: -2,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    width: 19,
    height: 19,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  rememberText: {
    fontFamily: fonts.regular,
    fontSize: 12.5,
    color: colors.textMuted,
  },
  forgotText: {
    fontFamily: fonts.semibold,
    fontSize: 12.5,
    color: colors.primary,
  },
  demoBox: {
    flexDirection: 'row',
    gap: 9,
    alignItems: 'flex-start',
    backgroundColor: colors.primaryTint,
    borderWidth: 1,
    borderColor: colors.primarySoft,
    borderRadius: radii.md,
    padding: 12,
  },
  demoText: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 11,
    lineHeight: 17,
    color: colors.textMuted,
  },
  demoStrong: {
    fontFamily: fonts.semibold,
    color: colors.primary,
  },
  footer: {
    marginTop: 'auto',
    paddingTop: 28,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  footerText: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.textMuted,
  },
  footerLink: {
    fontFamily: fonts.semibold,
    fontSize: 13,
    color: colors.primary,
  },
});
