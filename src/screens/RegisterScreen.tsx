import React, { useState } from 'react';
import { Alert, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { ArrowLeft, ArrowRight } from 'lucide-react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '../components/Button';
import { EagleMark } from '../components/BrandMark';
import { Input } from '../components/Input';
import { colors, spacing, typography } from '../constants/theme';
import type { RootStackParamList } from '../navigation/types';
import { useAuth } from '../contexts/AuthContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export function RegisterScreen({ navigation }: Props) {
  const { signUp } = useAuth();
  const [name, setName] = useState(''); const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [confirm, setConfirm] = useState(''); const [error, setError] = useState(''); const [loading, setLoading] = useState(false);
  async function handleRegister() { setError(''); if (!name.trim() || !/^\S+@\S+\.\S+$/.test(email)) { setError('Preencha seu nome e informe um e-mail válido.'); return; } if (password.length < 6) { setError('A senha precisa ter pelo menos 6 caracteres.'); return; } if (password !== confirm) { setError('As senhas não coincidem.'); return; } setLoading(true); const result = await signUp(name, email, password); setLoading(false); if (result.error) { setError(result.error); return; } if (navigation.getState().routes.some((route) => route.name === 'Login')) navigation.goBack(); else if (Platform.OS === 'web' && typeof window !== 'undefined') window.alert('Sua jornada está pronta para começar.'); else Alert.alert('Conta criada', 'Sua jornada está pronta para começar.'); }
  return <View style={styles.screen}><Pressable style={styles.back} onPress={() => navigation.goBack()}><ArrowLeft size={20} color={colors.text} /><Text style={styles.backText}>Voltar</Text></Pressable><View style={styles.header}><EagleMark size={58} /><Text style={styles.title}>Comece sua jornada.</Text><Text style={styles.subtitle}>Uma conta. Um novo caminho em alemão.</Text></View><View style={styles.form}><Input label="Nome" value={name} onChangeText={setName} placeholder="Como podemos te chamar?" autoCapitalize="words" /><Input label="E-mail" value={email} onChangeText={setEmail} placeholder="voce@email.com" autoCapitalize="none" keyboardType="email-address" autoCorrect={false} /><Input label="Senha" value={password} onChangeText={setPassword} placeholder="Mínimo de 6 caracteres" secureTextEntry /><Input label="Confirmar senha" value={confirm} onChangeText={setConfirm} placeholder="Repita sua senha" secureTextEntry />{error && <Text style={styles.error}>{error}</Text>}<Button label="Criar minha conta" onPress={handleRegister} loading={loading} icon={!loading && <ArrowRight color={colors.background} size={19} />} /></View><Text style={styles.terms}>Ao continuar, você aceita começar uma experiência de aprendizagem personalizada.</Text></View>;
}

const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: colors.background, padding: spacing.lg, justifyContent: 'space-between' }, back: { flexDirection: 'row', alignItems: 'center', gap: 7 }, backText: { ...typography.body, color: colors.textMuted }, header: { alignItems: 'center', marginTop: spacing.sm }, title: { ...typography.h1, color: colors.text, marginTop: spacing.md, textAlign: 'center' }, subtitle: { ...typography.body, color: colors.textMuted, marginTop: 7 }, form: { marginTop: spacing.lg }, error: { ...typography.body, color: colors.redBright, marginBottom: spacing.md }, terms: { ...typography.caption, color: colors.textFaint, textAlign: 'center', letterSpacing: 0, paddingHorizontal: spacing.md } });
