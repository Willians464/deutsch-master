import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Sparkles } from 'lucide-react-native';
import { colors, radii, spacing, typography } from '../constants/theme';

export function DemoBanner() {
  return <View style={styles.banner}><Sparkles size={15} color={colors.gold} /><Text style={styles.text}>Modo demo ativo · seus avanços ficam salvos neste aparelho</Text></View>;
}

const styles = StyleSheet.create({ banner: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingHorizontal: spacing.md, paddingVertical: 10, borderRadius: radii.sm, backgroundColor: '#2B2415', borderWidth: 1, borderColor: colors.goldSoft, marginBottom: spacing.lg }, text: { ...typography.caption, color: colors.goldBright, flex: 1, letterSpacing: 0.2 } });
