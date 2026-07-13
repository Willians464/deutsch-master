import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, DarkTheme, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Compass, House, MessageCircle, PlayCircle, Sparkles, TrendingUp, UserRound } from 'lucide-react-native';
import { useAuth } from '../contexts/AuthContext';
import { colors, spacing, typography } from '../constants/theme';
import { EagleMark } from '../components/BrandMark';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { JourneyScreen } from '../screens/JourneyScreen';
import { LessonsScreen } from '../screens/LessonsScreen';
import { SprechenScreen } from '../screens/SprechenScreen';
import { ProgressScreen } from '../screens/ProgressScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { LessonScreen } from '../screens/LessonScreen';
import { EditorialPreviewScreen } from '../screens/EditorialPreviewScreen';
import { MissionsScreen } from '../screens/MissionsScreen';
import type { MainTabParamList, RootStackParamList } from './types';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<MainTabParamList>();

function SplashScreen() {
  return <View style={styles.splash}><EagleMark size={126} showWordmark /><Text style={styles.tagline}>MAIS QUE UM IDIOMA. UMA NOVA VIDA.</Text><View style={styles.splashLine} /></View>;
}

function MainTabs() {
  return <Tabs.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: colors.gold, tabBarInactiveTintColor: colors.textFaint, tabBarStyle: styles.tabBar, tabBarLabelStyle: styles.tabLabel, tabBarHideOnKeyboard: true }}>
    <Tabs.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home', tabBarIcon: ({ color, size }) => <House color={color} size={size} /> }} />
    <Tabs.Screen name="Journey" component={JourneyScreen} options={{ tabBarLabel: 'Jornada', tabBarIcon: ({ color, size }) => <Compass color={color} size={size} /> }} />
    <Tabs.Screen name="Lessons" component={LessonsScreen} options={{ tabBarLabel: 'Lições', tabBarIcon: ({ color, size }) => <PlayCircle color={color} size={size} /> }} />
    <Tabs.Screen name="Sprechen" component={SprechenScreen} options={{ tabBarLabel: 'Sprechen', tabBarIcon: ({ color, size }) => <MessageCircle color={color} size={size} /> }} />
    <Tabs.Screen name="Progress" component={ProgressScreen} options={{ tabBarLabel: 'Progresso', tabBarIcon: ({ color, size }) => <TrendingUp color={color} size={size} /> }} />
    <Tabs.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Perfil', tabBarIcon: ({ color, size }) => <UserRound color={color} size={size} /> }} />
  </Tabs.Navigator>;
}

export function AppNavigator() {
  const { profile, loading } = useAuth();
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => { const timer = setTimeout(() => setShowSplash(false), 1600); return () => clearTimeout(timer); }, []);
  if (loading || showSplash) return <SplashScreen />;
  return <NavigationContainer theme={{ ...DarkTheme, colors: { ...DarkTheme.colors, background: colors.background, card: colors.surface, text: colors.text, border: colors.border, primary: colors.gold } }}>
    <RootStack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}>
      {profile ? <><RootStack.Screen name="MainTabs" component={MainTabs} /><RootStack.Screen name="Lesson" component={LessonScreen} options={{ presentation: 'card' }} /><RootStack.Screen name="EditorialPreview" component={EditorialPreviewScreen} options={{ presentation: 'card' }} /><RootStack.Screen name="Missions" component={MissionsScreen} options={{ presentation: 'card' }} /></> : <><RootStack.Screen name="Welcome" component={WelcomeScreen} /><RootStack.Screen name="Login" component={LoginScreen} /><RootStack.Screen name="Register" component={RegisterScreen} /></>}
    </RootStack.Navigator>
  </NavigationContainer>;
}

const styles = StyleSheet.create({
  splash: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background, paddingHorizontal: spacing.lg },
  tagline: { ...typography.caption, color: colors.textMuted, marginTop: spacing.xl, textAlign: 'center', letterSpacing: 1.6 },
  splashLine: { height: 2, width: 46, backgroundColor: colors.red, marginTop: spacing.lg },
  tabBar: { height: 70, paddingBottom: 8, paddingTop: 8, backgroundColor: colors.surface, borderTopColor: colors.border },
  tabLabel: { fontSize: 10, fontWeight: '700' },
});
