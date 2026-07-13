import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing, typography } from '../constants/theme';

export function StatCard({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return <View style={styles.card}><Text style={styles.label}>{label}</Text><Text style={[styles.value, accent ? { color: accent } : null]}>{value}</Text></View>;
}

const styles = StyleSheet.create({ card: { flex: 1, minHeight: 78, padding: spacing.md, backgroundColor: colors.surface, borderRadius: radii.md, borderWidth: 1, borderColor: colors.border }, label: { ...typography.caption, color: colors.textMuted, textTransform: 'uppercase' }, value: { ...typography.h2, color: colors.text, marginTop: 5 } });
