import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ArrowRight, BookOpen, Check, ChevronLeft, Clock3, Headphones, MessageCircle, PenLine, Quote, Sparkles } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { EagleMark } from '../components/BrandMark';
import { useAuth } from '../contexts/AuthContext';
import { editorialColors as c } from '../constants/editorialTheme';
import { radii, spacing, typography } from '../constants/theme';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'EditorialPreview'>;

export function EditorialPreviewScreen({ navigation }: Props) {
  const { profile } = useAuth();
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <Pressable onPress={() => navigation.goBack()} style={styles.back}><ChevronLeft size={18} color={c.text} /><Text style={styles.backText}>Perfil</Text></Pressable>
          <Text style={styles.variant}>DIREÇÃO 02 · EDITORIAL</Text>
        </View>
        <View style={styles.header}><View><Text style={styles.eyebrow}>QUARTA-FEIRA · 12 JUN</Text><Text style={styles.greeting}>Guten Tag, {profile?.name ?? 'Lernende'}.</Text></View><View style={styles.miniMark}><EagleMark size={44} /></View></View>
        <View style={styles.introCard}>
          <View style={styles.introTop}><View style={styles.tag}><Sparkles size={13} color={c.cream} /><Text style={styles.tagText}>HEUTE IM FOKUS</Text></View><Text style={styles.level}>A0</Text></View>
          <Text style={styles.introTitle}>Falar sobre você.</Text>
          <Text style={styles.introCopy}>Uma conversa simples pode mudar o jeito como você ocupa uma nova cidade.</Text>
          <View style={styles.rule} />
          <View style={styles.introBottom}><View><Text style={styles.metaLabel}>CONTEÚDO</Text><Text style={styles.metaValue}>Apresentação · 6 min</Text></View><Pressable onPress={() => navigation.navigate('Lesson', { lessonId: 'lesson-1' })} style={styles.roundArrow}><ArrowRight size={19} color={c.background} /></Pressable></View>
        </View>
        <View style={styles.stats}><View><Text style={styles.statValue}>{profile?.streak ?? 0}</Text><Text style={styles.statLabel}>DIAS DE RITMO</Text></View><View><Text style={styles.statValue}>{profile?.xp ?? 0}</Text><Text style={styles.statLabel}>XP ACUMULADO</Text></View><View><Text style={styles.statValue}>{profile?.completed_lessons ?? 0}</Text><Text style={styles.statLabel}>LIÇÕES</Text></View></View>
        <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Caderno de hoje</Text><Text style={styles.sectionHint}>3 práticas</Text></View>
        <View style={styles.notebook}><Note icon={<BookOpen size={17} color={c.cream} />} kicker="01 · LER" title="Ich bin Willians." sub="Apresente-se em uma frase." done /><View style={styles.divider} /><Note icon={<Headphones size={17} color={c.terracotta} />} kicker="02 · OUVIR" title="Guten Morgen." sub="Reconheça uma saudação." time="3 min" /><View style={styles.divider} /><Note icon={<PenLine size={17} color={c.olive} />} kicker="03 · ESCREVER" title="Wie geht es dir?" sub="Responda com naturalidade." time="4 min" /></View>
        <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Uma pausa para falar</Text><Text style={styles.sectionHint}>SPRECHEN</Text></View>
        <Pressable onPress={() => navigation.navigate('MainTabs')} style={styles.conversation}><View style={styles.conversationTop}><View style={styles.conversationAvatar}><EagleMark size={42} /></View><View style={styles.conversationBody}><Text style={styles.noteKicker}>CONVERSA GUIADA</Text><Text style={styles.conversationTitle}>Comece sem traduzir tudo.</Text></View><MessageCircle size={18} color={c.cream} /></View><View style={styles.quoteBox}><Quote size={17} color={c.terracotta} /><Text style={styles.quoteText}>Hallo! Wie geht es dir?</Text></View><Text style={styles.conversationHint}>Pratique uma resposta curta e siga o fluxo.</Text></Pressable>
        <View style={styles.footerNote}><Clock3 size={15} color={c.textFaint} /><Text style={styles.footerText}>Uma rotina leve de 12 minutos já conta.</Text></View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Note({ icon, kicker, title, sub, done, time }: { icon: React.ReactNode; kicker: string; title: string; sub: string; done?: boolean; time?: string }) {
  return <View style={styles.noteRow}><View style={styles.noteIcon}>{icon}</View><View style={styles.noteBody}><Text style={styles.noteKicker}>{kicker}</Text><Text style={styles.noteTitle}>{title}</Text><Text style={styles.noteSub}>{sub}</Text></View>{done ? <Check size={17} color={c.olive} /> : <Text style={styles.noteTime}>{time}</Text>}</View>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: c.background }, content: { paddingHorizontal: spacing.lg, paddingBottom: 46 }, topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.sm, marginBottom: spacing.xl }, back: { flexDirection: 'row', alignItems: 'center', gap: 3 }, backText: { ...typography.caption, color: c.textMuted, letterSpacing: 0 }, variant: { ...typography.caption, color: c.textFaint, fontSize: 9 }, header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xl }, eyebrow: { ...typography.caption, color: c.textFaint, fontSize: 10 }, greeting: { ...typography.h1, color: c.text, marginTop: 5, fontWeight: '700' }, miniMark: { width: 54, height: 54, borderRadius: 27, backgroundColor: c.surface, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: c.border }, introCard: { backgroundColor: c.surface, borderRadius: 18, borderWidth: 1, borderColor: c.border, padding: spacing.lg }, introTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, tag: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 9, paddingVertical: 6, backgroundColor: '#3B382D', borderRadius: radii.pill }, tagText: { ...typography.caption, color: c.cream, fontSize: 9, letterSpacing: 1 }, level: { ...typography.caption, color: c.cream, fontSize: 15 }, introTitle: { fontSize: 29, lineHeight: 34, fontWeight: '700', color: c.text, marginTop: spacing.xl, letterSpacing: -0.6 }, introCopy: { ...typography.body, color: c.textMuted, marginTop: spacing.sm, lineHeight: 23 }, rule: { height: 1, backgroundColor: c.border, marginVertical: spacing.lg }, introBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, metaLabel: { ...typography.caption, color: c.textFaint, fontSize: 9 }, metaValue: { ...typography.body, color: c.cream, marginTop: 4, fontSize: 13 }, roundArrow: { width: 42, height: 42, borderRadius: 21, backgroundColor: c.cream, alignItems: 'center', justifyContent: 'center' }, stats: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.lg, borderBottomWidth: 1, borderBottomColor: c.border, marginBottom: spacing.xl }, statValue: { fontSize: 22, fontWeight: '700', color: c.text }, statLabel: { ...typography.caption, color: c.textFaint, fontSize: 8, marginTop: 4, letterSpacing: 0.4 }, sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: spacing.sm }, sectionTitle: { ...typography.h2, color: c.text, fontWeight: '700' }, sectionHint: { ...typography.caption, color: c.textFaint, fontSize: 9 }, notebook: { backgroundColor: c.surface, borderRadius: 15, borderWidth: 1, borderColor: c.border, paddingHorizontal: spacing.md, marginBottom: spacing.xl }, noteRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.md }, noteIcon: { width: 36, height: 36, borderRadius: 11, backgroundColor: '#3D3B2C', alignItems: 'center', justifyContent: 'center' }, noteBody: { flex: 1 }, noteKicker: { ...typography.caption, color: c.textFaint, fontSize: 9, letterSpacing: 0.8 }, noteTitle: { ...typography.body, color: c.text, fontWeight: '700', marginTop: 3 }, noteSub: { ...typography.caption, color: c.textMuted, marginTop: 2, letterSpacing: 0 }, noteTime: { ...typography.caption, color: c.textFaint, letterSpacing: 0 }, divider: { height: 1, backgroundColor: c.border }, conversation: { backgroundColor: '#2D3530', borderRadius: 15, borderWidth: 1, borderColor: c.border, padding: spacing.lg }, conversationTop: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm }, conversationAvatar: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', backgroundColor: '#3D3B2C' }, conversationBody: { flex: 1 }, conversationTitle: { ...typography.body, color: c.text, fontWeight: '700', marginTop: 3 }, quoteBox: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: c.surface, borderRadius: 11, padding: spacing.md, marginTop: spacing.lg }, quoteText: { ...typography.body, color: c.cream, fontStyle: 'italic', fontWeight: '700' }, conversationHint: { ...typography.caption, color: c.textMuted, marginTop: spacing.sm, letterSpacing: 0 }, footerNote: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: spacing.xl }, footerText: { ...typography.caption, color: c.textFaint, letterSpacing: 0 }
});
