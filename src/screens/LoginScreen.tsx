import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ArrowLeft, ArrowRight, LockKeyhole } from 'lucide-react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '../components/Button';
import { EagleMark } from '../components/BrandMark';
import { Input } from '../components/Input';
import { colors, spacing, typography } from '../constants/theme';
import type { RootStackParamList } from '../navigation/types';
import { useAuth } from '../contexts/AuthContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState(''); const [loading, setLoading] = useState(false);
  async function handleLogin() { setError(''); if (!email.trim() || password.length < 6) { setError('Informe um e-mail válido e uma senha com pelo menos 6 caracteres.'); return; } setLoading(true); const result = await signIn(email, password); setLoading(false); if (result.error) setError(result.error); }
  return <View style={styles.screen}><Pressable style={styles.back} onPress={() => navigation.goBack()}><ArrowLeft size={20} color={colors.text} /><Text style={styles.backText}>Voltar</Text></Pressable><View style={styles.header}><EagleMark size={72} /><Text style={styles.title}>Bom te ver de novo.</Text><Text style={styles.subtitle}>Entre para continuar sua jornada.</Text></View><View style={styles.form}><Input label="E-mail" value={email} onChangeText={setEmail} placeholder="voce@email.com" autoCapitalize="none" keyboardType="email-address" autoCorrect={false} /><Input label="Senha" value={password} onChangeText={setPassword} placeholder="••••••••" secureTextEntry /><Pressable><Text style={styles.forgot}>Esqueci minha senha</Text></Pressable>{error && <Text style={styles.error}>{error}</Text>}<Button label="Entrar" onPress={handleLogin} loading={loading} icon={!loading && <ArrowRight color={colors.background} size={19} />} /></View><View style={styles.bottom}><LockKeyhole size={14} color={colors.textFaint} /><Text style={styles.bottomText}>Seus dados ficam protegidos.</Text></View></View>;
}

const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: colors.background, padding: spacing.lg, justifyContent: 'space-between' }, back: { flexDirection: 'row', alignItems: 'center', gap: 7 }, backText: { ...typography.body, color: colors.textMuted }, header: { alignItems: 'center' }, title: { ...typography.h1, color: colors.text, marginTop: spacing.lg, textAlign: 'center' }, subtitle: { ...typography.body, color: colors.textMuted, marginTop: 7 }, form: { marginTop: spacing.xl }, forgot: { ...typography.caption, color: colors.gold, textAlign: 'right', marginBottom: spacing.lg }, error: { ...typography.body, color: colors.redBright, marginBottom: spacing.md }, bottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 }, bottomText: { ...typography.caption, color: colors.textFaint, letterSpacing: 0 } });
