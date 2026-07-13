import React from 'react';
import { ScrollView, StyleSheet, View, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../constants/theme';

export function Screen({ children, scroll = true, style, ...props }: ViewProps & { scroll?: boolean }) {
  if (scroll) return <SafeAreaView edges={['top']} style={styles.safe}><ScrollView contentContainerStyle={[styles.content, style]} showsVerticalScrollIndicator={false} {...props}>{children}</ScrollView></SafeAreaView>;
  return <SafeAreaView edges={['top']} style={styles.safe}><View style={[styles.content, style]} {...props}>{children}</View></SafeAreaView>;
}

const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: colors.background }, content: { flexGrow: 1, paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl } });
