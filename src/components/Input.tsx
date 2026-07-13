import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { colors, radii, spacing, typography } from '../constants/theme';

export function Input({ label, error, ...props }: TextInputProps & { label: string; error?: string }) {
  return <View style={styles.wrap}><Text style={styles.label}>{label}</Text><TextInput placeholderTextColor={colors.textFaint} style={[styles.input, error && styles.inputError]} {...props} />{error && <Text style={styles.error}>{error}</Text>}</View>;
}

const styles = StyleSheet.create({ wrap: { marginBottom: spacing.md }, label: { ...typography.caption, color: colors.textMuted, marginBottom: 8, textTransform: 'uppercase' }, input: { minHeight: 54, borderRadius: radii.md, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, color: colors.text, paddingHorizontal: spacing.md, ...typography.body }, inputError: { borderColor: colors.redBright }, error: { ...typography.caption, color: colors.redBright, marginTop: 5, letterSpacing: 0 } });
