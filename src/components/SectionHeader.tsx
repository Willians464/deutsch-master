import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, typography } from '../constants/theme';

export function SectionHeader({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  const navigation = useNavigation<any>();
  const handleAction = () => { if (onAction) onAction(); else if (action === 'Ver todas') navigation.getParent()?.navigate('Missions'); };
  return <View style={styles.row}><Text style={styles.title}>{title}</Text>{action && <Pressable disabled={!onAction && action !== 'Ver todas'} onPress={handleAction}><Text style={[styles.action, !onAction && action !== 'Ver todas' && styles.disabled]}>{action}</Text></Pressable>}</View>;
}

const styles = StyleSheet.create({ row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }, title: { ...typography.h2, color: colors.text }, action: { ...typography.caption, color: colors.gold, textTransform: 'uppercase' }, disabled: { opacity: 0.7 } });
