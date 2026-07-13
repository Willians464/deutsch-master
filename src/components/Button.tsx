import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors, radii, spacing, typography } from '../constants/theme';

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
};

export function Button({ label, onPress, variant = 'primary', icon, loading = false, disabled = false, style }: ButtonProps) {
  return (
    <Pressable onPress={onPress} disabled={disabled || loading} style={({ pressed }) => [styles.base, styles[variant], pressed && styles.pressed, (disabled || loading) && styles.disabled, style]}>
      {loading ? <ActivityIndicator color={variant === 'primary' ? colors.background : colors.gold} /> : icon}
      {!loading && <Text style={[styles.label, variant === 'primary' ? styles.primaryLabel : styles.otherLabel]}>{label}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { minHeight: 54, borderRadius: radii.md, paddingHorizontal: spacing.lg, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: spacing.sm },
  primary: { backgroundColor: colors.gold }, secondary: { backgroundColor: colors.surfaceElevated, borderWidth: 1, borderColor: colors.border }, ghost: { backgroundColor: 'transparent' },
  label: { ...typography.body, fontWeight: '800' }, primaryLabel: { color: colors.background }, otherLabel: { color: colors.text },
  pressed: { opacity: 0.78, transform: [{ scale: 0.985 }] }, disabled: { opacity: 0.48 },
});
