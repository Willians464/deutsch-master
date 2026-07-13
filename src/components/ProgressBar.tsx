import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, radii } from '../constants/theme';

export function ProgressBar({ value, color = colors.gold, height = 8 }: { value: number; color?: string; height?: number }) {
  const safeValue = Math.max(0, Math.min(1, value));
  return <View style={[styles.track, { height }]}><View style={[styles.fill, { width: `${safeValue * 100}%` as `${number}%`, height, backgroundColor: color }]} /></View>;
}

const styles = StyleSheet.create({ track: { backgroundColor: colors.surfaceMuted, borderRadius: radii.pill, overflow: 'hidden', flex: 1 }, fill: { borderRadius: radii.pill } });
