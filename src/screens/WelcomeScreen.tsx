import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '../components/Button';
import { EagleMark } from '../components/BrandMark';
import { colors, radii, spacing, typography } from '../constants/theme';
import type { RootStackParamList } from '../navigation/types';
import { useAuth } from '../contexts/AuthContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export function WelcomeScreen({ navigation }: Props) {
  const { enterDemo } = useAuth();
  return <View style={styles.screen}>
    <View style={styles.top}><Text style={styles.eyebrow}>DEUTSCH MASTER · 01</Text><Pressable onPress={() => navigation.navigate('Login')}><Text style={styles.loginLink}>Já tenho conta</Text></Pressable></View>
    <View style={styles.hero}><View style={styles.markGlow}><EagleMark size={150} /></View><Text style={styles.kicker}>LERNEN. LEBEN. WACHSEN.</Text><Text style={styles.title}>Seu alemão{`\n`}começa aqui.</Text><Text style={styles.subtitle}>Uma jornada premium para aprender alemão do zero à fluência, no seu ritmo.</Text></View>
    <View style={styles.features}><View style={styles.feature}><ShieldCheck size={18} color={colors.gold} /><Text style={styles.featureText}>Método por faixas</Text></View><View style={styles.feature}><Sparkles size={18} color={colors.gold} /><Text style={styles.featureText}>Progresso que inspira</Text></View></View>
    <View style={styles.actions}><Button label="Começar agora" onPress={() => navigation.navigate('Register')} icon={<ArrowRight color={colors.background} size={19} />} /><Button label="Explorar modo demo" onPress={async () => { await enterDemo(); }} variant="secondary" /></View>
    <Text style={styles.legal}>Feito para quem quer viver em alemão.</Text>
  </View>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background, paddingHorizontal: spacing.lg, paddingTop: spacing.lg, paddingBottom: spacing.lg, justifyContent: 'space-between' },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, eyebrow: { ...typography.caption, color: colors.textFaint, letterSpacing: 1.4 }, loginLink: { ...typography.caption, color: colors.gold },
  hero: { alignItems: 'center', marginTop: spacing.lg }, markGlow: { width: 210, height: 190, alignItems: 'center', justifyContent: 'center', backgroundColor: '#16120D', borderRadius: 105, borderWidth: 1, borderColor: '#4A391A' }, kicker: { ...typography.caption, color: colors.redBright, letterSpacing: 2, marginTop: spacing.xl }, title: { ...typography.display, color: colors.text, textAlign: 'center', marginTop: spacing.sm }, subtitle: { ...typography.body, color: colors.textMuted, textAlign: 'center', marginTop: spacing.md, maxWidth: 320 },
  features: { flexDirection: 'row', gap: spacing.sm, justifyContent: 'center' }, feature: { flexDirection: 'row', gap: 7, alignItems: 'center', borderRadius: radii.pill, backgroundColor: colors.surface, paddingHorizontal: spacing.md, paddingVertical: 10, borderWidth: 1, borderColor: colors.border }, featureText: { ...typography.caption, color: colors.textMuted, letterSpacing: 0 },
  actions: { gap: spacing.sm }, legal: { ...typography.caption, color: colors.textFaint, textAlign: 'center', letterSpacing: 0.2 },
});
